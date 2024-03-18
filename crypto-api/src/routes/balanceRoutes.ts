// src/routes/index.ts
import express from 'express';
import { currencies, getBalances, updateBalance } from '../controllers/balanceController';

const router = express.Router();
router.get('/balances', getBalances);
router.post('/update-balance', updateBalance);
router.post('/currencies',currencies)

export default router;
