
const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');


exports.backlogTaskAddData = async ({
    c_backlog_id_parent,
    v_title,
    v_description,
    c_assignee,
    v_story_point,
    v_priority,
    c_progress_id='todo',
    c_sprint_id,
}) => {
    if (h.checkNullQueryAllExtended([v_title, c_sprint_id])) {
        return CTX.invalidParameter()
    } else {
        let c_backlog_id = uuidv4()
        await db('mst_backlog').insert({
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
            await db('tr_sprint_backlog').insert({
                c_sprint_id,
                c_backlog_id,
                c_status_id: 1
            })
        }
        return CTX.okSample()
    }
}