const express = require('express');
const mongoose = require('mongoose');
const session = require('./config/session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userMiddleware = require('./middleware/auth');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session);
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Middleware user cho tất cả view
app.use(userMiddleware);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));
app.use('/', require('./routes/index'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
