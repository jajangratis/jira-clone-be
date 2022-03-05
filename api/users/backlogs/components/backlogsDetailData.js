const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.backlogsData = async (c_backlog_id) => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        let backlogsData = h.checkNullQueryAll(c_backlog_id) ? await db.raw(`
            select * from mst_backlog order by id
        `) : 
        await db.raw(`
            select * from mst_backlog where c_backlog_id = ? order by id
        `,[c_backlog_id]) 
        return CTX.okSample(backlogsData.rows)
    }
}