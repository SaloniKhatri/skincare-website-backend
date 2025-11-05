

const express = require('express');
const app = express();
const cors = require('cors');
//Environment variables must come before database connection
const dotenv = require('dotenv');
dotenv.config();
//Database connection
const connectToDb = require('./config/db');
connectToDb();


const cookieParser = require('cookie-parser')






// Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // tumhara frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('HIEEE GUYSSS!')
});

//Order route will come here
const orderRoutes = require('./routes/order.route');
app.use('/api/orders', orderRoutes);

//User route will come here
const userRoutes = require('./routes/user.route')
app.use('/api/users', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



module.exports = app; 