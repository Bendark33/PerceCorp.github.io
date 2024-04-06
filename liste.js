// La recuperation des elements 
const form = document.querySelector('#form');
const joueurs = []; // Utilisez un tableau pour gérer les joueurs dynamiquement
for (let i = 1; i <= 11; i++) {
  joueurs.push(document.querySelector(`#j${i}`));
}
const roles = []; // De même pour les rôles
for (let i = 1; i <= 11; i++) {
  roles.push(document.querySelector(`#role-select${i}`));
}

// Evenements
form.addEventListener('submit', e => {
    e.preventDefault();
    team();
});

form.addEventListener('reset', e => {
    e.preventDefault();
    let list_poste4 = ['BU', 'AD', 'AG', 'MOCD', 'MOCG', 'MDC', 'DD', 'DG', 'DCD', 'DCG', 'G'];
    reset(list_poste4);
    resetRolesAndPlayers();
    setReset(joueurs[10]); // Utilisez le dernier joueur pour reset
});


document.getElementById('copy-to-clipboard-button').addEventListener('click', function() {
    let teamComposition = "Composition de l'équipe:\n";
    joueurs.forEach((joueur, index) => {
        if (joueur.value.trim() && roles[index].value) {
            teamComposition += `${roles[index].value}: ${joueur.value.trim()}\n`;
        }
    });

    // Utiliser l'API Clipboard pour copier le texte
    navigator.clipboard.writeText(teamComposition).then(() => {
        console.log('Composition copiée dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
    });
});




// Fonctions
function team() {
    //Reset des champs
    let listPoste = ['BU', 'AD', 'AG', 'MOCD', 'MOCG', 'MDC', 'DD', 'DG', 'DCD', 'DCG', 'G'];

    reset(listPoste);
    setReset(joueurs[10]);

    // Obtenir toutes les valeurs des inputs
    let listPlayeurBrut = joueurs.map(joueur => joueur.value.trim());
    let listRoleBrut = roles.map(role => role.value);
    let listRoleNet = removeItemOnce(listRoleBrut, '');
    console.log(listRoleNet);

    let fusion = [];
    for (let aa = 0; aa < listRoleBrut.length; aa++) {
        if (listRoleBrut[aa] !== '') {
            const placerole = [listPlayeurBrut[aa], listRoleBrut[aa]];
            console.log(placerole);
            listPoste = removeItemOnce(listPoste, listRoleBrut[aa]);
            fusion.push(placerole);
        }
    }

    let listPlayeurNet = removeItemOnce(listPlayeurBrut, '');
    let listFinal = listPoste.slice(0, listPlayeurNet.length);
    const number = listFinal.length;

    let statut = doublon(listPlayeurNet, listRoleNet);
    console.log(statut);

    for (let a = 0; a < number; a++) {
        const random = Math.floor(Math.random() * listFinal.length);
        const random2 = Math.floor(Math.random() * listPlayeurNet.length);
        const place = [listPlayeurNet[random2], listFinal[random]];
        listFinal = removeItemOnce(listFinal, listFinal[random]);
        listPlayeurNet = removeItemOnce(listPlayeurNet, listPlayeurNet[random2]);
        fusion.push(place);
    }

    if (statut == "ok") {
        for (let b = 0; b < fusion.length; b++) {
            let per = fusion[b];
            let pers = per[0];
            let place2 = per[1];
            document.getElementById(place2).value = pers;
        }
    }

    let teamComposition = "Composition de l'équipe:\n";
    fusion.forEach(pair => {
        teamComposition += `${pair[1]}-> ${pair[0]} |\n`; // Format : Position-> Joueur 
    });

    // Copie le texte dans le presse-papier
    navigator.clipboard.writeText(teamComposition).then(() => {
        console.log('Composition copiée dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur lors de la copie :', err);
    });
}

function removeItemOnce(array, value) {
    return array.filter(item => item !== value);
}

function reset(array) {
    array.forEach(perrr => {
        let elem = document.getElementById(perrr);
        if (elem) elem.value = '';
    });
}

function resetRolesAndPlayers() {
    joueurs.forEach(joueur => joueur.value = '');
    roles.forEach(role => role.value = '');
}

function doublon(array, array2) {
    let statut = "ok";
    let unique = array.filter((x, i, a) => a.indexOf(x) === i);
    let unique2 = array2.filter((x, i, a) => a.indexOf(x) === i);
    if (array.length !== unique.length) {
        let message = 'Il y a 2 fois le meme joueur';
        console.log("ZZZZZZZZZZ");
        setError(joueurs[10], message); // Affiche l'erreur sur le dernier joueur
        statut = "ko";
    } else if (array2.length !== unique2.length) {
        let message = 'Il y a 2 fois le meme role';
        console.log("ZZZZZZZZZZ");
        setError(joueurs[10], message); // Affiche l'erreur sur le dernier joueur
        statut = "ko";
    }
    return statut;
}

function setError(elem, message) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');
    // Ajout du message d'erreur
    small.innerText = message;
    // Ajout de la classe error
    console.log(formControl.className);
    formControl.className = 'form-control error';
}

function setReset(elem) {
    const formControl = elem.parentElement;
    const small = formControl.querySelector('small');
    // Efface le message d'erreur
    small.innerText = '';
    formControl.className = 'form-control';
}

