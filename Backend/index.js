import express from "express";
import "dotenv/config";

const app = express();
// db()


app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/api/todos", todoRoutes);
// app.use("/api/project", projectRoutes);

app.listen(process.env.PORT, () => {
  console.log("Sever started on port ", process.env.PORT);
})