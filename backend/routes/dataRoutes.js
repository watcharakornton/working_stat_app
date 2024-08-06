import express from 'express';
import {
	addData,
	viewAllData,
	viewSummary,
  viewDataByCategory,
	editData,
	deleteData
} from '../controllers/dataController.js';

const router = express.Router();

router.post('/add', addData);
router.get('/view/all', viewAllData);
router.get('/view/summary', viewSummary);
router.get('/view/summary-category', viewDataByCategory);
router.put('/edit', editData);
router.delete('/delete', deleteData);

export default router;
