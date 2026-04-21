const http = require("http");

const port = process.env.PORT || 8080;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Azure Cloud Lab | Bruno Diniz</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg:       #080d14;
      --surface:  #0e1622;
      --border:   rgba(255,255,255,0.08);
      --blue:     #3b82f6;
      --blue-dim: rgba(59,130,246,0.15);
      --green:    #22c55e;
      --green-dim:rgba(34,197,94,0.12);
      --amber:    #f59e0b;
      --text:     #f1f5f9;
      --muted:    #64748b;
      --subtle:   #1e2d40;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      min-height: 100vh;
      padding: 40px 24px 80px;
    }

    /* ── Grid lines background ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    main {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }

    .fade-1 { animation: fadeUp 0.5s ease both 0.05s; }
    .fade-2 { animation: fadeUp 0.5s ease both 0.15s; }
    .fade-3 { animation: fadeUp 0.5s ease both 0.25s; }
    .fade-4 { animation: fadeUp 0.5s ease both 0.35s; }
    .fade-5 { animation: fadeUp 0.5s ease both 0.45s; }
    .fade-6 { animation: fadeUp 0.5s ease both 0.55s; }
    .fade-7 { animation: fadeUp 0.5s ease both 0.65s; }

    /* ── Header ── */
    .header { margin-bottom: 40px; }

    .badge-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .badge {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid;
    }

    .badge-blue  { background: var(--blue-dim);  border-color: rgba(59,130,246,0.4);  color: #93c5fd; }
    .badge-green { background: var(--green-dim); border-color: rgba(34,197,94,0.35);  color: #86efac; }
    .badge-amber { background: rgba(245,158,11,0.12); border-color: rgba(245,158,11,0.35); color: #fcd34d; }

    /* CI badge image aligns with text badges */
    .badge-ci {
      display: inline-flex;
      align-items: center;
      height: 25px;
    }
    .badge-ci img { height: 20px; display: block; }

    h1 {
      font-size: clamp(32px, 6vw, 52px);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
      color: #fff;
    }

    h1 span { color: var(--blue); }

    .subtitle {
      font-size: 16px;
      color: var(--muted);
      line-height: 1.7;
      max-width: 600px;
    }

    /* ── Status bar ── */
    .status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--green-dim);
      border: 1px solid rgba(34,197,94,0.25);
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 36px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
      color: #86efac;
    }

    .dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--green);
      animation: pulse 2s infinite;
      flex-shrink: 0;
    }

    /* ── Metrics ── */
    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 36px;
    }

    .metric {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
    }

    .metric-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: var(--muted);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .metric-value {
      font-size: 26px;
      font-weight: 700;
      color: #fff;
    }

    .metric-value span {
      font-size: 12px;
      font-weight: 400;
      color: var(--muted);
      margin-left: 4px;
    }

    /* ── Section title ── */
    .section-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* ── Architecture diagram ── */
    .diagram {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 36px;
      overflow-x: auto;
    }

    .diag-flow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      min-width: 560px;
    }

    .diag-node {
      background: var(--subtle);
      border: 1px solid rgba(59,130,246,0.25);
      border-radius: 8px;
      padding: 12px 16px;
      text-align: center;
      flex-shrink: 0;
    }

    .diag-node.accent {
      border-color: rgba(59,130,246,0.6);
      background: var(--blue-dim);
    }

    .diag-icon {
      font-size: 20px;
      display: block;
      margin-bottom: 6px;
    }

    .diag-name {
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      display: block;
    }

    .diag-sub {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: var(--muted);
      display: block;
      margin-top: 2px;
    }

    .diag-arrow {
      font-size: 18px;
      color: var(--blue);
      padding: 0 10px;
      flex-shrink: 0;
    }

    /* ── Cards grid ── */
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 36px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-title::before {
      content: '';
      width: 3px;
      height: 14px;
      background: var(--blue);
      border-radius: 2px;
      display: block;
    }

    .card-items { list-style: none; }

    .card-items li {
      font-size: 13px;
      color: var(--muted);
      padding: 5px 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-items li:last-child { border-bottom: none; }

    .card-items li::before {
      content: '';
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--blue);
      flex-shrink: 0;
    }

    /* ── Lessons ── */
    .lessons {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-bottom: 36px;
    }

    .lesson {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--blue);
      border-radius: 0 10px 10px 0;
      padding: 16px 20px;
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }

    .lesson-num {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: var(--blue);
      flex-shrink: 0;
      padding-top: 2px;
    }

    .lesson-text {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.6;
    }

    .lesson-text strong { color: var(--text); font-weight: 600; }

    /* ── Timeline ── */
    .timeline { margin-bottom: 36px; }

    .tl-item {
      display: flex;
      gap: 16px;
      padding-bottom: 20px;
      position: relative;
    }

    .tl-item:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 7px; top: 18px;
      width: 1px;
      height: calc(100% - 10px);
      background: var(--border);
    }

    .tl-dot {
      width: 16px; height: 16px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: var(--surface);
      flex-shrink: 0;
      margin-top: 2px;
      position: relative;
      z-index: 1;
    }

    .tl-dot.done {
      border-color: var(--blue);
      background: var(--blue-dim);
    }

    .tl-dot.done::after {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background: var(--blue);
    }

    .tl-body { flex: 1; }

    .tl-title {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 3px;
    }

    .tl-desc {
      font-size: 12px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* ── Footer ── */
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      border-top: 1px solid var(--border);
      padding-top: 24px;
    }

    .footer-left { font-size: 13px; color: var(--muted); }
    .footer-left strong { color: var(--text); }

    .gh-link {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
      color: #93c5fd;
      text-decoration: none;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 7px 14px;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .gh-link:hover { background: var(--blue-dim); }

    /* ── Responsive ── */
    @media (max-width: 680px) {
      .metrics { grid-template-columns: repeat(2, 1fr); }
      .cards   { grid-template-columns: 1fr; }
    }

    @media (max-width: 420px) {
      .metrics { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>
  <main>

    <!-- HEADER -->
    <header class="header fade-1">
      <div class="badge-row">
        <span class="badge badge-blue">Azure Portfolio</span>
        <span class="badge badge-green">App Service: Running</span>
        <span class="badge badge-amber">Node.js 20 · Linux</span>
        <span class="badge-ci">
          <img
            src="https://github.com/brunocdiniz/azure-cloud-lab/actions/workflows/main_bruno-azure-lab-app.yml/badge.svg"
            alt="CI/CD status"
            onerror="this.parentElement.style.display='none'"
          />
        </span>
      </div>

      <h1>Azure Cloud <span>Lab</span></h1>
      <p class="subtitle">
        Projeto prático de cloud engineering demonstrando networking, platform services
        e CI/CD automation no Azure — feito para aprender e para o portfolio.
      </p>
    </header>

    <!-- STATUS BAR -->
    <div class="status-bar fade-2">
      <div class="dot"></div>
      App Service online &nbsp;·&nbsp; West Europe &nbsp;·&nbsp; B1 tier &nbsp;·&nbsp; Auto-deploy via GitHub Actions
    </div>

    <!-- METRICS -->
    <div class="metrics fade-3">
      <div class="metric">
        <div class="metric-label">Recursos Azure</div>
        <div class="metric-value">12<span>total</span></div>
      </div>
      <div class="metric">
        <div class="metric-label">VNets</div>
        <div class="metric-value">3<span>peered</span></div>
      </div>
      <div class="metric">
        <div class="metric-label">Build time</div>
        <div class="metric-value">~45<span>sec</span></div>
      </div>
      <div class="metric">
        <div class="metric-label">Custo / mês</div>
        <div class="metric-value">~$8<span>USD</span></div>
      </div>
    </div>

    <!-- ARCHITECTURE -->
    <div class="section-label fade-4">Arquitetura</div>
    <div class="diagram fade-4">
      <div class="diag-flow">
        <div class="diag-node">
          <span class="diag-icon">⬡</span>
          <span class="diag-name">GitHub</span>
          <span class="diag-sub">source + CI/CD</span>
        </div>
        <div class="diag-arrow">→</div>
        <div class="diag-node accent">
          <span class="diag-icon">☁</span>
          <span class="diag-name">Hub VNet</span>
          <span class="diag-sub">10.0.0.0/16</span>
        </div>
        <div class="diag-arrow">⇄</div>
        <div class="diag-node">
          <span class="diag-icon">⬡</span>
          <span class="diag-name">Spoke VNet</span>
          <span class="diag-sub">10.1.0.0/16</span>
        </div>
        <div class="diag-arrow">→</div>
        <div class="diag-node accent">
          <span class="diag-icon">▣</span>
          <span class="diag-name">App Service</span>
          <span class="diag-sub">Linux · B1</span>
        </div>
      </div>
    </div>

    <!-- COMPONENTS CARDS -->
    <div class="section-label fade-5">Componentes</div>
    <div class="cards fade-5">
      <div class="card">
        <div class="card-title">Networking</div>
        <ul class="card-items">
          <li>Hub-and-Spoke design</li>
          <li>VNet peering privado</li>
          <li>Subnet segmentation</li>
          <li>NSG rules configuradas</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">App Platform</div>
        <ul class="card-items">
          <li>Azure App Service Linux</li>
          <li>Node.js 20 runtime</li>
          <li>Deployment slots</li>
          <li>Health check endpoint</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">DevOps</div>
        <ul class="card-items">
          <li>GitHub Actions pipeline</li>
          <li>Auto deploy on push</li>
          <li>Service Principal auth</li>
          <li>Secrets via env vars</li>
        </ul>
      </div>
    </div>

    <!-- LESSONS LEARNED -->
    <div class="section-label fade-6">Lessons Learned</div>
    <div class="lessons fade-6">
      <div class="lesson">
        <span class="lesson-num">01</span>
        <p class="lesson-text">
          <strong>VNet peering não é transitivo.</strong>
          O tráfego entre dois spokes não passa automaticamente pelo hub — foi necessário configurar UDRs (User Defined Routes) explícitas para garantir a conectividade.
        </p>
      </div>
      <div class="lesson">
        <span class="lesson-num">02</span>
        <p class="lesson-text">
          <strong>App Service + VNet integration requer plano adequado.</strong>
          Para acesso privado e VNet Integration, o tier Basic (B1) tem limitações — o ideal é Premium v2 ou superior em produção.
        </p>
      </div>
      <div class="lesson">
        <span class="lesson-num">03</span>
        <p class="lesson-text">
          <strong>Service Principal precisa de permissões no Resource Group.</strong>
          O role assignment para o GitHub Actions deve ser feito no Resource Group (Contributor), não apenas no App Service — caso contrário o deploy falha silenciosamente.
        </p>
      </div>
    </div>

    <!-- TIMELINE -->
    <div class="section-label fade-7">Progresso do Projeto</div>
    <div class="timeline fade-7">
      <div class="tl-item">
        <div class="tl-dot done"></div>
        <div class="tl-body">
          <div class="tl-title">Infraestrutura base</div>
          <div class="tl-desc">VNets, subnets e peering configurados. NSGs e route tables definidas.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot done"></div>
        <div class="tl-body">
          <div class="tl-title">App Service deployment</div>
          <div class="tl-desc">App Service criado, aplicação Node.js deployed e acessível publicamente.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot done"></div>
        <div class="tl-body">
          <div class="tl-title">CI/CD pipeline</div>
          <div class="tl-desc">GitHub Actions configurado — cada push na main faz deploy automático em ~45s.</div>
        </div>
      </div>
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-body">
          <div class="tl-title">Próximos passos</div>
          <div class="tl-desc">Azure Monitor + Application Insights, custom domain com SSL, e Terraform para IaC.</div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer fade-7">
      <span class="footer-left">
        Feito por <strong>Bruno Diniz</strong> — Azure Cloud Engineer journey
      </span>
      <a class="gh-link" href="https://github.com/brunocdiniz/azure-cloud-lab" target="_blank">
        ↗ Ver no GitHub
      </a>
    </footer>

  </main>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
