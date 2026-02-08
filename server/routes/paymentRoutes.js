import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import userAuth from '../middlewares/auth.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-order', userAuth, createOrder);
paymentRouter.post('/verify-payment', userAuth, verifyPayment);

export default paymentRouter;
