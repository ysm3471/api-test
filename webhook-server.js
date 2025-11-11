const http = require('http');
const { exec } = require('child_process');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/payload') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const payload = JSON.parse(body);
      // 브랜치 확인
      if (payload.ref === 'refs/heads/main') {
        const now = new Date();
        console.log(`[${now.toISOString()}] Deploy started for branch: main`);
        exec('./deploy.sh', (err, stdout, stderr) => {
          const finished = new Date();
          if (err) console.error(`[${finished.toISOString()}] Deploy error:`, err);
          else console.log(`[${finished.toISOString()}] Deploy finished\n${stdout}`);
        });
      }
      res.writeHead(200);
      res.end('ok');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(9000, () => console.log('Webhook listening on port 9000'));
