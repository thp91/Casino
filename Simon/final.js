const vert = document.getElementById("vert");
const rose = document.getElementById("rouge");
const orange = document.getElementById("jaune");
const bleu = document.getElementById("bleu");
const go = document.getElementById("start");
const scoreBtn = document.getElementById("score");
const STRICT_MODE = document.getElementById("strict");

const TIME_BY_ROUND_IN_MS = 750;
let score = 0;
let CONFIRM_STRICT_MODE = false;

let joueurAJoué = false;
let couleursOrdinateur = []; // suite de couleur que l'ordi a choisit aleatoirement
let couleursJoueur = []; // suite de couleur que le joueur a choisit
const NB_TOURS_MAX = 7;
const colorsBtn = [vert, rose, orange, bleu];

scoreBtn.innerHTML = "score :" + score;

STRICT_MODE.addEventListener("click", () => {
  CONFIRM_STRICT_MODE = true;
});


const hasard = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // ps fais par moi  

const clignote = (btn) => {
  // On ajoute la classe blanc au bouton en question
  btn.classList.add("blanc");
  //
  setTimeout(() => {
    // Au bout de 750 ms on enlève la classe blanche pour retrouver la couleur initiale
    btn.classList.remove("blanc");
  }, TIME_BY_ROUND_IN_MS);
};

let couleursGenerees = 1;

const ordinateurJoue = async () => {    // pas fais par moi. permet de fair clignote une couleur au hasard
  console.log("ordinateurJoue");
  // permet de faire clignoter une ou plusieurs couleur aleatoire.        
  for (let i = 0; i < couleursGenerees; i++) {    // Si couleursGenerees = 1, une couleur clignote. si = 2, 2 couleurs clignotes etc
    const index = hasard(4);
    clignote(colorsBtn[index]);
    couleursOrdinateur.push(index); // on ajoute la ou les couleurs choisi par l ordi a la liste
    await delay(TIME_BY_ROUND_IN_MS * 1.7); // On attend 750ms pour que l'homme puisse voir
  }

  joueurAJoué = false;
  // Quand la machine joue, ça remet joueurAJoué à false pour que l'user puisse clicker à nouveau
};


 go.addEventListener("click", ordinateurJoue); 


const joueurJoue = async (event) => {
  if (joueurAJoué) {
    // Si le joueur a joué et click on ne fait rien
    return;
  }
  const colorBtn = event.target;     // ces 2 lignes, l'idee ne vient pas de moi.
  const index = colorsBtn.indexOf(colorBtn);

  clignote(colorBtn);
  couleursJoueur.push(index); // on ajoute cette couleur a la liste

  // On calcule les scores et les nouveaux tableaux de séquences
  const auTourDeLOrdinateur = calculeProchaineEtape();

  if (auTourDeLOrdinateur) {
    await delay(TIME_BY_ROUND_IN_MS * 1.7);
    ordinateurJoue();
    joueurAJoué = true; // Débloquera le click du joueur
  }
};

vert.addEventListener("click", joueurJoue);

rose.addEventListener("click", joueurJoue);

orange.addEventListener("click", joueurJoue);

bleu.addEventListener("click", joueurJoue);

const calculeProchaineEtape = () => {  // Pour compqrer les 2 listes  
  // On boucle sur toutes les couleurs du joueurs pour voir si elles correspondent à celles de la machine
  const BonnesCouleursTrouvees = couleursJoueur.every(    // pas fais par moi. permet de comparer chaque index des 2 tableau
    (couleur, index) => couleur === couleursOrdinateur[index]
  );
  // On regarde si le joueur en est au dernier choix de couleur de la séquence
  const laSequenceEstComplete =
    couleursOrdinateur.length === couleursJoueur.length;

  if (BonnesCouleursTrouvees) {
    if (laSequenceEstComplete) {
      // Si il a trouvé les bonnes couleurs jusque là ainsi que toute la séquence
      console.log("[SUCCES] Vous avez trouvé la séquence de couleur ",couleursGenerees);
      score += 1; // +1 sur le score
      scoreBtn.innerHTML = "score :" + score;
      couleursGenerees += 1; // +1 couleur au prochain tour

      if (couleursJoueur.length === NB_TOURS_MAX) {
        // Si le joueur en est au dernier tour (la fin du jeu)
        console.log("C'est fini tu as gagné, score final ", score);
        
        scoreBtn.innerHTML = "C'est gagné";
        couleursGenerees = 0;
      }

      // Qu'on soit à la fin du jeu ou à la fin du tour on efface tout, si on a trouvé on efface tout
      couleursOrdinateur = [];
      couleursJoueur = [];

      // On renvoie vrai pour dire que c'est au tour de la machine de jouer
      return true;
    }
    // Ici cela signifie que laSequenceEstComplete = false, mais que BonnesCouleursTrouvees = true, donc qu'il n'a pas
    // terminer de saisir la suite de couleur (Ex, il a saisi bleu/rouge sur bleu/rouge/vert)
    // On renvoie false donc pour dire que l'ordinateur ne peut pas encore jouer mais doit attendre que l'utilisateur
    // finisse sa séquence
    return false;
  }

  // Si on arrive ici c'est qu'on a pas quitté la fonction dans le précédent if,
  // donc qu'on y est pas passé, donc qu'on a pas trouvé les bonnes couleurs
  // donc a partir d'ici c'est la gestion des echecs
  if (!CONFIRM_STRICT_MODE) {
    console.log("[FAIL] Vous n'avez pas trouvé la séquence, mais vous pouvez recommencer");
    // Si on est PAS en strict mode
    scoreBtn.innerHTML = "erreur"
    // On efface juste ce qu'à fait le joueur, et il peut recommencer à volonter
    couleursJoueur = [];
    return false; // On quitte la fonction en disant que c'est toujours au joueurs
  }

  //Si on arrive ici c'est qu'on a pas quitté la fonction dans les DEUX précédents if,
  // donc qu'on a pas trouvé la séquence et qu'on est en STRICT MODE
  console.log("[FAIL] perdu, tu recommences");

  // En strict mode on recommence tout dès qu'on se trompe
  couleursOrdinateur = [];
  couleursJoueur = [];
  couleursGenerees = 1;
  score = 0;
  scoreBtn.innerHTML = "score :" + score;
  return true; // On quitte la fonction en disant que c'est au tour de la machine
};
