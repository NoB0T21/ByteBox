import http from 'http'
import app from './app'

const server = http.createServer(app);
const port= Number(process.env.PORT);

server.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
    console.log(`🔥🔥: ${port}`)
})