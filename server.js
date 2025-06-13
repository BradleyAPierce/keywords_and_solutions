const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// MIME types for file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.csv': 'text/csv'
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Handle the root URL
  let filePath = req.url === '/' ? './index.html' : '.' + req.url;
  
  // Remove query parameters if any
  filePath = filePath.split('?')[0];
  
  // Ensure proper handling of directory paths
  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }
  
  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set the content type based on the file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Add CORS headers to allow access from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Check if file exists before trying to read it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File does not exist: ${filePath}`);
      
      // For CSV files, check if they're in the csv-files directory
      if (extname === '.csv') {
        console.log(`Checking in csv-files directory for: ${path.basename(filePath)}`);
        const csvFilePath = `./csv-files/${path.basename(filePath)}`;
        
        fs.access(csvFilePath, fs.constants.F_OK, (csvErr) => {
          if (csvErr) {
            console.error(`CSV file not found in csv-files directory: ${csvFilePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Not Found</h1><p>The requested file ${req.url} was not found on this server.</p>`);
          } else {
            // CSV file found in csv-files directory
            console.log(`Serving CSV file from: ${csvFilePath}`);
            fs.readFile(csvFilePath, (readErr, content) => {
              if (readErr) {
                console.error(`Error reading CSV file: ${readErr.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 Internal Server Error</h1><p>Error reading file: ${readErr.code}</p>`);
              } else {
                res.writeHead(200, { 'Content-Type': 'text/csv' });
                res.end(content, 'utf-8');
              }
            });
          }
        });
      } else {
        // Not a CSV file, return 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 Not Found</h1><p>The requested file ${req.url} was not found on this server.</p>`);
      }
      return;
    }
    
    // File exists, read and serve it
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        if (readErr.code === 'ENOENT') {
          // File not found (this should not happen as we already checked existence)
          console.error(`File not found: ${filePath}`);
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(`<h1>404 Not Found</h1><p>The requested file ${req.url} was not found on this server.</p>`);
        } else {
          // Server error
          console.error(`Server error: ${readErr.code}`);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`<h1>500 Internal Server Error</h1><p>Error reading file: ${readErr.code}</p>`);
        }
      } else {
        // Success
        console.log(`Successfully served: ${filePath}`);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`CSV files should be located in: ${path.resolve('./csv-files')}`);
  console.log('Press Ctrl+C to stop the server');
  console.log('Open your browser to http://localhost:3000 to view the Keywords and Solutions Finder');
  
  // List files in the csv-files directory to help with debugging
  fs.readdir('./csv-files', (err, files) => {
    if (err) {
      console.error('Error reading csv-files directory:', err);
    } else {
      console.log('Files in csv-files directory:');
      files.forEach(file => {
        console.log(`- ${file}`);
      });
    }
  });
});