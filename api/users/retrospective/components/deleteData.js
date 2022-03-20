const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');
const { v4: uuidv4 } = require('uuid')

exports.deleteData = async(c_user_id, c_retro_id) => {
    if (h.checkNullQueryAllExtended([c_user_id, c_retro_id])) {
        return CTX.invalidParameter()
    } else {
        await db('mst_retro').whereRaw(`c_retro_id = ? and c_status_id = 1 and c_user_id = ?`, [c_retro_id, c_user_id]).del()
        return CTX.okSample()
    }
}