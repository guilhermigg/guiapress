const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesControler = require("./categories/CategoriesController");
const articlesControler = require("./articles/ArticlesController");

const Article = require("./articles/Article");     //importando o model
const Category = require("./categories/Category");  //importando o model
 
// View engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
})

// Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!!!");
    }).catch((error) => {
        console.log(error);
})

// Database

app.get("/", categoriesControler);
app.get("/", articlesControler);

app.get("/", (req, res) => {
    Article.findAll().then(articles => {
        res.render("index", {articles: articles});
   });
})

app.listen(5000, () => {
    console.log("Servidor rodando!")
})

    