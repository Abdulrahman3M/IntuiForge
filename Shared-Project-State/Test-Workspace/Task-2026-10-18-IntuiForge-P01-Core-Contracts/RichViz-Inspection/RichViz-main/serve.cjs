const fs=require('fs'),path=require('path'),http=require('http');

const root=__dirname;
const mime={'.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.json':'application/json; charset=utf-8'};
const server=http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://local').pathname)}catch{res.writeHead(400).end();return;}const relative=pathname==='/'?'/src/gallery/index.html':pathname;const file=path.resolve(root,'.'+relative);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(error,data)=>{if(error){res.writeHead(error.code==='ENOENT'?404:500).end();return;}res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);});});
server.listen(Number(process.argv[2] || 8080),'127.0.0.1',()=>{
 const base=`http://127.0.0.1:${server.address().port}`;
 console.log('Rich Viz gallery: '+base+'/src/gallery/index.html');
 console.log('Asset catalog: '+base+'/Assets/index.html');
 console.log('Press Ctrl+C to stop.');
});
