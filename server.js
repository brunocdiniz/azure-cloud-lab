const http = require("http");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <h1>Azure Cloud Lab 🚀</h1>
    <p>Projeto pessoal no Azure App Service</p>
    <p>Arquitetura Hub-Spoke + GitHub Integration</p>
  `);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
