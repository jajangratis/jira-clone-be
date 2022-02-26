const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.backlogTaskData = async (c_backlog_id) => {
    if (h.checkNullQueryAll(c_backlog_id)) {
        return CTX.invalidParameter()
    } else {
        let listTask = await db.raw(`
        SELECT
            * 
        FROM
            mst_backlog
        WHERE
            c_status_id = 1 
            and c_backlog_id_parent = ?
        `, [c_backlog_id])
        listTask = listTask.rows
        return CTX.okSample(listTask)
    }
}