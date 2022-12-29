// Modificando Textos
let text = document.getElementById('demo')
let button = document.getElementById('btnClick')

if(button){
    button.addEventListener('click', (e) => {
        text.style.color = 'red'
        text.innerText = 'Texto mudado'
        console.log(e)
    });
}

// Contador

let number = document.getElementById('value')
let push = document.getElementById('btnPush')
let currentValue = 0

push.onclick = () => {
    currentValue = currentValue += 1
    number.innerText = currentValue;
    console.log(currentValue);
}


/* 
Sem arrow Function

button.addEventListener('click', getClick);
function getClick() {}

console.log(e.button)
console.log(e.button.getAttribute('id'))
console.log(e.button.previousElementSibling('id'))
e.target.previousElementSibling.innerText = "Troquei"
*/