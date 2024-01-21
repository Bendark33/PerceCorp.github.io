// La recuperation des elements 
const form = document.querySelector("#form");
const joueur1 = document.querySelector('#j1');
const joueur2 = document.querySelector('#j2');
const joueur3 = document.querySelector('#j3');
const joueur4 = document.querySelector('#j4');
const joueur5 = document.querySelector('#j5');
const joueur6 = document.querySelector('#j6');
const joueur7 = document.querySelector('#j7');
const joueur8 = document.querySelector('#j8');
const joueur9 = document.querySelector('#j9');
const joueur10 = document.querySelector('#j10');
const joueur11 = document.querySelector('#j11');


// Evenements
form.addEventListener('submit',e=>{
    e.preventDefault();
    team();
})

form.addEventListener('reset',e=>{
    e.preventDefault();
    let list_poste = ["BU","AD","AG","MOCD","MOCG","MDC","DD","DG","DCD","DCG","G"];
    let list_poste2 = ["j1","j2","j3","j4","j5","j6","j7","j8","j9","j10","j11"];
    reset(list_poste);
    reset(list_poste2);
})

// Fonstions
function team() {

    //Reset des champs
    let list_poste = ["BU","AD","AG","MOCD","MOCG","MDC","DD","DG","DCD","DCG","G"];

    reset(list_poste);

    // Obtenir toutes les valeurs des inputs
    const player1 = joueur1.value.trim();
    const player2 = joueur2.value.trim();
    const player3 = joueur3.value.trim();
    const player4 = joueur4.value.trim();
    const player5 = joueur5.value.trim();
    const player6 = joueur6.value.trim();
    const player7 = joueur7.value.trim();
    const player8 = joueur8.value.trim();
    const player9 = joueur9.value.trim();
    const player10 = joueur10.value.trim();
    const player11 = joueur11.value.trim();
    
const lista = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10,player11];

let list = removeItemOnce(lista,'');

let fusion = [];


let list_final = list_poste.slice(0,list.length);
const number = list_final.length;

for (let a = 0; a < number; a++) {
    const random = Math.floor(Math.random() * list_final.length);
    const random2 = Math.floor(Math.random() * list.length);
    const place = [list[random2],list_final[random]];
    list_final = removeItemOnce(list_final,list_final[random]);
    list = removeItemOnce(list,list[random2]);
    fusion.push(place);
  }
  console.log(fusion);

for (let b = 0; b < fusion.length; b++) {
let per = fusion[b];
let pers = per[0];
let place2 = per[1];
console.log(pers);
console.log(place2);
document.getElementById(place2).value = pers;
  }
}

function removeItemOnce(array, value) {
    let newArray = [];
 
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== value) {
            newArray.push(array[i]);
        }
    }
    return newArray;
  }

  function reset(array) {
  for (let r = 0; r < array.length; r++) {
    let perrr = array[r];
    document.getElementById(perrr).value = '';
      }
    }

function setError(elem,message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');

    // Ajout du message d'erreur
    small.innerText = message

    // Ajout de la classe error
    formControl.className = "form-control error";
}

function setSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className ='form-control success'
}

function email_verify(email) {
    /*
    * r_rona.22-t@gmail.com
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
}
function password_verify(passeword) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(passeword);
}