const http = require("http");

const port = process.env.PORT || 8080;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Azure Cloud Lab | Bruno</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    body {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
    }

    .container {
      max-width: 1000px;
      width: 100%;
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
    }

    .badge {
      display: inline-block;
      background: #2563eb;
      color: white;
      font-size: 13px;
      padding: 8px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
      font-weight: bold;
      letter-spacing: 0.3px;
    }

    h1 {
      font-size: 42px;
      line-height: 1.1;
      margin-bottom: 16px;
      color: #f8fafc;
    }

    .subtitle {
      font-size: 18px;
      color: #cbd5e1;
      margin-bottom: 32px;
      max-width: 760px;
      line-height: 1.6;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-top: 28px;
    }

    .card {
      background: #111827;
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      padding: 22px;
    }

    .card h2 {
      font-size: 18px;
      margin-bottom: 12px;
      color: #93c5fd;
    }

    .card ul {
      padding-left: 18px;
      line-height: 1.8;
      color: #e5e7eb;
    }

    .highlight {
      margin-top: 28px;
      padding: 20px;
      border-radius: 16px;
      background: rgba(37, 99, 235, 0.12);
      border: 1px solid rgba(96, 165, 250, 0.25);
      color: #dbeafe;
      line-height: 1.7;
    }

    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: #94a3b8;
      border-top: 1px solid rgba(148, 163, 184, 0.15);
      padding-top: 18px;
    }

    .footer strong {
      color: #f8fafc;
    }

    @media (max-width: 640px) {
      .container {
        padding: 24px;
      }

      h1 {
        font-size: 32px;
      }

      .subtitle {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <main class="container">
    <span class="badge">Azure Portfolio Project</span>

    <h1>Azure Cloud Lab 🚀</h1>
    <p class="subtitle">
      A hands-on cloud project built by Bruno to demonstrate practical skills in Azure networking,
      platform services, and CI/CD automation using GitHub Actions.
    </p>

    <div class="grid">
      <section class="card">
        <h2>Architecture</h2>
        <ul>
          <li>Hub-and-Spoke network design</li>
          <li>Virtual Networks and subnet segmentation</li>
          <li>VNet peering for private communication</li>
        </ul>
      </section>

      <section class="card">
        <h2>Application Platform</h2>
        <ul>
          <li>Azure App Service (Linux)</li>
          <li>Node.js workload deployment</li>
          <li>Simple web application hosting</li>
        </ul>
      </section>

      <section class="card">
        <h2>DevOps</h2>
        <ul>
          <li>Source code stored in GitHub</li>
          <li>GitHub Actions workflow</li>
          <li>Automatic deployment on push to main</li>
        </ul>
      </section>
    </div>

    <div class="highlight">
      This lab was designed as a practical portfolio project to showcase cloud engineering fundamentals,
      including Azure infrastructure design, application deployment, and continuous delivery.
    </div>
    
    <div style="margin-top:20px;">
      <a href="https://github.com/brunocdiniz/azure-cloud-lab" target="_blank" 
       style="color:#60a5fa; text-decoration:none; font-weight:bold;">
       🔗 View Project on GitHub
      </a>
    </div>

    <div class="footer">
      Built by <strong>Bruno Diniz</strong> as part of Azure Cloud Engineer journey.
    </div>
  </main>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
