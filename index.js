const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesControler = require("./categories/CategoriesController");
const articlesControler = require("./articles/ArticlesController");

const Article = require("./articles/Articles");     //importando o model
const Category = require("./categories/Category");  //importando o model
 
// View engine
app.set('view engine', 'ejs');

// Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!!!");
    }).catch((error) => {
        console.log(error);
})

app.use("/", categoriesControler);

app.get("/", (req, res) => {
    res.render("index");
})

app.use("/", articlesControler);

app.get("/", (req, res) => {
    res.render("index");
})


app.listen(5000, () => {
    console.log("Servidor rodando!")
})