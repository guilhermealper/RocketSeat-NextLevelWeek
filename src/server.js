const express = require("express")
const server = express()
const db = require("./database/db")

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
    //3. consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            console.log(err)
        }
        console.log("Aqui estão seus registros")
        //mostrar bancos de dados
        console.log(rows)
        
        return res.render("search-results.html", {places:rows})

    })

})


//ligar servidor
server.listen(3000)