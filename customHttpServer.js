import http from 'http';
import { hostname as os_hostname } from 'os';

class CustomHttpServer {
    httpServer = null;
    routeMap = {}

    constructor() {
        this.httpServer = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end('{ "res": "Server up! :)" }');
        });
        
    }
    
    initializeServer(port=3000, hostname=os_hostname) {
        console.log(`Server running at http://${hostname}:${port}/`);
        this.httpServer.listen(port, hostname);
    }

    closeServer() {
        this.httpServer.close();
    }

    updateOnRequestListener() {
        this.httpServer.on('request', (req, res) => {
            const { url } = req;
            console.log(`on request for ${url}`);
            
            if (this.routeMap[url]) {
                this.routeMap[url](req, res);
            } else {
                res.statusCode = 404;
                res.end('{ "res": "Not found" }');
            }
        });
    }

    createRoute(path, callback) {
        this.routeMap[path] = callback
        this.updateOnRequestListener()
    }

    removeRoute(path) {
        this.routeMap[path] = null
        this.updateOnRequestListener()
    }
}

export default CustomHttpServer;