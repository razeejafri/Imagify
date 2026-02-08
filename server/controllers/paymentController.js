import Razorpay from 'razorpay';
import crypto from 'crypto';
import transactionModel from '../models/transactionModel.js';
import userModel from '../models/userModel.js';

const plans = [
    {
        id: 'Basic',
        amount: 10,
        credits: 100,
        desc: 'Best for personal use.'
    },
    {
        id: 'Advanced',
        amount: 50,
        credits: 500,
        desc: 'Best for business use.'
    },
    {
        id: 'Business',
        amount: 250,
        credits: 5000,
        desc: 'Best for enterprise use.'
    },
]

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.userId;

        if (!planId || !userId) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const plan = plans.find(p => p.id === planId)

        if (!plan) {
            return res.json({ success: false, message: 'Plan not found' })
        }

        const { amount, credits } = plan;

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: process.env.CURRENCY,
            receipt: userId
        };

        const order = await razorpayInstance.orders.create(options);

        // Save transaction in database
        const transactionData = {
            userId,
            plan: planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            date: Date.now()
        };

        const newTransaction = new transactionModel(transactionData);
        await newTransaction.save();

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.userId;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.json({ success: false, message: 'Missing Payment Details' });
        }

        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.json({ success: false, message: 'Invalid Payment Signature' });
        }

        // Find transaction and update
        const transaction = await transactionModel.findOne({ razorpayOrderId: razorpay_order_id });

        if (!transaction) {
            return res.json({ success: false, message: 'Transaction not found' });
        }

        // Update transaction
        transaction.payment = true;
        transaction.razorpayPaymentId = razorpay_payment_id;
        transaction.razorpaySignature = razorpay_signature;
        await transaction.save();

        // Update user credits
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        user.creditBalance += transaction.credits;
        await user.save();

        res.json({
            success: true,
            message: 'Payment Verified Successfully',
            credits: user.creditBalance
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
