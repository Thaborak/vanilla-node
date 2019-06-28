'use strict'
const https = require('https');

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
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
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
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                return answer
                break;
            case 'addition':
                answer.id = problem.id
                answer.result = (problem.left + problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                return answer
                break;
            case 'remainder':
                answer.id = problem.id
                answer.result = (problem.left % problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                return answer
                break;
            case 'subtraction':
                answer.id = problem.id
                answer.result = (problem.left - problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                return answer
                break;
            case 'multiplication':
                answer.id = problem.id
                answer.result = (problem.left * problem.right)
                console.log(answer)
                reqPost.write(JSON.stringify(answer));
                reqPost.end();
                return answer
                break;
            default:
                break;
        }
    })
});

const PORT = 8080;
const server = https.createServer((request, response) => {
    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
    // Write data to request body
    const postData = querystring.stringify({
        'msg': 'Hello World!'
    });

    req.write(postData);
    req.end();
});
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));