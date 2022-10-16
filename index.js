// var isEven = require('is-even');

// const bDate = 14;

// console.log(isEven(bDate));

const http = require('http');
const app = require('./src/app.js');
const port = 4500;

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server started on port ${port}, at http://localhost:${port}/`);
});


