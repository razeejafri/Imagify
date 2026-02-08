import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express()

app.use(express.json()) //middleware

app.use(cors({
  origin: "https://imagify-xlgw.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"]
}));

await connectDB()

/* ====== HEALTH CHECK (YAHAN) ====== */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.use('/api/payment', paymentRouter)
app.get('/', (req, res) => res.send("API working"))

app.listen(PORT, () => console.log("Server is running on port " + PORT))
