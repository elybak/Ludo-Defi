// y a deux joueur player 1 et player 2
// chaque joueur a un score total et un score courant
// chaque joueur le de a 6 faces et chaque face a une valeur 
// chaque joueur lance le dé autant de fois qu'il le souhaite
// chaque fois qu'un joueur lance le dé, la valeur du dé est ajoutée à son score courant
// si le joueur obtient un 1, son score courant est remis à zéro et c'est au tour du joueur suivant
// le joueur peut choisir de "garder" son score courant, qui est alors ajouté à son score total
// le premier joueur qui atteint 100 points gagne
// le joueur peut choisir de "garder" son score courant, qui est alors ajouté à son score total
// le premier joueur qui atteint 100 points gagne
// la partie est terminée et un message de félicitation est affiché

//----------------------------------------------------

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let imagesDe = document.querySelectorAll(".de img");
let  btn3 = document.getElementById("btn3");
let player1CurrentScore = document.getElementById("player1CurrentScore");
let player2CurrentScore = document.getElementById("player2CurrentScore");
let player1Score = document.getElementById("player1Score");
let player2Score = document.getElementById("player2Score");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let numeroDe = Math.floor(Math.random() * 6) + 1;
let valeurDe = imagesDe[numeroDe - 1].alt;
let players = ["player1", "player2"];



 




// fonction de reinitialisation / nouvelle partie 
newGame = btn1.addEventListener("click", () => {
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  joueurActuel();
});

// fonction pour passer au joueur suivant
let joueurSuivant = () => {
  if (joueurActuel === 'player1') {
    joueurActuel = 'player2';
    player1.style.backgroundColor = "white";
    player2.style.backgroundColor = "green";
  } else {
    joueurActuel = 'player1';
    player2.style.backgroundColor = "white";
    player1.style.backgroundColor = "green";
  }
};







// fonction lancer le de et retourner la valeur du de 
const lancerDe = () => {
  // Cacher toutes les images de dé au début
  imagesDe.forEach(image => image.style.display = "none");

  // Choisir un numéro de dé aléatoire entre 1 et 6
  const numeroDe = Math.floor(Math.random() * 6) + 1;

  // Afficher l'image correspondante au numéro choisi
  imagesDe[numeroDe - 1].style.display = "block";


  // Retourner la valeur du dé
  return imagesDe[numeroDe - 1].alt;
};
lancerDe();

// choisir un joueur qui commence la partie au hasard




// fonction pour determiner le joueur qui commence la partie au hasard
let joueurActuel = () => {
  playerStart = players[Math.floor(Math.random() * players.length)];

  if (playerStart === "player1") {
    player1.style.backgroundColor = "green";
    player2.style.backgroundColor = "white";
  } else {
    player2.style.backgroundColor = "green";
    player1.style.backgroundColor = "white";
  }
};
joueurActuel();


// //fonction pour gerer le score current
rolldice = btn2.addEventListener("click", () => {
  let valeurDe = lancerDe();
  if (valeurDe !== "1") {
    if (joueurActuel === "player1") {
      player1CurrentScore.textContent = Number(valeurDe);
    } else {
      player2CurrentScore.textContent = Number(valeurDe);
    }
  } else {
    joueurSuivant();
    player1CurrentScore.textContent = 0;
    player2CurrentScore.textContent = 0;
  }
});
// rolldice(); 


// fonction pour gerer le score total btn3
hold = btn3.addEventListener("click", () => {

  if (joueurActuel === "player1") {

    player1Score.textContent = Number(player1Score.textContent) + Number(player1CurrentScore.textContent);
    player1CurrentScore.textContent = 0;
  } else {
    player2Score.textContent = Number(player2Score.textContent) + Number(player2CurrentScore.textContent);
    player2CurrentScore.textContent = 0;
  }
  if (player1Score.textContent >= 100) {
    alert("Player 1 wins");
  } else if (player2Score.textContent >= 100) {
    alert("Player 2 wins");
  }
  joueurSuivant();
});
hold();




