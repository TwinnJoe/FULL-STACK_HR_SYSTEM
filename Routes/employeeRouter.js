import express from 'express';
import {AllEmployeesCon,EmployeeCon,addEmployeeCon,deleteEmployeeCon,updateEmployeeCon} from '../controllers/employeeController.js';

const router = express.Router();


router.get('/', AllEmployeesCon);

router.get('/:employeeID', EmployeeCon);

router.post('/', addEmployeeCon);

router.delete('/:employeeID', deleteEmployeeCon);

router.patch('/:employeeID', updateEmployeeCon);

export default router;