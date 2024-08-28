document.addEventListener('DOMContentLoaded', () => {

  const generateButton = document.querySelector('.btn-generate');
  const resetButton = document.querySelector('.btn-reset');
  const swapButton = document.querySelector('.btn-swap');

  nameDisplayCheck()
  const joueurs = []; // Utilisez un tableau pour gérer les joueurs dynamiquement
  for (let i = 1; i <= 11; i++) {
    joueurs.push(document.querySelector(`#j${i}`));
  }
  const roles = []; // De même pour les rôles
  for (let i = 1; i <= 11; i++) {
    roles.push(document.querySelector(`#poste-select${i}`));
  }
  
  let universalPostes = ['BU', 'AD', 'AG', 'MOD', 'MOG', 'MDC', 'DD', 'DG', 'DCD', 'DCG', 'G'];
  function team() {
      // Remise à zéro des erreurs
      good();
      // Suppression des anciens joueurs dans les postes
      
      // Utilisation de listPoste pour commencer par supprimer le nom des joueurs dans les textareas de postes
      let listPoste = ['BU', 'AD', 'AG', 'MOD', 'MOG', 'MDC', 'DD', 'DG', 'DCD', 'DCG', 'G'];
      universalPostes.forEach(poste => {
          document.getElementById(poste).value = '';
      });
  
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
  
      let statut = doublon(listPlayeurNet, listRoleBrut);
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
            // console.log("Joueur: "+ joueur + " Poste: "+ poste);
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

      // Enregistrement des joueurs dans les cookies
      for (let i = 1; i <= 11; i++) {
          const playerName = document.getElementById(`j${i}`).value;
          const playerPoste = document.getElementById(`poste-select${i}`).value;
          setCookie(`j${i}_name_fifa`, playerName, 30);
          setCookie(`j${i}_poste_fifa`, playerPoste, 30);
      }

  }
  
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    const secure = "; Secure"; // S'assure que le cookie est envoyé sur HTTPS
    const sameSite = "; SameSite=Strict"; // Empêche le cookie d'être envoyé avec des requêtes cross-site
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + secure + sameSite + "; path=/";
  }
  

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return '';
  }
    
  function loadPlayersFromCookies() {
    for (let i = 1; i <= 11; i++) {
      const playerName = getCookie(`j${i}_name_fifa`);
      const playerPoste = getCookie(`j${i}_poste_fifa`);
      if (playerName !== '') {
        // console.log("J"+i + " Name: "+ playerName + " Poste: "+ playerPoste);
        document.getElementById(`j${i}`).value = playerName;
      }
      if (playerPoste !== '') {
        document.getElementById(`poste-select${i}`).value = playerPoste;
      }
    }
  }

  function eraseCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }


  
  function removeItemOnce(array, value) {
    return array.filter(item => item !== value);
  }

  function reset() {
    
    for (let i = 1; i <= 11; i++) {
        document.getElementById(`j${i}`).value = '';
        document.getElementById(`poste-select${i}`).value = '';

        // Suppression des cookies
        setCookie(`j${i}_name_fifa`, '', -1);
        setCookie(`j${i}_poste_fifa`, '', -1);
      }
      // Suppression des postes
      universalPostes.forEach(poste => {
          document.getElementById(poste).value = '';
      });
}
  // Ajout des écouteurs d'événements sur les boutons
  generateButton.addEventListener('click', () => {
    resetSelect1();
    // Pour simuler un tirage comme au casino on répète la fonction team() 10 fois
    for (let i = 0; i < 10; i++) {
      setTimeout(() => team(), i * 100);
      if (i == 9)
      {
        console.log("weylax");
        setTimeout(() => getlist(), i * 100);
      }
    } 
  });

  resetButton.addEventListener('click', () => {
    console.log("Reset");
    reset();
  });
  // Utilisation du cookie player pour récupérer les joueurs
  loadPlayersFromCookies();

  swapButton.addEventListener('click', () => {
    swap();
  });

  function swap() {
    console.log("Reset");
    const joueurs = [];
    const final = [];// Utilisez un tableau pour gérer les joueurs dynamiquement
    const player = document.querySelector("#swap1").value;
    var id = "";
    var id2 = "";
    for (let i = 1; i <= 11; i++) {
    aa = document.querySelector(`.joueur${i} textarea`);
    if (aa.value !== '')
    {
      if (aa.value !== player ){
        if (aa.id !== "G")
        joueurs.push([aa.value,aa.id]);
        else final.push([aa.value,aa.id]);
      }
    else {
      id = aa.id
    }
    }
  }
  console.log(id);
  const indexJoueur = Math.floor(Math.random() * joueurs.length);
  console.log(indexJoueur);
  for (let aa = 0; aa < joueurs.length; aa++) {
    if (aa == indexJoueur){
      const bb = joueurs[aa];
      id2 = bb[1];
      final.push([bb[0],id])
    }
    else
      final.push(joueurs[aa])
    };

final.push([player,id2]);

console.log(final);
  final.forEach(([joueur, poste]) => {
    // console.log("Joueur: "+ joueur + " Poste: "+ poste);
      document.getElementById(poste).value = joueur;
      
  });

}

