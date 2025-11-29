const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.end("This is the about page")
    }

    if (req.url === "/profile"){
        res.end("This is the profile page")
    }   

})

server.listen(3000) 



