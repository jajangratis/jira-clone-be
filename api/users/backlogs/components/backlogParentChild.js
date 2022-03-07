
const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.backlogsParentChild = async (c_backlog_id) => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        let backlogsData = h.checkNullQueryAll(c_backlog_id) ? await db.raw(`
            select * from mst_backlog where c_backlog_id_parent is null order by id
        `) : 
        await db.raw(`
            select * from mst_backlog where c_backlog_id_parent is null and c_backlog_id = ? order by id
        `,[c_backlog_id]) 
        backlogsData = backlogsData.rows
        if (!h.checkNullQueryAll(backlogsData)) {
            for (let index = 0; index < backlogsData.length; index++) {
                let x = backlogsData[index];
                x.childData = await db.raw(`
                select * from mst_backlog where c_backlog_id_parent = ? order by id
                `,[x.c_backlog_id]) 
                x.childData = x.childData.rows
            }
        }
        return CTX.okSample(backlogsData)
    }
}