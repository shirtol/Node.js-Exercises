export const numbers = [1, 2, 3, 4, 5, 6];

export const addNumber = (number) => {
    const numberIdx = numbers.indexOf(number);
    if (numberIdx !== -1) {
        throw Error("This number is already exist");
    }
    numbers.push(number);
    return numbers;
};

export const deleteNumber = (number) => {
    const filteredNumbers = numbers.filter(
        (currNum) => currNum !== parseInt(number)
    );
    console.log(filteredNumbers);
    if (filteredNumbers.length === numbers.length) {
        throw Error("This number doesn't exist");
    }
    return filteredNumbers;
};

export const updateNumber = (oldNum, newNum) => {
    console.log(typeof oldNum, typeof newNum);
    const numberIdx = numbers.findIndex(
        (currNum) => currNum === parseInt(oldNum)
    );
    if (numberIdx === -1) {
        throw Error("This number doesn't exist");
    }
    return numbers.map((currNum) => {
        if (currNum === parseInt(oldNum)) return parseInt(newNum);
        else {
            return currNum;
        }
    });
};
