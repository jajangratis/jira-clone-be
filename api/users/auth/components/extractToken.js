const jwt = require('jsonwebtoken');


const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.extract = async(token) => {
    if (h.checkNullQueryAll(token)) {
        return CTX.templateResponse(400, false, 'no_header')
    } else {
        token = token.replace("Bearer ", "")
        let data = await jwt.verify(token, Buffer.from(keys.masterKeySecure, 'base64'), async function(err, decoded) {
            if (err) {
                return CTX.templateResponse(401, false, err.message)
            }
            if (h.checkNullQueryAllExtended([decoded.v_email, decoded.c_role_id], 'and')) {
                return CTX.templateResponse(400, false, 'no_token_provided')
            };
            let id
            if (!h.checkNullQueryAll(decoded.v_email)) {
                id = await db.select('*').from('mst_user').whereRaw(`"v_email" = ? and "c_status_id" = '1'`, [decoded.v_email])
            }

            if (h.checkNullQueryAll(id[0].c_user_id)) {
                return CTX.templateResponse(400, false, 'invalid_token')
            }

            decoded.ID_USER = id[0].c_user_id
            decoded.C_ROLE_ID = id[0].c_role_id

            return CTX.okSample(decoded);
        });
        return data
    }

}