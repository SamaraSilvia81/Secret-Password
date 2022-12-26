// variables

const passInput = document.querySelector("#inputPasswordId");
const lenInput = document.querySelector("#inputLengthId");
const infoLength = document.querySelector('label[for="inputLengthId"]');
const btnGerar = document.querySelector("#btnGerar");

const chkLower = document.querySelector("#chkLowerId");
const chkUpper = document.querySelector("#chkUpperId");
const chkNumber = document.querySelector("#chkNumberId");
const chkSymbols = document.querySelector("#chkSymbolsId");


class GerarSenha { // Minha classe base
    
    append (value) {

        const new_node = new Node(value);

        current_node = this.head;
    
        if(!current_node){
            this.head = new_node;
            return new_node;
        }

        while (current_node.next){  // percorrer toda a estrutura, condição sempre verdadeira.
            current_node = current_node.next;
        }  

        current_node.next = new_node;
        return new_node;
    }

}

// Test

let myPassword = new GerarSenha();
