import express from 'express';
import {
	addData,
  addMultipleData,
	viewAllData,
	viewSummary,
  viewSummaryByMonth,
  viewSummaryByType,
  viewSummaryByTypeAndCategory,
  viewTotalByMonth,
	editData,
	deleteData,
  deleteAllData
} from '../controllers/dataController.js';

const router = express.Router();

router.post('/add', addData);
router.post('/add-multiple', addMultipleData);
router.get('/view/all', viewAllData);
router.get('/view/summary', viewSummary);
router.get('/view/summary-month', viewSummaryByMonth);
router.get('/view/summary-type', viewSummaryByType);
router.get('/view/summary-type-category', viewSummaryByTypeAndCategory);
router.get('/view/total-month', viewTotalByMonth);
router.put('/edit', editData);
router.delete('/delete', deleteData);
router.delete('/delete-all', deleteAllData);

export default router;
