const {Sequelize,Model} = require('sequelize')
const sequelize = require('../../config/db')

class User extends Model {
    static async createUser(obj) {
        var user = await User.create(obj)
        return user
    }

    static async findUser(userId) {
        var user = await User.findOne({
            where: {
                user_id: userId
            }
        })
        return user
    }

    // static async updateUser(user,obj) {
    //     await user.update(obj)
    // }
}

User.init({
    userId: {
        type: Sequelize.STRING,
        primaryKey:true,
    },
    userName: Sequelize.STRING,
    token: Sequelize.STRING,
    password: Sequelize.STRING,
    workOrderAuth: Sequelize.INTEGER,
    organizationId: Sequelize.INTEGER
},{
    sequelize,
    tableName: 'user'
})

module.exports = User
