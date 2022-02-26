const jwt = require('jsonwebtoken');

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');
const moment = require('moment');

exports.login = async (username, password, long, ip) => {
    if (h.checkNullQueryAll(username, password)) {
        return CTX.invalidParameter()
    } else {
        let cekKey
        let duration
        if (long == 'true' || long == true) {
            duration = "30 days" // 30 hari
        } else {
            duration  = '8 hours'
        }
        try {
            cekKey = await db.select('*').from('mst_user').whereRaw(`"c_status_id" = '1' AND "v_email" = ?`,[username])
        } catch (error) {
            return CTX.systemError(CTX.responseCode.BADREQUEST, error)
        }
        if (h.checkNullQueryAll(cekKey)) {
            return CTX.invalidAuth()
            // return CTX.templateResponse(CTX.responseCode.BADREQUEST, CTX.responseSuccess.FALSE, 'user_not_found')
        } else {
            let compare = h.secDecrypt(keys.masterKeySecure,cekKey[0].v_password)
            if (password != compare) {
                return CTX.invalidAuth()
                // return CTX.templateResponse(CTX.responseCode.UNAUTHORIZED, CTX.responseSuccess.FALSE, 'invalid_secret')
            } else {
                let TOKENC = jwt.sign({ v_email: cekKey[0].v_email}, Buffer.from(keys.masterKeySecure, 'base64'), {
                    expiresIn: duration
                });
                return CTX.okSample({
                    token: TOKENC,
                    role: cekKey[0].c_role_id,
                    email: username,
                    duration,
                    expired: moment().add(duration).format("YYYY-MM-DD HH:mm:ss").toString()
                })
            }
        }
    }
}