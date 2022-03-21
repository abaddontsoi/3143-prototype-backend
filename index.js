const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./router/handler.js');
const menuHandler = require('./router/menuHandler.js');

const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', routesHandler);
app.use('/menu', menuHandler);

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
