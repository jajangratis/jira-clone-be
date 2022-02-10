const jwt = require('jsonwebtoken');


const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.encrypterPassword = (word='') => {
    return CTX.okSample(h.secEncrypt(keys.masterKeySecure, word))
}