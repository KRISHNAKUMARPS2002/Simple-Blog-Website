import express from 'express';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files directory for serving CSS, JavaScript, etc.
const publicPath = join(__dirname, 'public');
app.use(express.static(publicPath));

// Serve Bootstrap CSS from node_modules
app.use('/node_modules/bootstrap/dist', express.static('node_modules/bootstrap/dist'));

// Temporary array to store blog posts (in a real application, use a database)
let posts = [];

// Route to render the index page with blog posts
app.get('/', (req, res) => {
  res.render('index.ejs', { posts });
});

// Route to handle form submission and create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  posts.push(newPost); // Add the new post to the posts array
  res.redirect('/'); // Redirect back to the homepage
});

// Route to render the navbar with posts data (optional)
app.get('/navbar', (req, res) => {
  res.render('partials/navbar.ejs', { posts });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
