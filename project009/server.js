const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
projectData = {};

app.use(parser.urlencoded({
    extended: false
}));
app.use(parser.json());
app.use(cors());
app.use(express.static("website"));

const port = 8080;
const server = app.listen(port, listenin);

function listenin() {
    console.log("Server is now running")
    console.log(`Server is running on local host :- ${port}`)
};
// GET route
app.get('/weatherIn', (rq, rs) => {
    rs.send(projectData);
});

// POST route
app.post('/weatherOut', (rq, rs) => {
    let newDataEntry = {
        date: rq.body.date,
        temp: rq.body.temp,
        content: rq.body.content

    };
    projectData = newDataEntry;
    rs.send(projectData);
    console.log(projectData);
})
