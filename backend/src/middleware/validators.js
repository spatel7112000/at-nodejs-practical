const validators = require("../utils/validation")


module.exports = function(validator) {
    return async function(req, res, next) {
        try {
            const validated = await validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if(err.isJoi) 
            res.status(422).json({
                success: false,
                statusCode: 422,
                data: null,
                message:err.details[0].message.replaceAll('\"', ''),
            })
        }
    }
}