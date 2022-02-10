const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.getDataSprint = async (search) => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        if (!h.checkNullQueryAll(search)) {
            search = search.replace(/[^\w\s]/gmi,'')
        }
        let data = await db('mst_sprint').whereRaw(`
            c_status_id = 1
            ${!h.checkNullQueryAll(search) ? `AND (v_sprint_title ilike '%${search}%' or v_sprint_description ilike '%${search}%')` : ''}
        `).orderBy('id', 'desc')
        return CTX.okSample(data)
    }
}