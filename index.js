const express = require('express');
const router = require('./routes/routes')
const businessRoutes = require('./routes/business_routes')
const paymentRoutes = require('./routes/payment_routes');
const serviceRoutes = require('./routes/service_routes')
const bookingRoutes = require('./routes/booking_router');
const staffRoutes = require('./routes/staff_routes');
const userRoutes = require('./routes/user_routes');

const cors = require('cors');
const connectToDB = require('./config/config');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use('/', router);

connectToDB();

app.use("/api" , userRoutes);
app.use("/api", businessRoutes);
app.use("/api", staffRoutes);
app.use('/api', paymentRoutes);
app.use('/api', serviceRoutes);
app.use('/api', bookingRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${3000}`);
})

