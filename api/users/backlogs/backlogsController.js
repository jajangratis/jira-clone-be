const backlogsData = require('./components/backlogsData')
const backlogTaskData = require('./components/backlogTaskData')
const backlogsAddTaskData = require('./components/backlogAddData')

exports.getBacklogsData = async (req, res, next) => {
    let result = await backlogsData.backlogsData()
    return res.status(result.status).json(result);
}

exports.getBacklogTaskData = async (req, res, next) => {
    const c_backlog_id = req.query.c_backlog_id
    let result = await backlogTaskData.backlogTaskData(c_backlog_id)
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