const http = require('http');
const faker = require('faker');

function generateRandomId() {
    return Date.now().toString(36) + (Math.floor(Math.random() * 9e7)).toString(36);
}

http.createServer((request, response) => {
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    });
    setInterval(() => {
        response.write("event: eventData\n" +
            'data: ' + JSON.stringify({
                player: `${faker.name.firstName()} ${faker.name.lastName()}`,
                score: Math.round(Math.random()  * 1000),
                id: generateRandomId(),
            }) + '\n' +
            'id: ' + generateRandomId(),
        );
        response.write('\n\n');
    }, 3000);
}).listen(5000);
