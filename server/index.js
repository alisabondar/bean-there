const express = require("express");

const app = express();

app.get('/', (req, res) => res.send('bean-there'));

app.listen(5001, () => console.log('server connected on port', 5001));