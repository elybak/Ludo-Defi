
const btnNewGame = document.getElementById("btnNewGame");
const btnRolldice = document.getElementById("btnRolldice");
const imagesDe = document.querySelectorAll(".de img");
// let De = document.querySelector(".de")
const  btnHold = document.getElementById("btnHold");
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
  changeBackground();  

  afficherMessage(  joueur + " commence la partie") ;
  return joueur;
};
 // ajouter une couleur de fond au joueur choisi ET enlever la couleur de fond de l'autre joueur ET changer le joueur actif
let changeBackground = () => {
  for (let player of players) {
    if (document.getElementById(player).classList.contains("active")) {
      // changer le background du joueur actif
      document.getElementById(player).style.backgroundColor = "rgba(39, 184, 39, 0.588)";
      // changer le font-weight du joueur actif
      document.getElementById(player).style.fontWeight = "bold";
       // appeler la fonction pour gerer le point rouge
      changePoint();
 

    } else {
      document.getElementById(player).style.backgroundColor = "white";
      document.getElementById(player).style.fontWeight = "normal";
    }
   }
};

// fonction pour gerer le point rouge qui indique le joueur actif et la suppression du point rouge du joueur inactif et quand la partie n'est pas commencée

let changePoint = () => {
   let started = false;
   if (!started) {
    for (let player of players) {
      document.querySelectorAll(".player-indicator")[players.indexOf(player)].style.display = "none";
    }
    started = true;
  }
  for (let player of players) {
    if (document.getElementById(player).classList.contains("active") ){
      document.querySelectorAll(".player-indicator")[players.indexOf(player)].style.display = "inline-block";
    } else {
      document.querySelectorAll(".player-indicator")[players.indexOf(player)].style.display = "none";
    }
  }
};
changePoint();

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
    afficherMessage("Vous avez obtenu un " + numeroDe);
    joueur.textContent = parseInt(joueur.textContent) + numeroDe;
    messageElement.classList.remove("rouge"); // Enlever le message en rouge
  } else {
    afficherMessage("ops pas de chance vous avez obtenu un  " + numeroDe.style );
    messageElement.classList.add("rouge"); // Afficher le message en rouge
    joueur.textContent = 0;
    changerJoueur();
    changeBackground();
  } 
};




// fonction pour gerer le score total

let gererScoreTotal = (joueur, scoreCourant) => {
  joueur.textContent = parseInt(joueur.textContent) + parseInt(scoreCourant.textContent);
  scoreCourant.textContent = 0;
  
  if (joueur.textContent >= 100) {
    let joueur = document.querySelector(".active").id; // récupérer le joueur actif
    afficherMessage(" félicitations " + joueur + " a gagné");
    btnRolldice.disabled = true;
    btnHold.disabled = true;
  }
 
};





// fonction pour gerer le bouton newGame
let newGame = btnNewGame.addEventListener("click", () => {
  resetScores();
  choisirJoueur();
  gererBoutons();
  afficherImage ( Math.floor(Math.random() * 6) + 1 );

}
);



// fonction pour gerer le bouton lancer le dé  pour chaque joueur en utilisant les index des joueurs
let Rolldice = btnRolldice.addEventListener("click", () => {
  let joueur = document.querySelector(".active").id; // récupérer le joueur actif
  let scoreCourant = playerCurrenteScore[players.indexOf(joueur)]; // récupérer le score courant du joueur actif
  let numeroDe = lancerDe();
  afficherImage(numeroDe);
  gererScoreCourant(scoreCourant, numeroDe);
 
}
);

// fonction pour gerer le bouton garder le score pour chaque joueur en utilisant les index des joueurs
let hold = btnHold.addEventListener("click", () => {
  let joueur = document.querySelector(".active").id;
  let scoreCourant = playerCurrenteScore[players.indexOf(joueur)];
  let scoreTotal = scores[players.indexOf(joueur)];
  gererScoreTotal(scoreTotal, scoreCourant);
  changerJoueur();
  changeBackground();

}
);

// fonction  pour gerer le comportement des boutons lancer le dé et garder le score
// desactive le bouton "lancer le dé" et le bouton "garder le score" si "newGame" n'est pas cliqué  et si un des joueur a gagné en utilisant les index des joueurs
let gererBoutons = () => {
  let joueur = document.querySelector(".active");
  let scoreTotal = scores[players.indexOf(joueur)];
  if (scoreTotal >= 100) {
  } else {
    btnRolldice.disabled = false;
    btnHold.disabled = false;
  }
};
gererBoutons();

// fonction pour afficher un message 

const messageElement = document.getElementById("message");

function afficherMessage(texte) {
  messageElement.textContent = texte;
  messageElement.parentElement.style.display = "block";
  setTimeout(() => {
    messageElement.parentElement.style.display = "none";
  }, 2000); // Masquer le message après 2 secondes
}


