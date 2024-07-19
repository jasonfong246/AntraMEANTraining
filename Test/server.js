const express = require('express');
const { JsonDB, Config } = require('node-json-db');

const app = express();
const port = 3000;

const db = new JsonDB(new Config('data/database.json', true, true, '/'));

app.use(express.json());
app.use(express.static('public'));

// Get all posts
app.get('/posts', (req, res) => {
    try {
        const posts = db.getData('/posts');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve posts' });
    }
});

// Submit a new post
app.post('/posts', (req, res) => {
    try {
        const { subreddit, content } = req.body;
        const posts = db.getData('/posts') || [];
        const newPost = { subreddit, content, id: posts.length + 1 };
        posts.push(newPost);
        db.push('/posts', posts, true);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit post' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});