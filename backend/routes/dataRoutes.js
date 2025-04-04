import express from 'express';
import {
	addData,
  addMultipleData,
	viewAllData,
	viewSummary,
  viewSummaryByMonth,
  viewSummaryByType,
  viewTotalByMonth,
  viewCategoryOfType,
	updateData,
  updateDataByParams,
  deleteDataById,
	deleteDataWithPass,
  deleteAllData
} from '../controllers/dataController.js';

const router = express.Router();

router.post('/add', addData);
router.post('/add/multiple', addMultipleData);
router.get('/view/all', viewAllData);
router.get('/view/summary', viewSummary);
router.get('/view/summary-month', viewSummaryByMonth);
router.get('/view/summary-type', viewSummaryByType);
router.get('/view/total-month', viewTotalByMonth);
router.get('/view/category-type', viewCategoryOfType);
router.put('/update', updateDataByParams);
router.put('/update/body', updateData);
router.delete('/delete', deleteDataById);
router.delete('/delete/withpass', deleteDataWithPass);
router.delete('/delete/all', deleteAllData);

export default router;
