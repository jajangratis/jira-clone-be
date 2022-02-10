
const crypto = require("crypto");
const base64 = require('base-64');
const request = require('request');
const moment = require('moment')
const axios = require('axios').default

const constant = require('../config/keys')
const db = require('../config/database');
const config = require('../config/keys')



exports.randomIntFromInterval = (min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
}


exports.genStringInt = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

exports.uniq = (a) => {
    return Array.from(new Set(a));
}

exports.checkNullQuery = (object) => {
    if (object[0] == undefined || object[0].length == 0) {
        return true;
    };
    return false;
}

exports.checkNullQueryAll = (object) => {
    if (object == undefined || object == '' || (Array.isArray(object)&& object.length == 0) || object == 'undefined' ) {
        return true;
    };
    return false;
}

exports.checkNullQueryAllExtended = (object,rule) => {
    if (!Array.isArray(object)) {
        return this.checkNullQueryAll(object)
    }else{
        if (this.checkNullQueryAll(object)) {
            return true
        }else{
            let result = []
            for (let index = 0; index < object.length; index++) {
                const obj = object[index];
                if (this.checkNullQueryAll(obj)) {
                    result.push('true')
                }else{
                    result.push('false')
                }
                if (index + 1 == object.length) {
                    if (rule == "AND" || rule == "&&" || rule == "and" || rule == "And") {
                        let counter = 0
                        for (let index = 0; index < result.length; index++) {
                            const rs = result[index];
                            if (rs == 'true') {
                                counter = counter + 1
                            }
                            if (index + 1 == result.length) {
                                if (counter == result.length) {
                                    return true
                                }else{
                                    return false
                                }
                            }
                        }
                    }else{
                        if(result.includes('true')){
                            return true
                        }else{
                            return false
                        }
                    }
                }
            }
        }
    }
}

exports.isEmailT = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.isPhoneT = (phone) => {
    var re = /^\d{10,14}$/;
    return re.test(String(phone));
}


exports.secEncrypt = (key, data) => {
    // V1
    // var encoded = JSON.stringify(data);
    // encoded = new Buffer(encoded).toString('base64');
    // var cipher = crypto.createCipher('aes-256-cbc', key);
    // var crypted = cipher.update(encoded, 'utf-8', 'hex');
    // crypted += cipher.final('hex');

    var encoded = JSON.stringify(data);
    encoded = new Buffer.from(encoded).toString('base64');
    var cipher = crypto.createCipheriv('aes-256-cbc', key, config.loginiv);
    var crypted = cipher.update(encoded, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

exports.secDecrypt = (key, data) => {
    // V1
    // var decipher = crypto.createDecipher('aes-256-cbc', key);
    // var decrypted = decipher.update(data, 'hex', 'utf-8');
    // try {
    //     decrypted += decipher.final('utf-8');
    //     decrypted = new Buffer(decrypted, 'base64').toString('ascii')
    //     decrypted = JSON.parse(decrypted);
    // } catch (error) {
    //     decrypted = null;
    // }
    console.log({key, data, config});
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, config.loginiv);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    try {
        decrypted += decipher.final('utf-8');
        decrypted = new Buffer.from(decrypted, 'base64').toString('ascii')
        decrypted = JSON.parse(decrypted);
    } catch (error) {
        decrypted = null;
    }

    return decrypted;
};

exports.secEncryptV3 = (key, iv,data) => {
    let encoded = JSON.stringify(data);
    encoded = new Buffer.from(encoded).toString('base64');
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let crypted = cipher.update(encoded, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

exports.secDecryptV3 = (key, iv, data) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    try {
        decrypted += decipher.final('utf-8');
        decrypted = new Buffer.from(decrypted, 'base64').toString('ascii')
        decrypted = JSON.parse(decrypted);
    } catch (error) {
        decrypted = null;
    }

    return decrypted;
};

exports.secEncryptForData = (key, data, iv) => {
    // V1
    // var encoded = JSON.stringify(data);
    // encoded = new Buffer(encoded).toString('base64');
    // var cipher = crypto.createCipher('aes-256-cbc', key);
    // var crypted = cipher.update(encoded, 'utf-8', 'hex');
    // crypted += cipher.final('hex');

    var encoded = JSON.stringify(data);
    encoded = new Buffer.from(encoded).toString('base64');
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var crypted = cipher.update(encoded, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

exports.secDecryptForData = (key, data, iv) => {
    // V1
    // var decipher = crypto.createDecipher('aes-256-cbc', key);
    // var decrypted = decipher.update(data, 'hex', 'utf-8');
    // try {
    //     decrypted += decipher.final('utf-8');
    //     decrypted = new Buffer(decrypted, 'base64').toString('ascii')
    //     decrypted = JSON.parse(decrypted);
    // } catch (error) {
    //     decrypted = null;
    // }

    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    try {
        decrypted += decipher.final('utf-8');
        decrypted = new Buffer.from(decrypted, 'base64').toString('ascii')
        decrypted = JSON.parse(decrypted);
    } catch (error) {
        decrypted = null;
    }

    return decrypted;
};

exports.reportApi = async (req,res,responseText) => {
    let log = await db('TR_LOG_HIT').insert({
        C_CLIENT_ID: req.userId,
        V_HOST: req.hostname,
        V_BASE_URL: JSON.stringify(req.baseUrl),
        V_URL: JSON.stringify(req.url),
        V_METHOD: req.method,
        V_QUERY: JSON.stringify(req.query),
        V_BODY: JSON.stringify(req.body),
        V_HEADER: JSON.stringify(req.headers),
        V_STATUS_CODE: res.statusCode,
        V_RESPONSE: JSON.stringify(responseText),//.replace(`\n`,"").replace(/[\s]/gmi,"").replace(``,"")),
        D_CREATED_DATE:new Date()
    })
    return log
}


exports.reportApiLogger = async (req,res,data) => {
    let report = await this.reportApi(req, res, data)
    delete data.error
    return data
}

