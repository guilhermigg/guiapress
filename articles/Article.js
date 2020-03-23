// 'Model'

const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article);   // Uma categoria tem muitos artigos, 1 para muitos
Article.belongsTo(Category); // belongsTo => pertece a...  1 para 1: um artigo pertence a uma categoria

//Article.sync({force: true});   // recria a tabela toda vez que executar a aplicação.

module.exports = Article;

