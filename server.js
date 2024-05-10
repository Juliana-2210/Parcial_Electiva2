
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.set("views", "./views");

app.set("view engine", "ejs");

app.set("PORT", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views","templates", "index.ejs"));
});

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);
