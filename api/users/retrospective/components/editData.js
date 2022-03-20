const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');
const { v4: uuidv4 } = require('uuid')

exports.editData = async(c_sprint_id, v_value, c_user_id, c_retro_status, c_retro_id) => {
    if (h.checkNullQueryAllExtended(c_sprint_id, v_value, c_user_id, c_retro_status, c_retro_id)) {
        return CTX.invalidParameter()
    } else {
        await db('mst_retro').whereRaw(`c_retro_id = ? and c_status_id = 1`, [c_retro_id]).update({
            c_retro_id,
            c_sprint_id,
            v_value,
            c_status_id: 1,
            c_user_id,
            c_retro_status,
        })
        return CTX.okSample()
    }
}