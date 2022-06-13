import https from "https";

// https
//     .get("https://pokeapi.co/api/v2/pokemon/ditto", (response) => {
//         let data = "";
//         response.on("data", (chunk) => {
//             data += chunk;
//         });

//         response.on("end", () => {
//             console.log(data);
//         });
//     })
//     .on("error", (error) => {
//         console.log(error);
//     });

const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const request = https.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data += chunk.toString();
    });

    response.on("end", () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on("error", (error) => {
    console.log("An error", error);
});
request.end();
