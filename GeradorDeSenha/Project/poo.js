class GeneratePassword {
    
    constructor() {
       this.passInput = document.querySelector("#inputPasswordId");
    }

    changeInput() {

        const lenInput = document.querySelector("#inputLengthId");
        const infoLength = document.querySelector('label[for="inputLengthId"]');

        const chkLower = document.querySelector("#chkLowerId");
        const chkUpper = document.querySelector("#chkUpperId");
        const chkNumber = document.querySelector("#chkNumberId");
        const chkSymbols = document.querySelector("#chkSymbolsId");

        infoLength.innerHTML = lenInput.value;

        lenInput.addEventListener("change", () => {
            infoLength.innerHTML = lenInput.value;
            this.generatePassword(
                chkNumber.checked,
                chkSymbols.checked,
                chkLower.checked,
                chkUpper.checked,
                lenInput.value
            );
        });
    }

    /*selectSymbols(){

        const chkSymbols = document.querySelector("#chkSymbolsId");
        const divSymbols = document.querySelector("#selectSymbols");

        const symbols = ["!", "@", "#", "$", "%"];
        const selectSymbols = [];

        const listSymbols = document.createElement('li');
        listSymbols.className = "btnSymbols";

        for(let i = 0; i < listSymbols.length; i++){

            const span = document.createElement('span');
            span.appendChild(symbols[i]);
            listSymbols[i].appendChild(span);

            /*for(let sym of symbols){
                const elementSymbols = document.createTextNode(sym);
                console.log(sym)

                divSymbols.appendChild(listSymbols);
                listSymbols.appendChild(elementSymbols);

                elementSymbols.addEventListener("click", () => {
                    for(let sym of symbols){
                        console.log(sym[i])
                    }
                });
            }
        }

        chkSymbols.addEventListener('click', (e) => {
            divSymbols.style.color = 'red'
            console.log(e)
        });
    }*/

    btnCreatePassword(){

        const chkLower = document.querySelector("#chkLowerId");
        const chkUpper = document.querySelector("#chkUpperId");
        const chkNumber = document.querySelector("#chkNumberId");
        const chkSymbols = document.querySelector("#chkSymbolsId");

        btnGerar.addEventListener("click", () => {
            const lenInput = document.querySelector("#inputLengthId");
            this.generatePassword(
                chkNumber.checked,
                chkSymbols.checked,
                chkLower.checked,
                chkUpper.checked,
                lenInput.value
            );
        });
    }

    generatePassword = (
        hasNumbers,
        hasSymbols,
        hasLowercase,
        hasUppercase,
        lenght
      ) => {

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const symbols = ["!", "@", "#", "$", "%"];

        const passInput = document.querySelector("#inputPasswordId")
        const selectSymbols = document.querySelector("#selectSymbols").value

        const caracters = Array.from(Array(26)).map((_, i) => i + 97);
        const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
        const UppercaseCaracters = LowercaseCaracters.map((item) => item.toUpperCase());

        let separateString = selectSymbols.split("")
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

        /* 
        
        if(selectSymbols == symbols.map((item) => 
        { symbols.slice(symbols.indexOf(item))})){
            console.log(symbols);
        }
        if(selectSymbols == symbols.map((item)=>{})){
            symbols.slice(symbols.indexOf(item))
            console.log("novo:" + symbols)
        }
        */

        const newArray = [
          ...(hasNumbers ? numbers : []),
          ...(hasSymbols ? symbols : []),
          ...(hasLowercase ? LowercaseCaracters : []),
          ...(hasUppercase ? UppercaseCaracters : []),
        ];
      

        if (newArray.length === 0) return;
      
        let password = "";
      
        for (let i = 0; i < lenght; i++) {
          const randomIndex = Math.floor(Math.random() * newArray.length);
          console.log(randomIndex)
          password += newArray[randomIndex];
        }
      
        passInput.value = password;
      };
}

const password = new GeneratePassword()

password.changeInput();
password.btnCreatePassword();
password.generatePassword();

//console.log(password.changeInput);
//console.log(password.btnCreatePassword);
//console.log(password.generatePassword);