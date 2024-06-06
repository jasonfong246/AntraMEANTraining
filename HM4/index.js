document.addEventListener('DOMContentLoaded', function () {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            const ul = document.getElementById('myUL');
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.title;
                if (todo.completed) {
                    li.classList.add('checked');
                }
                li.addEventListener('click', function () {
                    li.classList.toggle('checked');
                });
                ul.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching to-dos:', error));
});