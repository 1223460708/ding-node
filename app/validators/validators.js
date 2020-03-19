const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            }),
        ]
    }
}
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

class LoginValidator extends LinValidator {
    constructor() {
        super()
        this.phone = [
            new Rule('isLength', 'goods_name不允许为空', {
                min: 1
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    LoginValidator,
    NotEmptyValidator
}


