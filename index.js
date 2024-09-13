const express = require('express');
const router = require('./routes/routes')
const businessRoutes = require('./routes/business_routes')
const cors = require('cors');
const connectToDB = require('./config/config');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/', router);

connectToDB();

app.use("/business", businessRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${3000}`);
})

