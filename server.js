const express = require('express');
const app = express();

const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

app.use(express.static('./Develop/public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Now Listening to port ${PORT}`);
})