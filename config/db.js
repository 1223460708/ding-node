const {Sequelize,Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')

var {
    dbName,
    user,
    password,
    host,
    port
} = require('./config').database

var sequelize = new Sequelize(dbName,user,password,{
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        scopes:{
            bh:{ //去除 不要的字段
                attributes:{
                    exclude:['created_at','updated_at','deleted_at']
                }
            }
        }
    }
})

sequelize.sync({
    force: false
})

module.exports = sequelize