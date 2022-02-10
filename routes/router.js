const express = require('express');
let router = express.Router();


// MIDDLEWARE
const tokenExtractor = require('../middleware/token-extractor')

/**
 * Controller
 */
const authController = require('../api/users/auth/authController')
const sprintController = require('../api/users/sprints/sprintsController')

/**
 * Auth
 * Status : SUCCESS:
 */
router.post('/auth/login', authController.postLogin);
router.post('/auth/extract-token',authController.extractToken)
router.post('/auth/encrypter',authController.encrypter)

router.get('/sprints', tokenExtractor.tokenExtractor, sprintController.getSprintData)
router.post('/sprints', tokenExtractor.tokenExtractor, sprintController.postSprintData)
router.post('/sprints/delete', tokenExtractor.tokenExtractor, sprintController.postDeleteSprintData)
router.post('/sprints/edit', tokenExtractor.tokenExtractor, sprintController.postEditSprintData)
router.post('/sprints/activate-sprint', tokenExtractor.tokenExtractor, sprintController.postActiveSprintData)
router.post('/sprints/finish-sprint', tokenExtractor.tokenExtractor, sprintController.postFinishSprintData)

module.exports = router;