const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.deleteDataSprint = async (c_sprint_id) => {
    if (h.checkNullQueryAll(c_sprint_id)) {
        return CTX.invalidParameter()
    } else {
        let data = await db('mst_sprint').where('c_sprint_id', c_sprint_id).update({
            c_status_id:0
        })
        return CTX.okSample(data)
    }
}