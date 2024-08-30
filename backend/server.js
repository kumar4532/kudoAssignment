import e, { urlencoded } from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.routes.js"
import profileRouter from "./routers/profile.routes.js"

dotenv.config({
    path: "./.env"
})

const app = e();
const PORT = process.env.PORT || 8000;

app.use(e.json());
app.use(cookieParser());
app.use(e.urlencoded({extended:true}))

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

app.use(e.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB CONNECTION FAILED", err);
})