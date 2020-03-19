// Controller

const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");


router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

// salva as categorias no BD
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect("/admin/categories/new");
    }
});


// renderiza na tela as categorias
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    })
});

// deletar categorias

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){      // é numerico ou não. E se não for numérico, 'pula' para o else, redirecionado para a rota. E se for numérico 'entra no Destroy'

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");

            });            
        }else{               // se não for um número
            res.redirect("/admin/categories");
        }        

    }else{                  // se for nulo (faz oparte estre else do primeiro 'if' (undefined))
        res.redirect("/admin/categories");
    }
});


// Edição de Categoria

router.get("/Admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;
    Category.findByPk(id).then(category => {
    if(id != undefined){

        res.render("admin/categories/edit", {category: category});   

        }else{          
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");

    })   

});


// Salvando a Edição de Categorias

router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title) },{
        where: {
            id: id
        }
        }).then(() => {
            res.redirect("/admin/categories");
    })
});

module.exports = router;