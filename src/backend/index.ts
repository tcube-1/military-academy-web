import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv/config";
import { connectDb } from "./database/db";


const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "this response from server",
  });
});

app.get("/health", (req: Request, res: Response) => { 
  try {
    
  } catch (error) {
    
  }
})

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
