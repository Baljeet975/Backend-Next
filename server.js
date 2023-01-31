const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(1998, console.log("app is working"));
