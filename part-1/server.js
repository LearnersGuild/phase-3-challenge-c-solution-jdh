const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'hello worrrrld!'});
})

app.use('/api', router);

app.listen(port);
console.log(`Server listening on port ${port}`);
