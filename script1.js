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

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const imagesDe = document.querySelectorAll(".de img");
// let De = document.querySelector(".de")
const  btn3 = document.getElementById("btn3");
let player1CurrentScore = document.getElementById("player1CurrentScore");
let player2CurrentScore = document.getElementById("player2CurrentScore");
let player1Score = document.getElementById("player1Score");
let player2Score = document.getElementById("player2Score");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let numeroDe = Math.floor(Math.random() * 6) + 1;
const players = ["player1", "player2"];
let playerCurrenteScore = [ player1CurrentScore, player2CurrentScore];


// fonction de reinitialisatios des scores
const scores = [player1Score, player2Score, player1CurrentScore, player2CurrentScore];

let resetScores=() =>{
  for (let element of scores) {
    element.textContent = 0;
  }
};




// fonction pour choisir un joueur au hasard
let choisirJoueur = () => { 

  // Réinitialiser l'état des joueurs
  for (let player of players) {
    document.getElementById(player).classList.remove("active");
  }
  // choisir un joueur au hasard
  let joueur = players[Math.floor(Math.random() * players.length)]; 
  // ajouter classe active au joueur choisi
  document.getElementById(joueur).classList.add("active"); 
  // changer le background du joueur choisi
  changeBackgroun();

  return joueur;

};




 // ajouter une couleur de fond au joueur choisi ET enlever la couleur de fond de l'autre joueur ET changer le joueur actif
let changeBackgroun = () => {
  for (let player of players) {
    if (document.getElementById(player).classList.contains("active")) {
      document.getElementById(player).style.backgroundColor = "green";
    } else {
      document.getElementById(player).style.backgroundColor = "white";
    }
  }
};








// fonction pour changer de joueur

let changerJoueur = () => {
  for (let player of players) { 
    if (document.getElementById(player).classList.contains("active")) {
      document.getElementById(player).classList.remove("active"); 
      let index = players.indexOf(player); 
      let nextPlayer = players[(index + 1) % players.length]; 
      document.getElementById(nextPlayer).classList.add("active");
      return nextPlayer;
    }
  }

  return choisirJoueur();
   
}


// fonction pour lancer le dé
let lancerDe = () => {
  numeroDe = Math.floor(Math.random() * 6) + 1;
  return numeroDe;
};

// fonction pour afficher l'image du dé qui correspond au numéro obtenu au lance du dé 

let afficherImage = (numeroDe) => {
  imagesDe.forEach((image, index) => {
    if (index === numeroDe - 1) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });
};

// fonction pour gerer le score courant 

let gererScoreCourant = (joueur, numeroDe) => {
  if (numeroDe !== 1) {
    joueur.textContent = parseInt(joueur.textContent) + numeroDe;
  } else {
    joueur.textContent = 0;
    changerJoueur();
    changeBackgroun();
  }
};


// fonction pour gerer le score total
let gererScoreTotal = (joueur, scoreCourant) => {
  joueur.textContent = parseInt(joueur.textContent) + parseInt(scoreCourant.textContent);
  scoreCourant.textContent = 0;
  if (parseInt(joueur.textContent) >= 100) {
    alert("Félicitations! Vous avez gagné");
    resetScores();
  }
};
// fonction pour gerer le bouton newGame
let newGame = btn1.addEventListener("click", () => {
  resetScores();
  choisirJoueur(); 
  gererBoutons(); 
}
);



// fonction pour gerer le bouton lancer le dé  pour chaque joueur en utilisant les index des joueurs
let holldice = btn2.addEventListener("click", () => {
  let joueur = document.querySelector(".active").id;
  let scoreCourant = playerCurrenteScore[players.indexOf(joueur)];
  let numeroDe = lancerDe();
  afficherImage(numeroDe);
  gererScoreCourant(scoreCourant, numeroDe);

  
}
);

// fonction pour gerer le bouton garder le score pour chaque joueur en utilisant les index des joueurs
let hold = btn3.addEventListener("click", () => {
  let joueur = document.querySelector(".active").id; //
  let scoreCourant = playerCurrenteScore[players.indexOf(joueur)];
  let scoreTotal = scores[players.indexOf(joueur)];
  gererScoreTotal(scoreTotal, scoreCourant);
  changerJoueur();
  changeBackgroun();
}
);

// fonction  pour gerer le comportement des boutons lancer le dé et garder le score
// desactive le bouton "lancer le dé" et le bouton "garder le score" si "newGame" n'est pas cliqué  et si un des joueur a gagné en utilisant les index des joueurs
let gererBoutons = () => {
  let joueur = document.querySelector(".active");
  let scoreTotal = scores[players.indexOf(joueur)];
  if (scoreTotal >= 100) {
    btn2.disabled = true;
    btn3.disabled = true;
  } else {
    btn2.disabled = false;
    btn3.disabled = false;
  }
};
// appeler la fonction gererBoutons
gererBoutons();


// fonction pour gerer le background des joueurs en utilisant les index des joueurs