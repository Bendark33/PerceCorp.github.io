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



function team() {
    // Reset des champs
    let listPoste = ['BU', 'AD', 'AG', 'MOCD', 'MOCG', 'MDC', 'DD', 'DG', 'DCD', 'DCG', 'G'];
    reset(listPoste);
    setReset(joueurs[10]);

    // Obtenir toutes les valeurs des inputs
    let listPlayeurBrut = joueurs.map(joueur => joueur.value.trim());
    let listRoleBrut = roles.map(role => role.value);
    let listRoleNet = removeItemOnce(listRoleBrut, '');
    let fusion = [];
    for (let aa = 0; aa < listRoleBrut.length; aa++) {
        if (listRoleBrut[aa] !== '') {
            const placerole = [listPlayeurBrut[aa], listRoleBrut[aa]];
            listPoste = removeItemOnce(listPoste, listRoleBrut[aa]);
            fusion.push(placerole);
        }
    }

    let listPlayeurNet = removeItemOnce(listPlayeurBrut, '');
    let postesRestants = listPoste.filter(p => !fusion.some(f => f[1] === p)); //
    
    let joueursSansPostePredefini = listPlayeurNet.filter(p => !fusion.some(f => f[0] === p));
    const number = joueursSansPostePredefini.length;

    let statut = doublon(listPlayeurNet, listRoleNet);
    // console.log(statut);
    // console.log("Postes restants: "+ postesRestants);
    for (let a = 0; a < number; a++) {
        if (postesRestants.length === 0) break; // Au cas où il n'y aurait plus de postes disponibles

        const indexJoueur = Math.floor(Math.random() * joueursSansPostePredefini.length);

        const joueur = joueursSansPostePredefini.splice(indexJoueur, 1)[0];
        const poste = postesRestants.splice(0, 1)[0];
        // console.log("Joueur: "+ joueur + " Poste: "+ poste);
        // console.log("Postes restants: "+ postesRestants);
        fusion.push([joueur, poste]);
    }

    // Mise à jour de l'interface utilisateur si statut est "ok"
    if (statut === "ok") {
        fusion.forEach(([joueur, poste]) => {
            document.getElementById(poste).value = joueur;
        });
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
        console.log("2 fois le même joueur !");
        setError(joueurs[10], message); // Affiche l'erreur sur le dernier joueur
        statut = "ko";
    } else if (array2.length !== unique2.length) {
        let message = 'Il y a 2 fois le meme role';
        console.log("2 fois le même rôle !");
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

