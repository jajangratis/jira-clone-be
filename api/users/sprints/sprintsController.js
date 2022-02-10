const db = require('../../../config/database');
const h = require('../../../helpers/helper');
const config = require('../../../config/keys');
const sample = require('../../../config/constants');


const dataSprint = require('./components/getData')
const addSprint = require('./components/addData')
const deleteSprint = require('./components/deleteData')
const editSprint = require('./components/editData')
const activeSprint = require('./components/activateSprint')
const finishSprint = require('./components/finishSprint')


// SPRINT
exports.getSprintData = async (req, res, next) => {
    let search = req.query.search
    let result = await dataSprint.getDataSprint(search)
    return res.status(result.status).json(result);
}

exports.postSprintData = async (req, res) => {
    let v_sprint_title = req.body.v_sprint_title 
    let v_sprint_description = req.body.v_sprint_description 
    let d_start_sprint = req.body.d_start_sprint 
    let d_finish_sprint = req.body.d_finish_sprint
    let result = await addSprint.addData({
        v_sprint_title,
        v_sprint_description,
        d_start_sprint,
        d_finish_sprint
    })
    return res.status(result.status).json(result);
}

exports.postDeleteSprintData = async (req, res, next) => {
    let c_sprint_id = req.body.c_sprint_id
    let result = await deleteSprint.deleteDataSprint(c_sprint_id)
    return res.status(result.status).json(result);
}

exports.postEditSprintData = async (req, res) => {
    let c_sprint_id = req.body.c_sprint_id 
    let v_sprint_title = req.body.v_sprint_title 
    let v_sprint_description = req.body.v_sprint_description 
    let d_start_sprint = req.body.d_start_sprint 
    let d_finish_sprint = req.body.d_finish_sprint
    let result = await editSprint.editData({
        c_sprint_id,
        v_sprint_title,
        v_sprint_description,
        d_start_sprint,
        d_finish_sprint
    })
    return res.status(result.status).json(result);
}

exports.postActiveSprintData = async (req, res, next) => {
    let c_sprint_id = req.body.c_sprint_id
    let result = await activeSprint.activeDataSprint(c_sprint_id)
    return res.status(result.status).json(result);
}

exports.postFinishSprintData = async (req, res, next) => {
    let c_sprint_id = req.body.c_sprint_id
    console.log({ASA:req.body});
    let result = await finishSprint.finishDataSprint(c_sprint_id)
    return res.status(result.status).json(result);
}
