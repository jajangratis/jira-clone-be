const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.userList = async (search) => {
    if (!h.checkNullQueryAll(search)) {
        search = search.replace(/[^\w\s]/gmi, '')
    }
    let data = await db.raw(`
        select 
            c_user_id,
            v_email,
            v_password,
            v_fullname,
            c_role_id
        from
            mst_user
        where
            c_status_id = 1
        ${!h.checkNullQueryAll(search) ? `
            and
            v_email ilike '%${search}%' or
            v_password ilike '%${search}%' or
            v_fullname ilike '%${search}%' 
        ` : ''}
    `)
    data = data.rows
    return CTX.okSample(data)
}