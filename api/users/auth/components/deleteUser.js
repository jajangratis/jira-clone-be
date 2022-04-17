const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.deleteUser = async (c_user_id) => {
    if (h.checkNullQueryAllExtended([c_user_id])) {
        return CTX.invalidParameter()
    }
    let deleteData = await db('mst_user').whereRaw(`c_user_id = ? and c_status_id = 1`, [c_user_id]).update({
        c_status_id: 0
    })
    return CTX.okSample(deleteData)
}