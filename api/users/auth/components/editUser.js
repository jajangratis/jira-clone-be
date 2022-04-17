const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

const { v4: uuidv4 } = require('uuid')

const masterData = require('../../master/components/data')

exports.editUser = async (c_user_id, password, fullname, role) => {
    if (h.checkNullQueryAllExtended([c_user_id, fullname, role])) {
        return CTX.invalidParameter()
    }
    let dataRole = await masterData.masterData()
    dataRole = dataRole.data.filter(x => x.v_master === 'role').map(x => x.c_value_id)
    if (!dataRole.includes(role)) {
        return CTX.invalidParameter()
    }
    let existingData = await db('mst_user').whereRaw(`c_user_id = ? and c_status_id = 1`, [c_user_id])
    if (existingData[0].v_password === password) {
        password = undefined
    }
    let dataUpdate = h.checkNullQueryAll(password) ? {
        v_fullname: fullname,
        c_role_id: role,
        c_status_id: 1
    } : {
        v_password: h.secEncrypt(keys.masterKeySecure, password),
        v_fullname: fullname,
        c_role_id: role,
        c_status_id: 1
    }
    let update = await db('mst_user').whereRaw(`c_user_id = ? and c_status_id = 1`, [c_user_id]).update(dataUpdate).returning('*')
    return CTX.okSample(update)
}