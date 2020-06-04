const express = require("express")
const server = express()

//configurando pasta public
server.use(express.static("public"))


// configurar caminhos
//página inicial
server.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req,res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

//ligar servidor
server.listen(3000)