import express from 'express';
import route from './api/index';
//create server
const app = express();
//set por number
const port = 5000;
void app.get('/', (_req, res) => {
  res.send('Please move to /api/resize 👉');
});
//route for resize function
void app.use('/api', route);

void app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

void app.use((req, res) => {
  res.send('you looks lost ✋');
});
export default app;
