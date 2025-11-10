const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');

const swaggerOption = require('./swagger/handler');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require('dotenv').config();

const app = express();

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const specs = swaggerJsDoc(swaggerOption);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use("/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs,{ explorer: true })
);

const userRouter = require('./db/routes/user');
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Express server is running' });
});

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`); 
});