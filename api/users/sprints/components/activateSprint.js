const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.activeDataSprint = async (c_sprint_id) => {
    if (h.checkNullQueryAll(c_sprint_id)) {
        return CTX.invalidParameter()
    } else {
        let checkActiveSprint = await db('mst_sprint').whereRaw(`c_status_id = 1 and is_active = 1`)
        if (!h.checkNullQueryAll(checkActiveSprint)) {
            return CTX.templateResponse(400, false, 'duplicated_active_sprint')
        }
        let data = await db('mst_sprint').where('c_sprint_id', c_sprint_id).update({
            is_active: 1
        })
        return CTX.okSample(data)
    }
}