import * as fs from "fs";
import uniqid from "uniqid";
import chalk from "chalk";

const createFile = () => {
    const starterUser = [
        {
            id: uniqid(),
            name: "example",
            email: "example@gmail.com",
        },
    ];
    const starterUserJSON = JSON.stringify(starterUser);
    fs.writeFile("users.json", starterUserJSON, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync("users.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveUsers = (users) => {
    const dataJSON = JSON.stringify(users);
    fs.writeFile("users.json", dataJSON, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

const createUser = (id, name, email) => {
    const users = loadUsers();
    const duplicateUser = users.find((user) => user.id === id);

    if (!duplicateUser) {
        users.push({
            id: id,
            name: name,
            email: email,
        });
        saveUsers(users);
        console.log(chalk.green.inverse("New user added!"));
    } else {
        console.log(chalk.red.inverse("The user already exist!"));
    }
};

const readUser = (id) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === id);

    if (user) {
        console.log(
            chalk.inverse(
                `the user name is: ${user.name} and his email is ${user.email}`
            )
        );
    } else console.log(chalk.red.inverse("User not found!"));
};

const updateUser = (newUserObj) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === newUserObj.id);
    if (user) {
        const newUsersArr = users.map((currUser) => {
            if (currUser.id === user.id) {
                return newUserObj;
            } else {
                return currUser;
            }
        });
        saveUsers(newUsersArr);
    } else console.log(chalk.red.inverse("User not found!"));
};

const deleteUser = (id) => {
    const users = loadUsers();
    const usersToKeep = users.filter((user) => user.id !== id);

    if (users.length > usersToKeep.length) {
        console.log(chalk.green.inverse("User removed!"));
        saveUsers(usersToKeep);
    } else {
        console.log(chalk.red.inverse("User not found!"));
    }
};
// createFile();
// createUser(uniqid(), "shir", "hhh@gmail.com");
// readUser("ojj7f0l4cq0m20");
// readUser("ojj63chx647");
// updateUser({
//     id: "ojj7f0l4cq0m20",
//     name: "example10",
//     email: "example@gmail.com",
// });

// deleteUser("ojj7f0l4cq0m20");
