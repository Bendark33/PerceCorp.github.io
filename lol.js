document.addEventListener('DOMContentLoaded', function () {

    function getRankValue(rank) {
        const rankValues = {
            unranked: 0,
            iron: 1,
            bronze: 2,
            silver: 3,
            gold: 4,
            platine: 5,
            emeraude: 6,
            diamant: 7,
            master: 8,
            grandmaster: 9,
            challenger: 10
        };
        return rankValues[rank] || 0;
    }
  //   function getRankValue(rank) {
  //     const rankValues = {
  //         unranked: 0,
  //         iron: 1,
  //         bronze: 2,
  //         silver: 4,
  //         gold: 8,
  //         platine: 16,
  //         emeraude: 32, // Notez que le rang Emeraude n'existe pas officiellement
  //         diamant: 64,
  //         master: 128,
  //         grandmaster: 256,
  //         challenger: 512
  //     };
  //     return rankValues[rank] || 0;
  // }
  

    function loadPlayersFromCookies() {
        for (let i = 1; i <= 10; i++) {
            const playerName = getCookie(`j${i}_name`);
            const playerRank = getCookie(`j${i}_rank`);
            if (playerName !== '') {
                document.getElementById(`j${i}`).value = playerName;
            }
            if (playerRank !== '') {
                document.getElementById(`rank-select${i}`).value = playerRank;
            }
        }
    }
    
    function generateTeams() {
        
        const players = [];
        const isBalanceOn = document.getElementById('balance-switch').checked; // Cela retourne true si l'interrupteur est sur ON


        for (let i = 1; i <= 10; i++) {
            const playerName = document.getElementById(`j${i}`).value.trim();
            const playerRank = document.getElementById(`rank-select${i}`).value; 
            players.push({ name: playerName, rank: getRankValue(playerRank), originalRank: playerRank });
                // Enregistrement des cookies
                setCookie(`j${i}_name`, playerName, 365);
                setCookie(`j${i}_rank`, playerRank, 365);
        }
        shuffleArray(players);
        console.log("Liste joueurs:", players);
        
        let rankTotal = 0;
        players.forEach(player => rankTotal += player.rank);
        // console.log('Rank total:', rankTotal);
        if(isBalanceOn){
            // L'equilibre est forcément la moitié du total des ranks
            equilibre = rankTotal / 2;
            console.log('Equilibre:', equilibre);
            const [compoTeam1, compoTeam2] = findTwoCombinations(players, equilibre);
            displayTeams(compoTeam1, compoTeam2);
            copyToClipboard(compoTeam1, compoTeam2);
            insertIntoHtml(compoTeam1, compoTeam2);

        } else {
            // Equipes aléatoires sans équilibre
            const team1 = players.slice(0, 5);
            const team2 = players.slice(5, 10);
            displayTeams(team1, team2);
            copyToClipboard(team1, team2);
            insertIntoHtml(team1, team2);
        }
                       
    }
    // Insertion des joueurs dans le HTML dans le textarea
    function insertIntoHtml(team1, team2) {
      // On vide les textarea
      for (let i = 1; i <= 10; i++) {
        document.getElementById(`joueur${i}`).value = '';
      }


        team1.forEach((player, index) => {
            setTimeout(() => {
                document.getElementById(`joueur${index + 1}`).value = player.name + ' (' + player.originalRank + ')';
            }, index * 600);
        });
        team2.forEach((player, index) => {
            setTimeout(() => {
                document.getElementById(`joueur${index + 6}`).value = player.name + ' (' + player.originalRank + ')';
            }, index * 600);
        });
    }
    




    function displayTeams(compoTeam1, compoTeam2) {
        console.log("Team1:", compoTeam1.map(player => player.name), "Total:", compoTeam1.reduce((a, b) => a + b.rank, 0));
        console.log("Team2:", compoTeam2.map(player => player.name), "Total:", compoTeam2.reduce((a, b) => a + b.rank, 0));
        let team1 = '';
        let team2 = '';
        compoTeam1.forEach(player => team1 += `<li>${player.name} (${player.originalRank})</li>`);
        compoTeam2.forEach(player => team2 += `<li>${player.name} (${player.originalRank})</li>`);
        
    }


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Echange des éléments du tableau avec destructuration par exemple [a, b] = [b, a]
        }
    }
    

   function reset() {
        for (let i = 1; i <= 10; i++) {
            document.getElementById(`j${i}`).value = '';
            document.getElementById(`rank-select${i}`).value = 'unranked';
            // Suppression des cookies
            setCookie(`j${i}_name`, '', -1);
            setCookie(`j${i}_rank`, '', -1);
        }

    }

    
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
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

    loadPlayersFromCookies();

    document.querySelector(".btn-generate").addEventListener('click', generateTeams);
    document.querySelector(".btn-reset").addEventListener('click', reset);


    function findCombinations(array, comboLength) {
        function* doFindCombinations(offset, combo) {
          if (combo.length === comboLength) {
            yield combo;
            return;
          }
          for (let i = offset; i <= array.length - comboLength + combo.length; i++) {
            yield* doFindCombinations(i + 1, combo.concat(array[i]));
          }
        }
      
        return [...doFindCombinations(0, [])];
      }
      
      function removecompoTeam1(numbers, compoTeam1) {
        let tempNumbers = [...numbers];
        compoTeam1.forEach(element => {
          const index = tempNumbers.findIndex(e => e.name === element.name);
          if (index > -1) {
            tempNumbers.splice(index, 1);
          }
        });
        return tempNumbers;
      }
      
      function findTwoCombinations(joueurs, equilibre) {
        let compoTeam1 = null;
        let compoTeam2 = null;
        let combinations = findCombinations(joueurs, 5);
        // Si équilibre n'est pas un entier, alors la premiere combinaison sera égale à l'entier inférieur et la deuxième combinaison sera égale à l'entier supérieur
        if (equilibre % 1 !== 0) {
          let floor = Math.floor(equilibre);
          let ceil = Math.ceil(equilibre);
          let compoTeam1Floor = null;
          let compoTeam2Floor = null;
          let compoTeam1Ceil = null;
          let compoTeam2Ceil = null;
          // Recherche de la première combinaison
          for (let combo of combinations) {
            if (combo.reduce((a, b) => a + b.rank, 0) === floor) {
              compoTeam1Floor = combo;
              break;
            }
          }
          // Recherche de la deuxième combinaison
          for (let combo of combinations) {
            if (combo.reduce((a, b) => a + b.rank, 0) === ceil) {
              compoTeam1Ceil = combo;
              break;
            }
          }
          // Si les deux combinaisons sont trouvées
          if (compoTeam1Floor && compoTeam1Ceil) {
            let joueursRestantFloor = removecompoTeam1(joueurs, compoTeam1Floor);
            let joueursRestantCeil = removecompoTeam1(joueurs, compoTeam1Ceil);
            combinations = findCombinations(joueursRestantFloor, 5);
            // Recherche de la deuxième combinaison
            for (let combo of combinations) {
              if (combo.reduce((a, b) => a + b.rank, 0) === ceil) {
                compoTeam2Floor = combo;
                break;
              }
            }
            combinations = findCombinations(joueursRestantCeil, 5);
            // Recherche de la deuxième combinaison
            for (let combo of combinations) {
              if (combo.reduce((a, b) => a + b.rank, 0) === floor) {
                compoTeam2Ceil = combo;
                break;
              }
            }
          }
          // Si les deux combinaisons sont trouvées
          if (compoTeam1Floor && compoTeam1Ceil && compoTeam2Floor && compoTeam2Ceil) {
            // On choisit la meilleure combinaison
            let diffFloor = Math.abs(compoTeam1Floor.reduce((a, b) => a + b.rank, 0) - compoTeam2Floor.reduce((a, b) => a + b.rank, 0));
            let diffCeil = Math.abs(compoTeam1Ceil.reduce((a, b) => a + b.rank, 0) - compoTeam2Ceil.reduce((a, b) => a + b.rank, 0));
            if (diffFloor < diffCeil) {
              compoTeam1 = compoTeam1Floor;
              compoTeam2 = compoTeam2Floor;
            } else {
              compoTeam1 = compoTeam1Ceil;
              compoTeam2 = compoTeam2Ceil;
            }
          }

          let random = Math.floor(Math.random() * 4); // Random entre 0 et 3
          if(random < 1){ // Donc une chance sur 4
            return [compoTeam1, compoTeam2];
          } else {
            return [compoTeam2, compoTeam1];
          }
        }
        // Si équilibre est un entier
        for (let combo of combinations) {
          if (combo.reduce((a, b) => a + b.rank, 0) === equilibre) {
            compoTeam1 = combo;
            break;
          }
        }
        if (compoTeam1) {
          compoTeam2 = removecompoTeam1(joueurs, compoTeam1);
        }
        return [compoTeam1, compoTeam2];
      }

      
    function copyToClipboard(team1, team2) {
        let teamComposition = "##Equipe 1:\n";
        team1.forEach(player => {
            teamComposition += `| ${player.name}\n`;
        });
        teamComposition += "\n##Equipe 2:\n";
        team2.forEach(player => {
            teamComposition += `| ${player.name}\n`;
        });
        navigator.clipboard.writeText(teamComposition).then(() => {
            console.log('Composition copiée dans le presse-papier !');
        }).catch(err => {
            console.error('Erreur lors de la copie :', err);
        });
    }
     


    
});
