const sqlite3 = require ('sqlite3').verbose()
const db = new sqlite3.Database('./casaCriativa.db')

db.serialize(function () {
    //CRIAR TABELA
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS ideias(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         title TEXT,
    //         category TEXT,
    //         description TEXT,
    //         link TEXT
    //     );
    // `)

    //INSERIR DADOS NA TABELA
//     const query = `
//     INSERT INTO ideias(
//         image,
//         title,
//         category,
//         description,
//         link
//     ) VALUES (?,?,?,?,?);
// `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729036.svg",
    //     "Cursos",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nobis tenetur perspiciatis non. Officia aut aspernatur quidem accusantium, fugiat expedita, quaerat quae quas rem modi nostrum beatae unde suscipit in.",
    //     "https://www.udemy.com/"
    // ]

    // db.run(query, values, function(err) {
    //     if(err) return console.log(err)
        
    //     console.log(this)
    // })
    
    //CONSULTAR DADOS NA TABELA
//     db.all(`SELECT * FROM ideias`, function(err, rows) {
//         if (err) return console.log(err)
        
//         console.log(rows)
//     })
// }) 

    //DELETAR UM DADO DA TABELA
    // db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err) {
    //     if (err) return console.log(err)

    //     console.log("DELETEI, FODA-SE", this)
    })

    module.exports = db