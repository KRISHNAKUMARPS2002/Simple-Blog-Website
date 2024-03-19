import express from 'express';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const publicPath = join(__dirname, 'public');
app.use(express.static(publicPath));

app.use('/node_modules/bootstrap/dist', express.static('node_modules/bootstrap/dist'));


app.get('/', (req, res) => {
    res.render('index.ejs');
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });