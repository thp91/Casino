//   variables   \\

var Deck;
var jouer = document.querySelector("#jouer");
var tirer = document.querySelector("#tirer");
var secoucher = document.querySelector("#rester");
var joueur = document.querySelector("#joueur");
var CarteInvisible = document.querySelector(".b0.b1")
var croupier = document.querySelector("#croupier");
var tapis = document.querySelector(".tapis");
var button = document.getElementsByTagName(".tapis button:active");
var scoreJ = document.querySelector(".scorejoueur");
var scoreC = document.querySelector(".scorecroupier");  
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var draw = document.querySelector(".draw");
var FindePartie = false;
var MainJoueur = new Array();
var Valcarte = new Array();
var Symbolecarte = new Array();
var MainOrdi = new Array();
var Deck = new Array();




//   Fonctions   \\

//   Initialise le Deck   \\

// Je me suis inspirer de https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript pour une partie du code initdeck
function initdeck (){
    let deck = [];
    let carte = new Object();
    Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
    Symbolecarte = ["pique","coeur","trefle","carreau"];
    for (let i = 0; i < Symbolecarte.length; i++){
        for (let j = 0; j < Valcarte.length; j++){

            let val = parseInt(Valcarte[j]);

            if (Valcarte[j] == "Valet" || Valcarte[j] == "Dame" || Valcarte[j] == "Roi"){
                val = 10;
            }
 
            if(Valcarte[j] == "As"){
                val = 11;
            }

            carte = {
                "Nom" : Valcarte[j],
                "Symbole" : Symbolecarte[i],
                "Valeur" : val,
                "Image": "../Blackjack/cartes/" + Valcarte[j] + Symbolecarte[i] + ".gif"
            }

            deck.push(carte);
        }

    }
  
    return deck;
}


// Fonction de hasard \\

// https://sciences-du-numerique.fr/programmation-en-javascript/tirer-un-nombre-au-hasard/5 (Pour m'aider avec le math.floor)
function hasard(max){
    let min = 0;
	return Math.floor(Math.random() * (max - min)) + min; 
}


//   Melange le deck de carte   \\

function MixDeck(deck){

    for(let i = 0; i < deck.length; i++){
        let rand = hasard(deck.length);
        let temp = deck[i];
        deck[i] = deck[rand];
        deck[rand] = temp;
    }
    return deck;
}

// Permet de tirer un carte et la mettre dans la main que l'on souhaite (en la supprimant du Deck) \\

function PickCard (deck, Main){
    let rand = hasard(deck.length);
    Main.push(deck[rand]);
    deck.splice(rand,1);

}

//  Retourne la somme des point de la main choisis  \\

function SommeCarte(main){
    let somme = 0;
    for(let i = 0; i < main.length; i++){
        somme += main[i]["Valeur"];
    }
    return somme;
}

// Affiche les cartes du croupier \\

function AfficheCarteCroupier(personne, main){

    let img = document.createElement("img");
    for(let i = 0; i < main.length; i++){

        img.src = main[i].Image;
        img.classList.add("b"+i);
        personne.appendChild(img);
    }
}


// Affiche les cartes du joueur \\

function AfficheCarteJoueur(personne, main){

    let img = document.createElement("img");
    for(let i = 0; i < main.length; i++){
    
        img.src = main[i].Image;
        img.classList.add("j"+i);
        personne.appendChild(img);
    }
    


}

// Permet de savoir si un main a un blackJack \\

function BlackJack(main){
    let a = 11;
    let b = 10;
    carte1 = main[0]["Valeur"];
    carte2 = main[1]["Valeur"];
    if (carte1 == a && carte2 == b || carte1 == b && carte2 == a ){

        return true;
    }
}

// Distribue les cartes en début de partie \\

function Distrib(unDeck, MainDuJoueur, MainBanque){
    let cache = document.createElement("img");
    cache.classList.add('carteCache');
    for (let i = 0; i < 2; i++){

        PickCard(unDeck, MainDuJoueur);
        AfficheCarteJoueur(joueur,MainDuJoueur);
        PickCard(unDeck, MainBanque);
        AfficheCarteCroupier(croupier,MainBanque);

    }
    cache.src = "../Blackjack/cartes/cache.png";
    croupier.appendChild(cache);


}

// En fin de Partie, affiche les cartes invisibles, colore le tapis et supprime la carte caché \\

function FindeLaPartie(){

    document.body.style.background = "#756A6B";
    tapis.style.background = "#756A6B";
    tirer.style.background = "#756A6B";
    secoucher.style.background = "#756A6B";

    for(let i = 1; i<MainOrdi.length; i++){
        AfficheCarteCroupier(croupier,MainOrdi);
    }

    let CarteInvisible1 = document.querySelector(".b0.b1");
    CarteInvisible1.style.display = "inline-block";

    // Si la banque a une deuxieme carte caché \\

    let CarteInvisible2 = document.querySelector(".b0.b2");
    if(CarteInvisible2){
        CarteInvisible2.style.display = "inline-block";
    } 

    carteCache.remove();

    scoreC.innerHTML = "Score : " +SommeCarte(MainOrdi);
}

