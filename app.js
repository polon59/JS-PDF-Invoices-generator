const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;




app.listen(port, () => {console.log(`listening on port ${port}`)});