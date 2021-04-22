const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    request.url === "/" ? "index.html" : request.url
  );
  let contentType = getContentType(filePath) || "text/html";
  let emptyPagePath = path.join(__dirname, "404.html");
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENONET") {
        fs.readFile(emptyPagePath, "utf8", (err, content) => {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content);
        });
      } else {
        response.writeHead(500);
        response.end("A server error has occured");
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content);
    }
  });
});

const getContentType = (filePath) => {
  let extname = path.extname(filePath);
  if (extname === ".js") {
    return "text/javacript";
  }
  if (extname === ".css") {
    return "text/css";
  }
  if (extname === ".png") {
    return "image/png";
  }
  if (extname === ".jpg") {
    return "image/jpg";
  }
};

const port = 5000;

server.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
