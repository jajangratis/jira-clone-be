
const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.backlogsParentChild = async (c_sprint_id) => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        let activeSprint 
        if (h.checkNullQueryAll(c_sprint_id)) {
            let getSprint = await db('mst_sprint').orderBy('id', 'asc')
            activeSprint = getSprint.filter(x => x.is_active == 1)
            if (h.checkNullQueryAll(activeSprint)) {
                activeSprint = getSprint[getSprint.length-1]
            } else {
                activeSprint = activeSprint[0]
            }
        } else {
            activeSprint = {c_sprint_id}
        }
        let backlogsData = await db.raw(`
            SELECT A
                .* 
            FROM
                mst_backlog
                A JOIN tr_sprint_backlog B ON A.c_backlog_id = B.c_backlog_id 
            WHERE
                A.c_backlog_id_parent IS NULL 
                AND B.c_sprint_id = ?
            ORDER BY
                A.ID ASC
        `, [activeSprint.c_sprint_id])
        backlogsData = backlogsData.rows
        if (!h.checkNullQueryAll(backlogsData)) {
            for (let index = 0; index < backlogsData.length; index++) {
                let x = backlogsData[index];
                x.childData = await db.raw(`
                select * from mst_backlog where c_backlog_id_parent = ? order by id ASC
                `,[x.c_backlog_id]) 
                x.childData = x.childData.rows
            }
        }
        return CTX.okSample(backlogsData)
    }
}