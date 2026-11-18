import express from "express";

const app = express();

app.get("/", (request, response) => {
    response.json({ status: "ok", message: "Backend server is running" });
});

export default app;
