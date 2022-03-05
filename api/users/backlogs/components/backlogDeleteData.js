
const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');


exports.backlogTaskDeleteData = async ({
    c_backlog_id,
}) => {
    if (h.checkNullQueryAllExtended([c_backlog_id])) {
        return CTX.invalidParameter()
    } else {
        await db('mst_backlog').where('c_backlog_id', c_backlog_id).update({
            c_status_id: 0
        })
        await db('mst_backlog').where('c_backlog_id_parent', c_backlog_id).update({
            c_status_id: 0
        })
        await db('tr_sprint_backlog').where('c_backlog_id', c_backlog_id).update({
            c_status_id: 0
        })
        return CTX.okSample()
    }
}