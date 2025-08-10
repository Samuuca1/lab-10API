document.getElementById('fetchBtn').addEventListener('click', getFetch);


//Part1
function getFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
            if (!res.ok) throw new Error('Fetch request failed');
            return res.json();
        })
        .then(data => {
            document.getElementById('output').innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        })
        .catch(err => {
            document.getElementById('output').innerHTML = `<p style="color:red;">${err}</p>`;
        });
}
