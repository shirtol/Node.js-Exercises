import express from "express";
import { addNumber, deleteNumber, numbers, updateNumber } from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/numbers", (req, res) => {
    res.status(200).send(numbers);
});

app.post("/numbers", (req, res) => {
    try {
        const newNumbersArr = addNumber(parseInt(req.body));
        res.status(200).send(newNumbersArr);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.delete("/numbers/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newArray = deleteNumber(id);
        res.status(200).send(newArray);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.put("/numbers/:id", (req, res) => {
    try {
        const numberToRemove = req.params.id;
        const newNumber = req.body;
        const newArr = updateNumber(numberToRemove, newNumber);
        res.status(200).send(newArr);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
