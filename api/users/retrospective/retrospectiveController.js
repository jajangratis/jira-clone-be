const data = require('./components/data')
const addData = require('./components/addData')
const deleteData = require('./components/deleteData')
const editData = require('./components/editData')

exports.getData = async (req, res, next) => {
    const {c_sprint_id} = req.query
    let result = await data.getData(c_sprint_id)
    return res.status(result.status).json(result);
}

exports.postAddData = async (req, res, next) => {
    const { c_sprint_id, v_value, c_retro_status } = req.body
    let result = await addData.addData(c_sprint_id, v_value, req.userId, c_retro_status)
    return res.status(result.status).json(result);
}

exports.postEditData = async (req, res, next) => {
    const { c_sprint_id, v_value, c_retro_status, c_retro_id } = req.body
    let result = await editData.editData(c_sprint_id, v_value, req.userId, c_retro_status, c_retro_id)
    return res.status(result.status).json(result);
}

exports.postDeleteData = async (req, res, next) => {
    const { c_retro_id } = req.body
    let result = await deleteData.deleteData(req.userId, c_retro_id)
    return res.status(result.status).json(result);
}