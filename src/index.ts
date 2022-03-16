import express from 'express';

const app = express();
const port = 5020;
app.get('/', (req,res) => {
  console.log('Server Started ');
    res.send("hello world 👀");
});

app.get('/popk', (req,res) => {
  const filename ='./assets'+ req.url+'.jpg';
  console.log(req.url+ 'visited ');
    //res.send("hello world 👀 " + req.url + " "+ filename);
    res.sendFile(filename);
});

app.listen(port, () => console.log('app started to listen on port ' + port));

