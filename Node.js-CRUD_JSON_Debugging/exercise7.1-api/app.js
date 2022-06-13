import axios from "axios";
import chalk from "chalk";
import https from "https";
import request from "request";
import fetch from "node-fetch";

const getDataByAxios = async () => {
    try {
        const { data } = await axios.get(
            "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=4658"
        );
        console.log(chalk.blue(data));
    } catch (err) {
        console.log(chalk.red.inverse(err));
    }
};

// await getDataByAxios();

const getDataByRequest = () => {
    const options = {
        url: "https://pokeapi.co/api/v2/pokemon/ditto",
        method: "GET",
    };
    request(options, function (err, res, body) {
        let json = JSON.parse(body);
        console.log(json);
        console.error("error:", err);
        console.log("statusCode:", res && res.statusCode);
        console.log("body:", body);
    });
};

// getDataByRequest();

const getDataByAnotherModule = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    const data = await response.json();
    console.log(data);
};

getDataByAnotherModule();
