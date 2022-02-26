const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');

exports.masterData = async () => {
    if (false) {
        return CTX.invalidParameter()
    } else {
        
        let data = await db.raw(`
        SELECT
            c_value_id,
            v_master,
            v_value,
            v_description,
            v_order
        FROM
            mst_value
        WHERE
            c_status_id = 1 
        ORDER BY
            v_order DESC
        `)
        data = data.rows
        return CTX.okSample(data)
    }
}