import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/countries', (req, res) => {
  res.json({ message: 'countries data should go here' });
});

app.get('/universities', (req, res) => {
  res.json({ message: 'universities data should go here' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
