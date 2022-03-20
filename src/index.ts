import express from 'express';
import route from './api/index';
//create server
const app = express();
//set por number
const port = 5000;
app.get('/', (_req, res) => {
  res.send('Please move to /api/resize 👉');
});
//route for resize function
app.use('/api', route);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use((req, res) => {
  res.send('you looks lost ✋');
});
export default app;
