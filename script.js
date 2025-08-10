document.getElementById('fetchBtn').addEventListener('click', getFetch);
document.getElementById('xhrBtn').addEventListener('click', getDataXHR);

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


//Part2
function getDataXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('output').innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        } else {
            document.getElementById('output').innerHTML = `<p style="color:red;">XHR request failed</p>`;
        }
    };
    xhr.onerror = function() {
        document.getElementById('output').innerHTML = `<p style="color:red;">Network Error</p>`;
    };
    xhr.send();
}