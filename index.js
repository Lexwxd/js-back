const express = require('express');
const http = require('http');
const cors = require('cors');
const apiAuthRouter = require('./controllers/api-auth.controller');
const apiTodoRouter = require('./controllers/api-todos.controller');
const apiUserRouter = require('./controllers/api-user.controller');
const apiCommentRouter = require('./controllers/api-comment.controller');
//const testRouter = require('./controllers/test.controller');
// const apiRouter = require('./controllers/api-todos.controller');
const { notFound, errorHandler, asyncHandler } = require('./middlewares/meddlewares');
const { initDB } = require('./dataBase');

//Init zone
const app = express();

//InitDB


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initDB();


app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);
  next();
});

app.use('/api/todos', apiTodoRouter);
app.use('/api/user', apiUserRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/comment', apiCommentRouter);
//app.use('/test', testRouter);

app.use(notFound);
app.use(errorHandler);

//Create server
http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
});