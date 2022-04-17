
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
                B.c_sprint_id = ?
                and A.c_status_id = 1
                and B.c_status_id = 1
            ORDER BY
                A.ID ASC
        `, [activeSprint.c_sprint_id])
        backlogsData = backlogsData.rows
        if (!h.checkNullQueryAll(backlogsData)) {
            let childids = []
            for (let index = 0; index < backlogsData.length; index++) {
                let x = backlogsData[index];
                x.childData = await db.raw(`
                select * from mst_backlog where c_backlog_id_parent = ? 
                and c_status_id = 1 order by id ASC
                `,[x.c_backlog_id]) 
                x.childData = x.childData.rows
                childids.push(...x.childData.map(x => x.c_backlog_id))
            }
            if (!h.checkNullQueryAll(childids)) {
                let addition = await db.raw(`
                select * from mst_backlog where c_backlog_id in (${childids.map(x => `'${x}'`).toString()})
                and c_status_id = 1 order by id ASC
                `) 
                addition = addition.rows
                if (!h.checkNullQueryAll(addition)) {
                    for (let index = 0; index < addition.length; index++) {
                        let x = addition[index];
                        x.childData = await db.raw(`
                        select * from mst_backlog where c_backlog_id_parent = ? 
                        and c_status_id = 1 order by id ASC
                        `,[x.c_backlog_id]) 
                        x.childData = x.childData.rows
                    }
                }
                backlogsData = [...backlogsData, ...addition]
            }
        }
        backlogsData = backlogsData.filter(x => !h.checkNullQueryAll(x.childData))
        return CTX.okSample(backlogsData)
    }
}