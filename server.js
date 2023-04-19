const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const { ownRecipesRouter } = require("./routes/ownRecipesRoutes");
const { protectPath } = require('./middlewares/authMiddleware');
const { userRouter } = require('./routes/userRoutes');
const { recipesRouter } = require('./routes/recipesRoutes');
const { ingredientsRouter } = require('./routes/ingredientsRoutes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/user', userRouter);
app.use(protectPath);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
    data: 'Not found',
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log(`Connection to DB done!`);

    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })

  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
