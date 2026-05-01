const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 4300;
const DIR = path.join(__dirname, 'dist/first-app/browser');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

const ONE_YEAR = 31536000;

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function shouldCompress(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.webmanifest', '.map'].includes(ext);
}

function getCacheHeaders(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.css', '.js'].includes(ext)) {
    return { 'Cache-Control': `public, max-age=${ONE_YEAR}, immutable` };
  }
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2', '.ico'].includes(ext)) {
    return { 'Cache-Control': `public, max-age=${ONE_YEAR}, immutable` };
  }
  return { 'Cache-Control': 'public, max-age=3600' };
}

function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

const server = http.createServer((req, res) => {
  let filePath = path.join(DIR, req.url === '/' ? '/index.html' : req.url);
  
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeType = getMimeType(filePath);
  const cacheHeaders = getCacheHeaders(filePath);
  const securityHeaders = getSecurityHeaders();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    if (shouldCompress(filePath) && req.headers['accept-encoding']?.includes('br')) {
      zlib.brotliCompress(data, (err, compressed) => {
        if (err) {
          res.writeHead(500);
          res.end('Compression Error');
          return;
        }
        res.writeHead(200, {
          'Content-Type': mimeType,
          'Content-Encoding': 'br',
          ...cacheHeaders,
          ...securityHeaders,
          'Vary': 'Accept-Encoding',
        });
        res.end(compressed);
      });
    } else if (shouldCompress(filePath) && req.headers['accept-encoding']?.includes('gzip')) {
      zlib.gzip(data, (err, compressed) => {
        if (err) {
          res.writeHead(500);
          res.end('Compression Error');
          return;
        }
        res.writeHead(200, {
          'Content-Type': mimeType,
          'Content-Encoding': 'gzip',
          ...cacheHeaders,
          ...securityHeaders,
          'Vary': 'Accept-Encoding',
        });
        res.end(compressed);
      });
    } else {
      res.writeHead(200, {
        'Content-Type': mimeType,
        ...cacheHeaders,
        ...securityHeaders,
      });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
