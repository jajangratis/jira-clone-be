const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');


exports.editData = async({
    v_sprint_title,
    v_sprint_description,
    d_start_sprint,
    d_finish_sprint,
    c_sprint_id
}) => {
    if (h.checkNullQueryAllExtended([
        v_sprint_title,
        v_sprint_description,
        d_start_sprint,
        d_finish_sprint,
        c_sprint_id
    ])) {
        return CTX.invalidParameter()
    } else {
        try {
            let data = {
                v_sprint_title,
                v_sprint_description,
                d_start_sprint,
                d_finish_sprint,
                c_status_id:1,       
            }
            await db('mst_sprint').whereRaw(`c_sprint_id = ? and c_status_id = 1`, [c_sprint_id]).update(data)
            return CTX.okSample()
        } catch (error) {
            console.log(error);
            return CTX.systemError()
        }
    }
}
