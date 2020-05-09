const {Sequelize,Model} = require('sequelize')
const sequelize = require('../../config/db')

class Likes extends Model {}

Likes.init({
    title: Sequelize.STRING,
    vipPrice: {
        type:Sequelize.DOUBLE,
        defaultValue:0
    },
    price:  {
        type:Sequelize.DOUBLE,
        defaultValue:0
    },

},{
    sequelize,
    tableName: 'likeshop'
})

module.exports = Likes