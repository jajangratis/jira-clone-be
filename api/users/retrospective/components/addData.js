const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');
const { v4: uuidv4 } = require('uuid')

exports.addData = async(c_sprint_id, v_value, c_user_id, c_retro_status) => {
    if (h.checkNullQueryAllExtended(c_sprint_id, v_value, c_user_id, c_retro_status)) {
        return CTX.invalidParameter()
    } else {
        let data = await db('mst_retro').insert({
            c_retro_id: uuidv4(),
            c_sprint_id,
            v_value,
            c_status_id: 1,
            c_user_id,
            c_retro_status,

        }).returning("*")
        return CTX.okSample(data)
    }
}