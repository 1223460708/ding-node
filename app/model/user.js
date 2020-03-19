const {Sequelize,Model} = require('sequelize')
const sequelize = require('../../config/db')

class User extends Model {
    static async createUser(obj) {
        var user = await User.create(obj)
        return user
    }
}

User.init({
    user_id: {
        type: Sequelize.STRING,
        primaryKey:true,
    },
    nickname: Sequelize.STRING,
    user_token: Sequelize.STRING,
    phone: Sequelize.STRING
},{
    sequelize,
    tableName: 'user'
})

module.exports = User
