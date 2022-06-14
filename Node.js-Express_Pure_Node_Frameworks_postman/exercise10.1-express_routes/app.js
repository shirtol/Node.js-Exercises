import express from "express";
import { addNumber, loadNumbers, updateNumber, deleteNumber } from "./utils.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get("/numbers", (req, res) => {
    const allNumbers = loadNumbers();
    res.json(allNumbers);
});

app.post("/numbers", (req, res) => {
    const { number, name } = req.body;
    addNumber(name, number);
    res.json(loadNumbers());
});

app.put("/numbers/:id", (req, res) => {
    const id = req.params.id;
    const { name, number } = req.body;
    updateNumber(id, name, number);
    res.json(loadNumbers());
});

app.delete("/numbers/:id", (req, res) => {
    const id = req.params.id;
    deleteNumber(id);
    res.json(loadNumbers());
});

app.listen(3000);
