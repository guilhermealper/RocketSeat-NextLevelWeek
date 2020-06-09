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

//habilitar req.body com express
server.use(express.urlencoded({extended:true}))

// configurar caminhos
//página inicial
server.get("/", (req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req,res) => {
//req.query: query string da url (ao enviar submit)
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //consultando dados do form. req.body só funciona pq foi habilitado urlenconded
    console.log("meu body: ", req.body)

    //adicionando ao banco de dados
     //2. inserir dados na tabela
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Ocorreu um erro no cadastro, por favor tente novamente.")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
            //req.body: corpo do formulário
    return res.render("create-point.html", {saved: true})
    }

    db.run(query,values, afterInsertData)

})



server.get("/search", (req,res) => {
    const search = req.query.search

    if(search == "" || search == null){
        return res.render("search-results.html", {places:[]})
    }


    //3. consultar dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
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