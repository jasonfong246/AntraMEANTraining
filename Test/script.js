document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('submit-post-form');
    const postsContainer = document.getElementById('posts-container');

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const subreddit = document.getElementById('subreddit').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subreddit, content })
        });

        if (response.ok) {
            postForm.reset();
            loadPosts();
        } else {
            alert('Failed to submit post');
        }
    });

    async function loadPosts() {
        const response = await fetch('/posts');
        const posts = await response.json();

        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h3>Subreddit: ${post.subreddit}</h3>
                <div class="content">${post.content}</div>
            </div>
        `).join('');
    }

    loadPosts();
});