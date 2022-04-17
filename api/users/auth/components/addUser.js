const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

const { v4: uuidv4 } = require('uuid')

const masterData = require('../../master/components/data')

exports.addUser = async (email, password, fullname, role) => {
    if (h.checkNullQueryAllExtended([email, password, fullname, role])) {
        return CTX.invalidParameter()
    }
    let dataRole = await masterData.masterData()
    dataRole = dataRole.data.filter(x => x.v_master === 'role').map(x => x.c_value_id)
    console.log({dataRole});
    if (!dataRole.includes(role)) {
        return CTX.invalidParameter()
    }
    let existingData = await db('mst_user').whereRaw(`v_email = ? and c_status_id = 1`, [email])
    if (!h.checkNullQueryAll(existingData)) {
        return CTX.templateResponse(400, false, 'duplicate_email')
    }
    let add = await db('mst_user').insert({
        c_user_id: uuidv4(),
        v_email: email,
        v_password: h.secEncrypt(keys.masterKeySecure, password),
        v_fullname: fullname,
        c_role_id: role,
        c_status_id: 1
    }).returning('*')
    console.log({add});
    return CTX.okSample(add)
}