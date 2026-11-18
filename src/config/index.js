import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./database.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (err) => {
            console.error("Server error:", err);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server listening on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exitCode = 1;
    }
};

startServer();
