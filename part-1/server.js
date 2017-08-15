const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get('/shout/:word', (req, res) => {
  const { word } = req.params;
  res.set('Content-Type', 'application/text').send(`${word.toUpperCase()}!!!`);
});

apiRouter.post('/array/merge', (req, res) => {
  const { a, b } = req.body;
  if (!(a instanceof Array && b instanceof Array)) {
    res
      .status(400)
      .json({ error: 'Both keys in request body must be of type Array.' });
  }
  res.json({ result: merge(a, b) });
});

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


const merge = (a, b) => {
  let i = 0;
  let j = 0;
  let result = [];
  while (i < a.length && j < b.length) {
    result.push(a[i]);
    result.push(b[j]);
    i += 1;
    j += 1;
  }
  result = result.concat(a.slice(i)).concat(b.slice(j));
  return result;
};
