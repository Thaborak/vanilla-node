'use strict'
const https = require('https');
const keepAliveAgent = new https.Agent({ keepAlive: true });

//get url
const options = new URL('https://interview.adpeai.com/api/v1/get-task');
// options for POST request 
const optionsPost = {
    hostname: 'interview.adpeai.com',
    port: 443,
    path: '/api/v1/submit-task',
    method: 'POST',
    "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
    }

};

//============ POST function ===============
const reqPost = https.request(optionsPost, function (res) {
    console.log('statusCode:', res.statusCode);
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        // error code handing 
        switch (res.statusCode) {
            case 200:
                console.log(body.toString());
                break;
            case 400:
                console.log(body.toString());
                break;
            case 500:
                console.log(body.toString());
                break;
        }
        reqPost.end();

    });

});


// =========== GET problem ===========
const req = https.get(options, function (res) {
    // Buffer the body entirely for processing as a whole.
    const bodyChunks = [];
    res.on('data', function (chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
    }).on('end', function () {
        const body = Buffer.concat(bodyChunks);
        const problem = JSON.parse(body.toString());
        console.log(problem);
        let answer = new Object();
        // switch statement that cycles through the problem operation types
        switch (problem.operation) {
            case 'division':
                answer.id = problem.id
                answer.result = (problem.left / problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer))
                reqPost.end();
                break;
            case 'addition':
                answer.id = problem.id
                answer.result = (problem.left + problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                break;
            case 'remainder':
                answer.id = problem.id
                answer.result = (problem.left % problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                break;
            case 'subtraction':
                answer.id = problem.id
                answer.result = (problem.left - problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                break;
            case 'multiplication':
                answer.id = problem.id
                answer.result = (problem.left * problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                break;
            default:
                reqPost.end();
                break;
        }
    })
});


const PORT = 8080;
const server = https.createServer((request, response) => {
    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });

});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


