const { v4: uuidv4 } = require('uuid')

const db = require('../../../../config/database');
const h = require('../../../../helpers/helper');
const keys = require('../../../../config/keys');
const CTX = require('../../../../config/constants');


exports.addData = async({
    v_sprint_title,
    v_sprint_description,
    d_start_sprint,
    d_finish_sprint,
}) => {
    if (h.checkNullQueryAllExtended([
        v_sprint_title,
        v_sprint_description,
        d_start_sprint,
        d_finish_sprint,
    ])) {
        return CTX.invalidParameter()
    } else {
        try {
            let data = {
                c_sprint_id: uuidv4(),
                v_sprint_title,
                v_sprint_description,
                d_start_sprint,
                d_finish_sprint,
                c_status_id:1,       
            }
            console.log({data});
            await db('mst_sprint').insert(data)
            return CTX.okSample()
        } catch (error) {
            console.log(error);
            return CTX.systemError()
        }
    }
}
