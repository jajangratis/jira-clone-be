const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.getData = async(c_sprint_id) => {
    if (h.checkNullQueryAll(c_sprint_id)) {
        return CTX.invalidParameter()
    } else {
        let data = await db('mst_retro').whereRaw(`c_status_id = 1 and c_sprint_id = ?`, [c_sprint_id])
        return CTX.okSample(data)
    }
}