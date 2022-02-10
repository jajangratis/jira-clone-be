const db = require('../../../config/database');
const h = require('../../../helpers/helper');
const config = require('../../../config/keys');
const sample = require('../../../config/constants');

const login = require('./components/login')
const extractToken = require('./components/extractToken')
const encrypter = require('./components/encrypter')


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
    console.log({token});
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