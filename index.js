const fs = require("fs");

fs.readFile("data.json", { encoding: "utf8" }, (err, data) => {
    if (!err) {
        console.log(data);
        const univs = JSON.parse(data);
        univs.forEach((element) => {
            console.log(element);
        });
    } else {
        console.log(`Ohh, alga ha salido mal ${err}`);
    }
});

const products = [
    {
        "code": "908fgt6",
        "description": "Fab 500 gramos",
        "stock": 70,
        "value": 3890,
        "sotck-min": 2
    },
    {
        "code": "768gy57",
        "description": "Panela de caña",
        "stock": 879,
        "value": 1568,
        "sotck-min": 80
    },
 
];

fs.writeFile("data.json", JSON.stringify(products), (data, err) => {
    if (!err) {
        console.log("DONE " + data);
    } else {
        console.log(`Ohh, algo ha pasado ${err}`);
    }
});
