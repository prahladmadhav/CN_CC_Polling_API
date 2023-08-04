const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", require("./routes"));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server on the port: ${port}`);
        return;
    }
    console.log(`Server running on the port: ${port}`);
});