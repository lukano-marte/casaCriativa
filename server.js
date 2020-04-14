//usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

// const ideias = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729036.svg",
//         title: "Cursos",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis tenetur perspiciatis non. Officia aut aspernatur quidem accusantium, fugiat expedita, quaerat quae quas rem modi nostrum beatae unde suscipit in.",
//         url: "https://www.udemy.com/"
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
//         title: "Jogos",
//         category: "Diversão",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis tenetur perspiciatis non. Officia aut aspernatur quidem accusantium, fugiat expedita, quaerat quae quas rem modi nostrum beatae unde suscipit in.",
//         url: "https://store.steampowered.com/?l=portuguese"
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729009.svg",
//         title: "Receitas",
//         category: "Culinária",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis tenetur perspiciatis non. Officia aut aspernatur quidem accusantium, fugiat expedita, quaerat quae quas rem modi nostrum beatae unde suscipit in.",
//         url: "https://www.youtube.com/"
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729046.svg",
//         title: "Faça você mesmo",
//         category: "DIY",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis tenetur perspiciatis non. Officia aut aspernatur quidem accusantium, fugiat expedita, quaerat quae quas rem modi nostrum beatae unde suscipit in.",
//         url: "https://br.pinterest.com/"
//     }

// ]

// configurar arquivos estáticos (css, js, imagens)
server.use(express.static("public"))

//configuração nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

// Criei uma rota/
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideias`, function(err, rows) {

    if (err) return console.log(err)
    const reverseIdeia = [...rows].reverse()
    let lastIdeias = []

    for (let ideia of reverseIdeia) {
        if(lastIdeias.length < 2 ) {
            lastIdeias.push(ideia)
        }
    }

    return res.render("index.html", { ideias: lastIdeias })  

    })
}) 

//Habilidar uso do req.body
server.use(express.urlencoded({ extended: true }))


server.get("/ideias", function(req, res) {

    

    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) return console.log(err)
        const reverseIdeia = [...rows].reverse()
        return res.render("ideias.html", { ideias: reverseIdeia })
    }
)

})


server.post("/", function (req, res) {

//INSERIR DADOS NA TABELA
    const query = `
    INSERT INTO ideias(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
        
    })
    
//CONSULTAR DADOS NA TABELA
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) return console.log(err)
        
        console.log(rows)
    })
}) 

// liguei meu servidor na porta 3000
server.listen(3000)