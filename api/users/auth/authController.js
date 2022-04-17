const db = require('../../../config/database');
const h = require('../../../helpers/helper');
const config = require('../../../config/keys');
const sample = require('../../../config/constants');

const login = require('./components/login')
const extractToken = require('./components/extractToken')
const encrypter = require('./components/encrypter')
const userList = require('./components/userList')
const addUser = require('./components/addUser')
const deleteUser = require('./components/deleteUser')
const editUser = require('./components/editUser')


exports.postLogin = async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    let remember = req.body.remember
    // let ip = req.headers['x-forwarded-for']?.split(',').shift()
    // || req.socket?.remoteAddress
    const ip = req.ip || req.socket?.remoteAddress
    let result = await login.login(email, password, remember, ip);
    // result = await h.reportApiLogger(req, res, result);
    return res.status(result.status).json(result);

}

exports.extractToken = async (req, res, next) => {
    let token = req.body.token
    let result = await extractToken.extract(token)
    // result = await h.reportApiLogger(req, res, result);
    return res.status(result.status).json(result);

}

exports.encrypter = async (req, res, next) => {
    let word = req.body.word
    let result = await encrypter.encrypterPassword(word)
    // result = await h.reportApiLogger(req, res, result);
    return res.status(result.status).json(result);
}

exports.getUserList = async (req, res, next) => {
    let search = req.body.search
    let result = await userList.userList(search)
    return res.status(result.status).json(result);
}

exports.postAddUserList = async (req, res, next) => {
    const { email, password, fullname, role } = req.body
    let result = await addUser.addUser(email, password, fullname, role)
    return res.status(result.status).json(result);
}

exports.postEditUserList = async (req, res, next) => {
    const { v_password, v_fullname, c_role_id, c_user_id } = req.body
    let result = await editUser.editUser(c_user_id, v_password, v_fullname, c_role_id)
    return res.status(result.status).json(result);
}

exports.postDeleteUserList = async (req, res, next) => {
    const { c_user_id } = req.body
    let result = await deleteUser.deleteUser(c_user_id)
    return res.status(result.status).json(result);
}