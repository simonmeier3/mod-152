const express = require("express");
const sass = require('node-sass');
const fs = require("fs");
const less = require('less');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Aufgabe 1: SCSS
app.post('/api/css/scss', function (req, res) {
    fs.writeFileSync('response.scss', req.body.data.scss, () => {
    });
    sass.render({
        file: "response.scss"
    }, function (error, root) {
        if (!error) {
            res.json({
                data: {
                    css: root.css.toString()
                }
            });
        } else {
            res.status(400).send(error);
        }
    });
});

// Aufgabe 2: LESS
app.post('/api/css/less', function (req, res) {
    less.render(req.body.data.less, function (error, root) {
        if (!error) {
            res.json({
                data: {
                    css: root.css
                }
            });
        } else {
            res.status(400).send(error);
        }
    });
});

app.listen(process.env.PORT || 7000);