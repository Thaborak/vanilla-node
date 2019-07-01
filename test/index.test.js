'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality Check', () => {
    it('true should be true', () => {
        expect(true).to.be.true;
    });

    it('2 + 2 should equal 4', () => {
        expect(2 + 2).to.equal(4);
    });
});

describe('Environment', () => {
    it('NODE_ENV should be "test"', () => {
        expect(process.env.NODE_ENV).to.equal('test');
    });
});

describe('Basic setup', () => {
    describe('404 handler', () => {
        it('should respond with 404 when given a bad path', () => {
            return chai.request('https://interview.adpeai.com/api/v1/bad/path')
                .get('/')
                .catch(err => err.response)
                .then(res => {
                    expect(res).to.have.status(404);
                });
        });
    });
});

describe('Bad ID', () => {
    it("should throw a 500 status on bad ID", () => {
        const badID = new Object();
        badID.id = "badID";
        badID.result = 130910940;
        return chai.request('https://interview.adpeai.com/api/v1/submit-task')
            .post('https://interview.adpeai.com/api/v1/submit-task')
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(500);
            });

    })
});