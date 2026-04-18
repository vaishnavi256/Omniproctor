const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/activeTests', testController.getActiveTests);
router.get('/:id', testController.getTestById);
router.post('/', testController.addTest);
router.post('/addTest', authenticateToken, testController.addTest);
router.get('/activeTestsCnt', testController.getActiveTestCount);
router.get("/active/:adminId", testController.getActiveTestsByAdmin);
router.get("/:testId/users", testController.getUsersByTestId);

module.exports = router;

