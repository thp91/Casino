var bgc = document.querySelector(".bgc");
var boutonCouleur = document.querySelector("Input#choiceColor");
var couleur;
var draw = document.querySelector("Input#draw");
var resetBgc = document.querySelector("#reset");
var grid = document.querySelector(".grid");
var TabDiv = document.getElementsByTagName("div");
var Px;
var Py;

//   Fonctions   \\

function resetC(){
    
    for(let i = 1; i < 257; i++){
        
        TabDiv[i].style.background = "#fafafa";

    }
}



//   Evenements   \\

resetBgc.addEventListener('click', () => {
    console.log("coucou");
    resetC();
})

draw.addEventListener('click', () => {
    couleur = boutonCouleur.value;
    console.log(couleur);
    
})

grid.addEventListener('click', (e) => {
 
    console.log(e);   
    for(let i = 0; i < TabDiv.length; i++){
        if (TabDiv[i] == e.target){
            e.target.style.background = couleur;
        }
    }
    
});
    







