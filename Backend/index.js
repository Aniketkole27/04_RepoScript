import express from "express";
import "dotenv/config";
import patientRoutes from './src/routes/patient.routes.js';
import doctorRoutes from './src/routes/doctor.routes.js';
import wardRoutes from './src/routes/ward.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import connectDB from './src/config/db.js';

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// Simple CORS allow-all
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/wards", wardRoutes);

app.listen(process.env.PORT, () => {
  console.log("Sever started on port ", process.env.PORT);
})