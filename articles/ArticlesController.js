const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");


router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
            res.render("admin/articles/index", {articles: articles})
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })    
});


// salvar artigos

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });

});


//Deletar Artigos
router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){      // é numerico ou não. E se não for numérico, 'pula' para o else, redirecionado para a rota. E se for numérico 'entra no Destroy'

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");

            });            
        }else{               // se não for um número
            res.redirect("/admin/articles");
        }        

    }else{                  // se for nulo (faz oparte estre else do primeiro 'if' (undefined))
        res.redirect("/admin/articles");
    }
});


module.exports = router;

