const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/') {
    if (req.method === 'GET') {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Welcome to the Basic Node Server!' }));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        const data = JSON.parse(body);
        if (data.option === 'posting') {
          res.statusCode = 201;
          res.end(JSON.stringify({ message: 'Successfully created!' }));
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid request body' }));
        }
      });
    } else if (req.method === 'PUT' || req.method === 'PATCH') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        const data = JSON.parse(body);
        if (data.option === 'update') {
          res.statusCode = 200;
          res.end(JSON.stringify({ message: 'Successfully updated!' }));
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid request body' }));
        }
      });
    } else if (req.method === 'DELETE') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        const data = JSON.parse(body);
        if (data.option === 'removal') {
          res.statusCode = 200;
          res.end(JSON.stringify({ message: 'Successfully deleted!' }));
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid request body' }));
        }
      });
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
