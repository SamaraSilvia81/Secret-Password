const passInput = document.querySelector("#inputPasswordId")
const inputDelete = document.querySelector("#inputDelete")
const lenInput = document.querySelector("#inputLengthId");
const btnDeleteLocalStorage = document.querySelector("#btnDeleteLocalStorage");
const infoLength = document.querySelector('label[for="inputLengthId"]');
const btnCopy = document.querySelector("#btnCopy");
const localCopy = '';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%"];

const caracters = Array.from(Array(26)).map((_, i) => i + 97);
const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
const UppercaseCaracters = LowercaseCaracters.map((item) => item.toUpperCase());

const chkLower = document.querySelector("#chkLowerId");
const chkUpper = document.querySelector("#chkUpperId");
const chkNumber = document.querySelector("#chkNumberId");
const chkSymbols = document.querySelector("#chkSymbolsId");
const btnGerar = document.querySelector("#btnGerar");

class GeneratePassword {
    
    constructor() {
       this.passInput = document.querySelector("#inputPasswordId");
    }

    changeInput() {
        infoLength.innerHTML = lenInput.value;
        lenInput.addEventListener("change", () => {
            infoLength.innerHTML = lenInput.value;
            this.createPassword(
                chkNumber.checked,
                chkSymbols.checked,
                chkLower.checked,
                chkUpper.checked,
                lenInput.value
            );
        });
    }

    btnCreatePassword(){
        btnGerar.addEventListener("click", () => {
            this.updatePassword();
            this.createPassword(
                chkNumber.checked,
                chkSymbols.checked,
                chkLower.checked,
                chkUpper.checked,
                lenInput.value
            );
        });
    }

    btnDeleteLocalStorage(){
        btnDeleteLocalStorage.addEventListener("click", () => {
            localStorage.clear();
            window.location.reload();
        });
    }

    btnCopyPassword(){
        btnCopy.addEventListener("click", (e) => {
            if(e){
                this.copyPassword();
            }
        });
    }

    copyPassword(){
        navigator.clipboard.writeText(passInput.value);
        console.log("CopyPassword: ",passInput.value)
        alert('Texto copiado para área de transferência! Ctrl+V em algum local para colar');
    }

    reload(){

        // Função para exibir todos os dados
        const div = document.querySelector("#elementList");

        let values = JSON.stringify([...JSON.parse(localStorage.getItem('passwords'))]);
        let dict = JSON.parse(values)

        for(let secret in dict){
            if(dict[secret].value != undefined){
                div.appendChild(document.createTextNode('◾ '));
                div.appendChild(document.createTextNode(dict[secret].value));
                div.appendChild(document.createElement('br'));
            }
        }
    }

    listPassword(){

        // Função para pegar os dados salvos do localSotrage
        const div = document.querySelector("#elementList");

        let values = JSON.stringify([...JSON.parse(localStorage.getItem('passwords'))]);
        let dict = JSON.parse(values)

        //console.log(dict)
        //console.log(typeof dict)
        let lenght = dict.length

        if(dict[lenght-1].value != undefined){
            div.appendChild(document.createTextNode('◾ '));
            div.appendChild(document.createTextNode(dict[lenght-1].value));
            div.appendChild(document.createElement('br'));
        }
    }

    createPassword = (
        hasNumbers,
        hasSymbols,
        hasLowercase,
        hasUppercase,
        lenght
      ) => {

        const newArray = [
            ...(hasNumbers ? numbers : []),
            ...(hasSymbols ? symbols : []),
            ...(hasLowercase ? LowercaseCaracters : []),
            ...(hasUppercase ? UppercaseCaracters : []),
          ];
  
          if (newArray.length === 0) return;
      
        let password = '';

        for (let i = 0; i < lenght; i++) {
          const randomIndex = Math.floor(Math.random() * newArray.length);
          password += newArray[randomIndex];
        }

        let valuePassword = ''
        valuePassword = passInput.value = password;

        console.log(valuePassword)
  
        this.updatePassword();
        this.listPassword();
        this.saveLocalStorage(valuePassword);
    };

    saveLocalStorage(value){

        // Criando objeto com dados dos inputs
        const dataObj = { value };
        //console.log(dataObj);

        /* Todo valor do localstorage é null no inicio (antes de adicionarmos algum valor nele),
        Por isso checamos se é null, ou seja, se será o primeiro item a ser adicionado.
        */
        if (localStorage.getItem('passwords') === null) {
            // Adicionando um array com um objeto no localstorage
            localStorage.setItem('passwords', JSON.stringify([dataObj]));
        } else {
            // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
            localStorage.setItem(
            'passwords',
            // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
            JSON.stringify([
                ...JSON.parse(localStorage.getItem('passwords')),
                dataObj
            ])
        )};

        this.btnDeleteLocalStorage();
    }

    updatePassword(){

        let valueInputDelete = inputDelete.value
    
        if(valueInputDelete != ""){

            let separateString = valueInputDelete.split("")
            //console.log(separateString)

            for(let ele of separateString) {
                for(let sym of symbols) {
                    //console.log("ele" + ele)
                    //console.log("sym" + sym)
                    if(ele == sym){
                        symbols.splice(symbols.indexOf(sym),1)
                        console.log("newSymbols:" + symbols)
                    }
                }
                for(let num of numbers) {
                    //console.log("ele" + ele)
                    //console.log("sym" + num)
                        if(ele == num){
                            numbers.splice(numbers.indexOf(num),1)
                            console.log("newNumber:" + numbers)
                        }
                    }
                for(let charLower of LowercaseCaracters) {
                    //console.log("ele" + ele)
                    //console.log("char" + charLower)
                    if(ele == charLower){
                        LowercaseCaracters.splice(LowercaseCaracters.indexOf(charLower),1)
                        console.log("newCharLower:" + LowercaseCaracters)
                    }
                }
                for(let charUpper of UppercaseCaracters) {
                    //console.log("ele" + ele)
                    //console.log("char" + charUpper)
                    if(ele == charUpper){
                        UppercaseCaracters.splice(UppercaseCaracters.indexOf(charUpper),1)
                        console.log("newCharUpper:" + UppercaseCaracters)
                    }
                }
            }

            console.log("Password Updated!")
            //inputDelete.value = ""
        }
    }
}

const password = new GeneratePassword()

// A ordem das instâncias importam
password.saveLocalStorage();
password.changeInput();
password.listPassword();
password.btnCreatePassword();
password.btnCopyPassword();
password.btnDeleteLocalStorage();
password.reload();