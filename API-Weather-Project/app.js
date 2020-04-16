const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 1111;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
    let query = req.body.cityName;
    const appid = "d8810d3076fb0a0f997136494b8dbc11";
    const units = "Metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=${units}`;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<p>The weather is currently ${desc}.</p>`);
            res.write(
                `<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`
            );
            res.write(`<img src=${imageURL}>`);
            res.send();
        });
    });
});

app.listen(port, () => {
    console.log(`This server started at port ${port}`);
});