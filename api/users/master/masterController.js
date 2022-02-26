const data = require('./components/data')
const user = require('./components/user')

exports.getData = async (req, res, next) => {
    let result = await data.masterData()
    return res.status(result.status).json(result);
}

exports.getUserInfo = async (req, res, next) => {
    const c_user_id = req.query.c_user_id
    let result = await user.userData(c_user_id)
    return res.status(result.status).json(result);
}