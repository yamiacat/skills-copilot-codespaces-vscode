// Create web server
// 1. Import express
// 2. Create an express application
// 3. Define a route for GET /comments
// 4. Define a route for POST /comments
// 5. Start the server on port 3000

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body;

  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing comments.json');
        return;
      }

      res.status(201).send('Comment added');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});