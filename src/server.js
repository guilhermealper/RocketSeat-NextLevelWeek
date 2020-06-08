const express = require("express")
const server = express()

//configurando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})
//configurando pasta public
server.use(express.static("public"))


// configurar caminhos
//página inicial
server.get("/", (req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {
    return res.render("search-results.html")
})


//ligar servidor
server.listen(3000)