const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.userData = async (c_user_id) => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        if (!h.checkNullQueryAll(c_user_id)) {
            c_user_id = c_user_id.replace(/[^\w,-]/gmi,'')
            c_user_id = c_user_id.split(',')
        }
        let data = await db.raw(`
        SELECT
            c_user_id,
            v_email,
            v_fullname,
            c_role_id
        FROM
            mst_user
        WHERE
            c_status_id = 1 
            ${!h.checkNullQueryAll(c_user_id) ? `c_user_id in (${c_user_id.map(x => `'${x}'`).toString()})` : ''}
        `)
        data = data.rows
        return CTX.okSample(data)
    }
}