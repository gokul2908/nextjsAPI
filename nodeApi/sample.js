// const request = require("request");

// var options = {
//     method: "POST",
//     url: "https://22446951fbe5cea9.api-us.cometchat.io/v3/apikeys",
//     headers: {
//         apiKey: "4b61dcb34ec849bd873e449b142ce8fc47895490",
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
//     body: {
//         name: "sample_api_key_1",
//         scope: "authOnly",
//     },
//     json: true,
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });
// // response = requests.request("POST", url, (headers = headers), (data = payload));

// // print(response.text);

// // console.log(payload);
// let gokul = [
//     [2, 3],
//     [1, 3],
//     [5, 4],
//     [6, 4],
// ];

// const map_gokul = new Map();
// gokul.forEach(for_each);

// function for_each([winner, looser]) {
//     map_gokul.set(
//         looser,
//         map_gokul.has(looser) ? map_gokul.get(looser) + 1 : 1
//     );

//     if (!map_gokul.has(winner)) {
//         map_gokul.set(winner, 0);
//     }
// }
// const not_lost = [],
//     one_lost = [];
// for (const [key, val] of map_gokul) {
//     if (val == 0) not_lost.push(key);
//     else if (val == 1) one_lost.push(key);
// }

// console.log(not_lost.sort(), one_lost.sort());
// var RandomizedSet = function (name) {
//     this.gokul = name;
// };

// RandomizedSet.prototype.call = () => console.log("randomizedset call");

// const obj = new RandomizedSet("gokul");
// console.log(obj);
// obj.call()

// import connection from "../library/mysql";

// connection.query("SELECT *", function (error, results, fields) {
//     if (error) throw error;
//     // connected!
// });

const request = require("request");

var options = {
    method: "POST",
    url: "http://localhost:3000/api/hello",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        lastName: "m",
        firstName: "gokul",
        DOB: 16666454,
        password: "gokul",
        email: "gokulkumar2908@gmail.com",
    },
    json: true,
};
let email;
(async function () {
    for (let i = 158; i < 1580; i++) {
        email = `gokul${i}@gmail.com`;
        options.body.email = email;
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
        await sleep(100);
    }
})();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
// });
// response = request.request("POST", url, (headers = headers), (data = payload));