function getlist() {
  console.log("Reset");
  var b = document.querySelector("#swap1");
    console.log(b);
    for (let n = 1; n <= 11; n++) {
    aa = document.querySelector(`.joueur${n} textarea`);
    if (aa.value !== '')
    {
      console.log(aa.value);
    var lengthb = b.length;
    b[lengthb] = new Option(aa.value); 
    }
   }
}

function resetSelect1() {
  const q = document.querySelector("#swap1").options.length=1;
}


  function doublon(array, array2) {
    let statut = "ok";
    let indexError = 0;
    let arrayIndex = 0;
     array.forEach((item, index) => { // Vérification des doublons dans les tableaux
        if (array.indexOf(item) !== index) {
            // console.log("Index: "+ index + " Item: "+ item);
            statut = "ko";
            indexError = index+1;
            arrayIndex = 1;
            return statut;
        }
        });
        console.log("Array2: "+ array2);
    array2.forEach((item, index) => {
        if (array2.indexOf(item) !== index && array2[index] !== '') { 
            // console.log("Index: "+ index + " Item: "+ item);
            statut = "ko";
            indexError = index+1;
            if (arrayIndex === 0) {
                arrayIndex = 2;
            } else {
                arrayIndex = 3;
            }
            return statut;
        }
    }
    );
        
    // Appel de la fonction erreur avec le statut et les tableaux concernés et son index si besoin
    if (statut === "ko") {
        erreur(statut, arrayIndex, indexError);
    } else {
        good();
    }
    return statut;
  }


function erreur(statut, arrayIndex, indexError) {
    if (statut === "ko") {
        if (arrayIndex === 1) {
            console.log("Double de joueur");
            document.getElementById(`j${indexError}`).classList.add('error');
        } else if (arrayIndex === 2) {
            console.log("Double de poste");
            document.getElementById(`poste-select${indexError}`).classList.add('error');
        } else {
            console.log("Double de joueur et de poste");
            document.getElementById(`j${indexError}`).classList.add('error');
            document.getElementById(`poste-select${indexError}`).classList.add('error');
        }
    }
}
function good(){
    // Suppression de la classe error si elle existe
    for (let i = 1; i <= 11; i++) {
        document.getElementById(`j${i}`).classList.remove('error');
        document.getElementById(`poste-select${i}`).classList.remove('error');
    }
}

function nameDisplayCheck() {
  // vérifie si l'élément 'name' est stocké dans le web storage
  if (localStorage.getItem("top1")) {
    // Si c'est le cas, affiche un accueil personnalisé
    const name = localStorage.getItem("top1");
    document.getElementById("top").value = name
  } else {
    // Sinon, affiche un accueil générique
    document.getElementById("top").value = ""
  }
  if (localStorage.getItem("flop1")) {
    // Si c'est le cas, affiche un accueil personnalisé
    const name2 = localStorage.getItem("flop1");
    document.getElementById("flop").value = name2
  } else {
    // Sinon, affiche un accueil générique
    document.getElementById("flop").value = ""
  }
}

});