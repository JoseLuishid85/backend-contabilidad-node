const express = require('express');
const cors = require('cors');
require('dotenv').config({ quiet: true });
const sequelize = require('./config/database');
//const setupAssociations = require('./models/associations');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//setupAssociations();

// Database Sync
sequelize.sync({ alter: false })
    .then(() => console.log('Database connected and synchronized.'))
    .catch(err => console.error('Error synchronizing DB:', err));

// Routes
app.use('/accounting2/api/login', require('./routes/authRouter.js'));
app.use('/accounting2/api/users', require('./routes/userRouter.js'));
//app.use('/accounting/api/suppliers', require('./routes/supplierRouter.js'));
//app.use('/accounting/api/purchases', require('./routes/purchaseRouter.js'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});