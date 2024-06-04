import express from 'express'
import { getAllCategory, getChartInfo, getItem, getPagination, getStataForMonth } from '../controllers/dataController.js';

const router = express.Router();
router.route('/getpage').get(getPagination);
router.route('/category').get(getAllCategory);
router.route('/stata').post(getStataForMonth);
router.route('/getitem').get(getItem);
router.route('/getchart').post(getChartInfo);


export default router;