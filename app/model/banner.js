
const {Sequelize,Model} = require('sequelize')
const sequelize = require('../../config/db')

class Banner extends Model {}

Banner.init({
    image_url: {
        type: Sequelize.STRING,
        set(val) {
            var url_head = global.config.den === 'dev' ? global.config.local_api_url : global.config.api_url
            var img_url = url_head + '/banners/' + val
            this.setDataValue('image_url',img_url)
        }
    },
    action_url: Sequelize.STRING
},{
    sequelize,
    tableName: 'banner'
})

module.exports = Banner