const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv'); 
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');

// NEW ROUTES - Add these
const fileRouter = require('./routes/files.routes');
const folderRouter = require('./routes/folders.routes');

dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Existing routes
app.use('/', indexRouter);
app.use('/users', userRouter);

// NEW ROUTES - Add these
app.use('/api/files', fileRouter);
app.use('/api/folders', folderRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});









