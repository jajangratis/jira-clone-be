const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.backlogsData = async () => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        let listSprints = await db.raw(`
        SELECT
            * 
        FROM
            mst_sprint
            A LEFT JOIN LATERAL ( SELECT string_agg ( c_backlog_id :: TEXT, ',' ) agg_c_backlog_id FROM tr_sprint_backlog WHERE c_status_id = 1 AND c_sprint_id = A.c_sprint_id GROUP BY c_sprint_id ) b ON TRUE 
        WHERE
            A.c_status_id = 1 
        ORDER BY
            is_active DESC
        `)
        listSprints = listSprints.rows
        let idbacklogs = listSprints.filter(x => !h.checkNullQueryAll(x.agg_c_backlog_id))
        idbacklogs = idbacklogs.map(x => x.agg_c_backlog_id.split(',')).flat()
        let backlogsData = !h.checkNullQueryAll(idbacklogs) && await db.raw(`
            select * from mst_backlog where c_backlog_id in (${idbacklogs.map(x => `'${x}'`).toString()}) order by id
        `)
        backlogsData = backlogsData.rows
        listSprints = listSprints.map(x => {
            x.backlogs_data = null
            let splitBacklogId = !h.checkNullQueryAll(x.agg_c_backlog_id) && x.agg_c_backlog_id.split(',')
            if (!h.checkNullQueryAll(splitBacklogId)) {
                x.backlogs_data = backlogsData.filter(x => splitBacklogId.includes(x.c_backlog_id))
            }
            return x
        })
        
        return CTX.okSample(listSprints)
    }
}