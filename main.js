import CustomHttpServer from "./customHttpServer.js";

const customServer = new CustomHttpServer();
customServer.initializeServer();

customServer.createRoute('/hello-world', (req, res) => {
    console.log('on main')
})

const response = await fetch('http://localhost:3000/hello-world')
console.log(await response.json())