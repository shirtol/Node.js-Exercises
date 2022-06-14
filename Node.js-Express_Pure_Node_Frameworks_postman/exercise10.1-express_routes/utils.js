import fs from "fs";
import uniqid from "uniqid";

export const loadNumbers = () => {
    try {
        const dataBuffer = fs.readFileSync("numbers.json");
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        console.log("success using get");
        return data;
    } catch (e) {
        console.log("fail using get");
        return [];
    }
};

const saveNumbers = (numbers) => {
    const dataJSON = JSON.stringify(numbers);
    fs.writeFileSync("numbers.json", dataJSON);
};

export const addNumber = (name, number) => {
    const numbers = loadNumbers();
    const duplicateNumber = numbers.find(
        (currNumber) => currNumber.name === name
    );

    if (!duplicateNumber) {
        numbers.push({
            name,
            number,
            id: uniqid(),
        });
        saveNumbers(numbers);
        console.log("success using add");
    } else {
        console.log("fail using add");
    }
};

export const updateNumber = (id, name, number) => {
    const numbers = loadNumbers();
    const numberIdx = numbers.findIndex((number) => number.id === id);
    if (numberIdx !== -1) {
        const updatedNumber = { ...numbers[numberIdx], name, number };
        numbers[numberIdx] = updatedNumber;
        saveNumbers(numbers);
        console.log("success using put");
    } else {
        console.log("fail using put");
    }
};

export const deleteNumber = (id) => {
    const numbers = loadNumbers();
    const filteredNumbers = numbers.filter((number) => number.id !== id);
    if (numbers.length !== filteredNumbers.length) {
        saveNumbers(filteredNumbers);
        console.log("success using delete");
    } else {
        console.log("fail using delete");
    }
};
