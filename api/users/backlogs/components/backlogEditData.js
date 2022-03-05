
const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');


exports.backlogTaskEditData = async ({
    c_backlog_id_parent,
    v_title,
    v_description,
    c_assignee,
    v_story_point,
    v_priority,
    c_progress_id='todo',
    c_sprint_id,
    c_backlog_id,
}) => {
    if (h.checkNullQueryAllExtended([c_backlog_id])) {
        return CTX.invalidParameter()
    } else {
        await db('mst_backlog').where('c_backlog_id', c_backlog_id).update({
            c_backlog_id,
            c_backlog_id_parent,
            v_title,
            v_description,
            c_assignee,
            v_story_point,
            v_priority,
            c_progress_id,
        })
        if (h.checkNullQueryAll(c_backlog_id_parent)) {
            await db('tr_sprint_backlog').where('c_backlog_id', c_backlog_id).update({
                c_sprint_id,
                c_status_id: 1
            })
        }
        return CTX.okSample()
    }
}