document.getElementById('fetchBtn').addEventListener('click', getFetch);
document.getElementById('xhrBtn').addEventListener('click', getDataXHR);
document.getElementById('formPOST').addEventListener('submit', sendPost);
document.getElementById('formPUT').addEventListener('submit', updatePut);

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


//PART 3
function sendPost(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
        .then(res => {
            if (!res.ok) throw new Error('POST request failed');
            return res.json();
        })
        .then(data => {
            document.getElementById('response').innerHTML = `
                <p style="color:green;">POST successful!</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        })
        .catch(err => {
            document.getElementById('response').innerHTML = `<p style="color:red;">${err}</p>`;
        });
}


//Ppart 4
function updatePut(e) {
    e.preventDefault();
    const id = document.getElementById('putId').value;
    const title = document.getElementById('putTitle').value;
    const body = document.getElementById('putBody').value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('response').innerHTML = `
                <p style="color:green;">PUT successful!</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } else {
            document.getElementById('response').innerHTML = `<p style="color:red;">PUT request failed</p>`;
        }
    };

    xhr.onerror = function() {
        document.getElementById('response').innerHTML = `<p style="color:red;">Network Error</p>`;
    };

    xhr.send(JSON.stringify({ title, body }));
}