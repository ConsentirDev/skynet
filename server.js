const express = require('express');
const request = require('request');
const morgan = require('morgan');
const app = express();

// Use Morgan for logging incoming requests
app.use(morgan('dev'));

app.use((req, res) => {
    const url = `https://api.openai.com${req.url}`;

    console.log(`Forwarding request to: ${url}`);
    console.log(`Headers: `, req.headers);

    // Forward the request and add custom header
    const options = {
        url: url,
        headers: { 'OpenAI-Beta': 'assistants=v1' }
    };
    console.log(`Headers: `, req.headers);
    req.pipe(request(options))
       .on('response', response => {
           console.log(`Received response with status: ${response.statusCode}`);
           console.log(`Received response: ${response.body}`);
       })
       .pipe(res);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
