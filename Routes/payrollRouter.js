import express from 'express';
import {AllPayrollCon,PayrollCon,addPayrollCon,deletePayrollCon,updatePayrollCon} from '../controllers/payrollController.js';

const router = express.Router();


router.get('/', AllPayrollCon);

router.get('/:payroll_ID', PayrollCon);

router.post('/', addPayrollCon);

router.delete('/:payroll_ID', deletePayrollCon);

router.patch('/:payroll_ID', updatePayrollCon);

export default router;