const backlogsData = require('./components/backlogsData')
const backlogTaskData = require('./components/backlogTaskData')
const backlogsAddTaskData = require('./components/backlogAddData')
const backlogEditTaskData = require('./components/backlogEditData')
const backlogDeleteTaskData = require('./components/backlogDeleteData')
const backlogDetailData = require('./components/backlogsDetailData')
const backlogParentChild = require('./components/backlogParentChild')

exports.getBacklogsData = async (req, res, next) => {
    let result = await backlogsData.backlogsData()
    return res.status(result.status).json(result);
}

exports.getBacklogTaskData = async (req, res, next) => {
    const c_backlog_id = req.query.c_backlog_id
    let result = await backlogTaskData.backlogTaskData(c_backlog_id)
    return res.status(result.status).json(result);
}

exports.getBacklogParentChild = async (req, res, next) => {
    const c_backlog_id = req.query.c_backlog_id
    let result = await backlogParentChild.backlogsParentChild(c_backlog_id)
    return res.status(result.status).json(result);
}

exports.getBacklogDetailData = async (req, res, next) => {
    const c_backlog_id = req.query.c_backlog_id
    let result = await backlogDetailData.backlogsData(c_backlog_id)
    return res.status(result.status).json(result);
}

exports.postBacklogsAddData = async (req, res, next) => {
    const {
        c_backlog_id_parent,
        v_title,
        v_description,
        c_assignee,
        v_story_point,
        v_priority,
        c_progress_id,
        c_sprint_id,
    } = req.body
    let result = await backlogsAddTaskData.backlogTaskAddData({
        c_backlog_id_parent,
        v_title,
        v_description,
        c_assignee,
        v_story_point,
        v_priority,
        c_progress_id,
        c_sprint_id,
    })
    return res.status(result.status).json(result);
}

exports.postBacklogsEditData = async (req, res, next) => {
    const {
        c_backlog_id,
        c_backlog_id_parent,
        v_title,
        v_description,
        c_assignee,
        v_story_point,
        v_priority,
        c_progress_id,
        c_sprint_id,
    } = req.body
    let result = await backlogEditTaskData.backlogTaskEditData({
        c_backlog_id,
        c_backlog_id_parent,
        v_title,
        v_description,
        c_assignee,
        v_story_point,
        v_priority,
        c_progress_id,
        c_sprint_id,
    })
    return res.status(result.status).json(result);
}

exports.postDeleteTaskData = async (req, res, next) => {
    const c_backlog_id = req.body.c_backlog_id
    let result = await backlogDeleteTaskData.backlogTaskDeleteData({c_backlog_id})
    return res.status(result.status).json(result);
}