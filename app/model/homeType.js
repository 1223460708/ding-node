const {Sequelize,Model} = require('sequelize')
const sequelize = require('../../config/db')

class HomeClassify extends Model {}


HomeClassify.init({
    classify_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    img_url: Sequelize.STRING,
    title: Sequelize.STRING,
    action_url: Sequelize.STRING
},{
    sequelize,
    tableName: 'home_classify'
})

module.exports = HomeClassify