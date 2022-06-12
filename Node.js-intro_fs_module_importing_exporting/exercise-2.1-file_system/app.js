const fs = require("fs");

//? 1:
fs.writeFile("exercise2part1.txt", "Exercise 2.1: file system", (err) => {
    if (err) {
        console.log(err);
    }
});

//? 2:
fs.copyFile("exercise2part1.txt", "exercise2part1-Copy.txt", (err) => {
    if (err) {
        console.log(err);
    }
});

//? 3:
fs.rename("exercise2part1.txt", "NewName.txt", (err) => {
    if (err) {
        console.log(err);
    }
});

//? 4:
fs.readdir("./", (err, files) => {
    files.forEach((file) => console.log(file));
    if (err) {
        throw err;
    }
});

console.log(fs.readdirSync(__dirname));

//? 5:
fs.writeFile("toDelete.txt", "To Delete!", (err) => {
    if (err) {
        console.log(err);
    }
});
fs.unlink(
    "toDelete.txt",
    () => console.log("Deletion Complete!"),
    (err) => {
        if (err) {
            console.log(err);
        }
    }
);
