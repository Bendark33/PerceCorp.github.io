// La recuperation des elements 
const form = document.querySelector('#form');
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
const role1 = document.querySelector('#role-select1');
const role2 = document.querySelector('#role-select2');
const role3 = document.querySelector('#role-select3');
const role4 = document.querySelector('#role-select4');
const role5 = document.querySelector('#role-select5');
const role6 = document.querySelector('#role-select6');
const role7 = document.querySelector('#role-select7');
const role8 = document.querySelector('#role-select8');
const role9 = document.querySelector('#role-select9');
const role10 = document.querySelector('#role-select10');
const role11 = document.querySelector('#role-select11');

// Evenements
form.addEventListener('submit',e=>{
    e.preventDefault();
    team();
})

form.addEventListener('reset',e=>{
    e.preventDefault();
    let list_poste4 = ['BU','AD','AG','MOCD','MOCG','MDC','DD','DG','DCD','DCG','G'];
    let list_poste2 = ['j1','j2','j3','j4','j5','j6','j7','j8','j9','j10','j11'];
    reset(list_poste4);
    reset(list_poste2);
    const player11 = joueur11.value.trim();
    setReset(joueur11);
})

// Fonstions
function team() {

    //Reset des champs
    let listPoste = ['BU','AD','AG','MOCD','MOCG','MDC','DD','DG','DCD','DCG','G'];

    reset(listPoste);
    setReset(joueur11);


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
    const ro1 = role1.value;
    const ro2 = role2.value;
    const ro3 = role3.value;
    const ro4 = role4.value;
    const ro5 = role5.value;
    const ro6 = role6.value;
    const ro7 = role7.value;
    const ro8 = role8.value;
    const ro9 = role9.value;
    const ro10 = role10.value;
    const ro11 = role11.value;
    
let listPlayeurBrut = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10,player11];
let listRoleBrut = [ro1,ro2,ro3,ro4,ro5,ro6,ro7,ro8,ro9,ro10,ro11];
let listRoleNet = removeItemOnce(listRoleBrut,'');
console.log(listRoleNet);

let fusion = [];
for (let aa = 0; aa < listRoleBrut.length; aa++) {
    if (listRoleBrut[aa] != ''){
    const placerole = [listPlayeurBrut[aa],listRoleBrut[aa]];
    console.log(placerole);
    listPoste = removeItemOnce(listPoste,listRoleBrut[aa]);
    //listPlayeurBrut = removeItemOnce(listPlayeurBrut,listPlayeurBrut[aa]);
    fusion.push(placerole);
    }
  }

  for (let b = 0; b < fusion.length; b++) {
    let per = fusion[b];
    let pers = per[0];
    listPlayeurBrut = removeItemOnce(listPlayeurBrut,pers);
      }

  let listPlayeurNet = removeItemOnce(listPlayeurBrut,'');
  let listFinal = listPoste.slice(0,listPlayeurNet.length);
const number = listFinal.length;

statut = doublon(listPlayeurNet,listRoleNet);
console.log(statut);

for (let a = 0; a < number; a++) {
    const random = Math.floor(Math.random() * listFinal.length);
    const random2 = Math.floor(Math.random() * listPlayeurNet.length);
    const place = [listPlayeurNet[random2],listFinal[random]];
    listFinal = removeItemOnce(listFinal,listFinal[random]);
    listPlayeurNet = removeItemOnce(listPlayeurNet,listPlayeurNet[random2]);
    fusion.push(place);
  }

if (statut == "ok"){  
for (let b = 0; b < fusion.length; b++) {
let per = fusion[b];
let pers = per[0];
let place2 = per[1];
document.getElementById(place2).value = pers;
  }
}
}

function removeItemOnce(array, value) {
    let newArray = [];
 
    for (let i = 0; i < array.length; i++) {
        if (array[i] != value) {
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

function doublon(array,array2){

    var unique = array.filter((x, i) => array.indexOf(x) === i);
    var unique2 = array2.filter((x, i) => array2.indexOf(x) === i);
    if (array.length != unique.length){
        let message ='Il y a 2 fois le meme joueur';
        console.log("ZZZZZZZZZZ");
        setError(joueur11,message);
        statut = "ko";
    } else if (array2.length != unique2.length){
        let message ='Il y a 2 fois le meme role';
        console.log("ZZZZZZZZZZ");
        setError(joueur11,message);
        statut = "ko";
    }
    else{statut = "ok"}
    return statut
}

function setError(elem,message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');
    // Ajout du message d'erreur
    small.innerText = message;

    // Ajout de la classe error
    console.log(formControl.className);
    formControl.className = 'form-control error';
}

function setSuccess(elem) {
    const formControl = elem.parentElement;
    formControl.className ='form-control success'
}

function setReset(elem) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');
    // Ajout du message d'erreur
    small.innerText = '';
    formControl.className = 'form-control';
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