function Win() {
    // Permet de supprimer les image Draw et Lose qui sont en visibilité caché sur le tapis \\
    lose.parentNode.removeChild(lose);
    draw.parentNode.removeChild(draw);
    win.style.visibility = "visible";
    FindeLaPartie();
}

function Lose() {

    // Permet de supprimer les image Draw et Win qui sont en visibilité caché sur le tapis \\
    win.parentNode.removeChild(win);
    draw.parentNode.removeChild(draw);
    // Rend visible l'image Lose \\
    lose.style.visibility = "visible";
    FindeLaPartie();
}

function Draw() {
    // Permet de supprimer les image Lose et Win qui sont en visibilité caché sur le tapis \\
    console.log(" C'est une égalité ! Vos points sont égaux");
    lose.parentNode.removeChild(lose);
    win.parentNode.removeChild(win);
    draw.style.visibility = "visible";
    FindeLaPartie();
}



//   Utilisation du Js    \\


// initialisation du paquet et du tapis \\

Deck=initdeck();
console.log("Deck : ", Deck);
Distrib(Deck, MainJoueur, MainOrdi);
console.log("main du Joueur : ", MainJoueur);
console.log("main de la Banque : ", MainOrdi);
var carteCache = document.querySelector(".carteCache");
scoreJ.innerHTML = "Score : " +SommeCarte(MainJoueur);

// Tire une carte \\

tirer.addEventListener('click', () => {
  
    // Permet de ne plus pouvoir appuyé sur le bouton \\
    
    if(FindePartie){
        return;
    };

    PickCard(Deck, MainJoueur);
    AfficheCarteJoueur(joueur, MainJoueur);
    scoreJ.innerHTML = "Score : " +SommeCarte(MainJoueur);

    console.log("Deck : ", Deck);
    console.log("Vous avez maintenant : ", MainJoueur);
    console.log("main de la Banque : ", MainOrdi);

    let sommeJ = SommeCarte(MainJoueur);

    //  si apres avoir tirer le joueur a plus de 21  \\

    if(sommeJ > 21){
        console.log("Perdu ! Vous avez plus de 21.");
        Lose();
        FindePartie = true;
        
    };


});

//   Si le joueur se couche   \\

secoucher.addEventListener('click', () => {

    // Permet de ne plus pouvoir appuyé sur le bouton \\

    if(FindePartie){
        return;
    };

    // Variables locales \\

    let sommeJ = SommeCarte(MainJoueur);
    let sommeB = SommeCarte(MainOrdi);
    let img = document.createElement("img");
    img.classList.add('carteCache');

    // Une fois que le joueur se couche la banque tire ses cartes si moins de 17 \\

    while(sommeB < 17){
        PickCard(Deck, MainOrdi);
        carteCache.src = "../Blackjack/cartes/cache.png";
        croupier.appendChild(carteCache);
        console.log("La banque a maintenant : ", MainOrdi);
        console.log("Vous avez maintenant : ", MainJoueur);
        sommeB = SommeCarte(MainOrdi);
        
    };

    // Conditions de perte, de victoire ou d'égalité  \\

    if(sommeB > 21){
        console.log(" Gagné ! la banque à plus de 21.");
        Win();
        FindePartie = true;

    };

    if(BlackJack(MainOrdi) && BlackJack(MainJoueur)){

        console.log("Egalité ! Vous avez tout les deux Black Jack.");
        Draw();
        FindePartie = true;
        

    }else if(BlackJack(MainOrdi) && !BlackJack(MainJoueur)){

        console.log("Black Jack pour la Banque. Perdu !");
        Lose();
        FindePartie = true;
        

    }else if (BlackJack(MainJoueur) && !BlackJack(MainOrdi)){

        console.log("Black Jack pour le Joueur. C'est gagné !");
        Win();
        FindePartie = true;
        

    }else if (!BlackJack(MainOrdi) && !BlackJack(MainOrdi)){

        if(sommeJ < sommeB && sommeB < 22 ){

            console.log("La Banque a un plus grand jeu que vous. Perdu !");
            Lose();
            FindePartie = true;
            

        }else if (sommeJ > sommeB){

            console.log("C'est Gagné ! Vous avez un plus gros jeu");
            Win();
            FindePartie = true;



        }else if(sommeJ == sommeB){

            console.log(" C'est une égalité ! Vos points sont égaux");
            Draw();
            FindePartie = true;
            
        };


    };

})