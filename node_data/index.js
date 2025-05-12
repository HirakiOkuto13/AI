const express = require("express");
const mysql = require('mysql');
const app = express();
const port = 3001;
const axios = require('axios');



let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "water"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const adminAdpRoutes = require('./routes/adp');
app.use("/admin",adminAdpRoutes);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

// Define a route for the "create" operation
app.post('/adddata', (req, res) => {
    // Create a new record
    const High = req.body.High;
    const Low = req.body.Low;
    const Open = req.body.Open;
    const Close = req.body.Close;
    const Volume = req.body.Volume;
    const AdjClose = req.body.AdjClose;

    // Define the SQL statement
    const sql = 'INSERT INTO adp_data (High, Low, Open, Close, Volume, AdjClose) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the SQL statement
    con.query(sql, [High, Low, Open, Close, Volume, AdjClose], function(error, res, fields) {
        if (error) {
          console.error(error);
        } else {
          console.log(res);
        }
      });
  });
  

app.get("/recreatemodel", (req, res) => {

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/create_model',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/predict", (req, res) => {
    let arr_data = req.body;
    let arr_df = JSON.stringify({
        "High": arr_data.High,
        "Low": arr_data.Low,
        "Open": arr_data.Open,
        "Close": arr_data.Close,
        "Volume": arr_data.Volume
    })

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/predict',
        headers: {
            'Content-Type': 'application/json'
        },
        data: arr_df
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

})

app.get("/recreatemodel2", (req, res) => {

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/create_model2',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/predict2", (req, res) => {
    let arr_data = req.body;
    let arr_df = JSON.stringify({
        "ph": arr_data.ph,
        "Hardness": arr_data.Hardness,
        "Solids": arr_data.Solids,
        "Chloramines": arr_data.Chloramines,
        "Sulfate": arr_data.Sulfate,
        "Conductivity": arr_data.Conductivity,
        "Organic_carbon": arr_data.Organic_carbon,
        "Trihalomethanes": arr_data.Trihalomethanes,
        "Turbidity": arr_data.Turbidity,
    })

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/predict2',
        headers: {
            'Content-Type': 'application/json'
        },
        data: arr_df
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});