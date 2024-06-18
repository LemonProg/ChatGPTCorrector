const correctBtn = document.querySelector('#correctBtn')
const query = document.querySelector('#query')
const apiField = document.querySelector('#apiField')

const modifyKey = document.querySelector('a')

let KeyNotOK = document.getElementById('KeyNotOK');
let KeyOK = document.getElementById('KeyOK');

const responseArea = document.querySelector('#response')

const key = localStorage.getItem("key");

if (key) {
    KeyOK.style.display = "block"
    KeyNotOK.style.display = "none"
} else {
    KeyOK.style.display = "none"
    KeyNotOK.style.display = "block"

    apiField.addEventListener('change', () => {
        if (apiField.value != "") {
            localStorage.setItem('key', apiField.value);
            location.reload()
        }
    })
}

const queryDiv = document.querySelector('#queryDiv')

correctBtn.addEventListener('click', () => {
    if (query.value != "") {
        queryDiv.style.display = "none"
        responseArea.style.display = "block"
        responseArea.textContent = "Chargement..."
        fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST",
            headers: {
                "Authorization": " Bearer " + key,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "model": "gpt-4",
                "max_tokens": 2000,
                "messages": [
                    {
                      "role": "system",
                      "content": "Tu es un correcteur de syntaxe et d'orthographe, tu reformule mes phrases de façon professionnel"
                    },
                    {
                      "role": "user",
                      "content": "Corrige et reformule sans explication: " + query.value
                    }
                  ],
            })
        })
        .then(response => response.json())
        .then(data => {
            responseArea.textContent = data.choices[0].message.content
        })
        .catch(err => console.error(err));
    } else {
        responseArea.textContent = "Remplire 'Phrase à corriger'"
    }
})

modifyKey.addEventListener('click', () => {
    localStorage.removeItem("key");
    location.reload()
})