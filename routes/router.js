const express = require('express');
let router = express.Router();


// MIDDLEWARE
const tokenExtractor = require('../middleware/token-extractor')

/**
 * Controller
 */
const authController = require('../api/users/auth/authController')
const sprintController = require('../api/users/sprints/sprintsController')
const backlogsController = require('../api/users/backlogs/backlogsController')
const masterController = require('../api/users/master/masterController')
const retrospectiveController = require('../api/users/retrospective/retrospectiveController')

/**
 * Auth
 * Status : SUCCESS:
 */
router.post('/auth/login', authController.postLogin);
router.post('/auth/extract-token',authController.extractToken)
router.post('/auth/encrypter',authController.encrypter)
router.get('/auth/user/list', tokenExtractor.tokenExtractor, authController.getUserList)
router.post('/auth/user/add', tokenExtractor.tokenExtractor, authController.postAddUserList)
router.post('/auth/user/edit', tokenExtractor.tokenExtractor, authController.postEditUserList)
router.post('/auth/user/delete', tokenExtractor.tokenExtractor, authController.postDeleteUserList)


// Sprint
router.get('/sprints', tokenExtractor.tokenExtractor, sprintController.getSprintData)
router.post('/sprints', tokenExtractor.tokenExtractor, sprintController.postSprintData)
router.post('/sprints/delete', tokenExtractor.tokenExtractor, sprintController.postDeleteSprintData)
router.post('/sprints/edit', tokenExtractor.tokenExtractor, sprintController.postEditSprintData)
router.post('/sprints/activate-sprint', tokenExtractor.tokenExtractor, sprintController.postActiveSprintData)
router.post('/sprints/finish-sprint', tokenExtractor.tokenExtractor, sprintController.postFinishSprintData)

// Backlogs
router.get('/backlogs', tokenExtractor.tokenExtractor, backlogsController.getBacklogsData)
router.get('/backlogs/detail', tokenExtractor.tokenExtractor, backlogsController.getBacklogDetailData)
router.get('/backlogs/task', tokenExtractor.tokenExtractor, backlogsController.getBacklogTaskData)
router.post('/backlogs/add', tokenExtractor.tokenExtractor, backlogsController.postBacklogsAddData)
router.post('/backlogs/edit', tokenExtractor.tokenExtractor, backlogsController.postBacklogsEditData)
router.post('/backlogs/delete', tokenExtractor.tokenExtractor, backlogsController.postDeleteTaskData)
router.get('/backlogs/parent-child', tokenExtractor.tokenExtractor, backlogsController.getBacklogParentChild)

// Master
router.get('/master/data', tokenExtractor.tokenExtractor, masterController.getData)
router.get('/master/user', tokenExtractor.tokenExtractor, masterController.getUserInfo)

// Retrospective
router.get('/retro/data', tokenExtractor.tokenExtractor, retrospectiveController.getData)
router.post('/retro/add', tokenExtractor.tokenExtractor, retrospectiveController.postAddData)
router.post('/retro/edit', tokenExtractor.tokenExtractor, retrospectiveController.postEditData)
router.post('/retro/delete', tokenExtractor.tokenExtractor, retrospectiveController.postDeleteData)

module.exports = router;