const http=require('http');const WebSocket=require('ws');
const PORT=process.env.PORT||8080;
const server=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/plain'});r.end('Eagle relay running\\n')});
const wss=new WebSocket.Server({server});
wss.on('connection',ws=>ws.on('message',raw=>{let m;try{m=JSON.parse(raw)}catch(e){return}
if(m.type==='join'){ws.room=String(m.room||'EAGLE-777');return}
if(m.type==='chat'&&ws.room){m.room=ws.room;for(const p of wss.clients)if(p!==ws&&p.readyState===1&&p.room===ws.room)p.send(JSON.stringify(m))}}));
server.listen(PORT,'0.0.0.0',()=>console.log('Eagle relay listening on '+PORT));