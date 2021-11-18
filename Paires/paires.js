//Affichage 6 image en paire   //
var paireimg = [1,2,3,1,2,3]

// random //
.map(melange => [melange,Math.random()])
.sort ((melange1,melange2) => melange1[1]-melange2[1])
.map(melange => melange[0])
console.log(paireimg);

var img = document.getElementsByTagName("img");
var score = document.getElementById("Score")
var comptescore = 0
var scoreaMax = 60

var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");

function btnClick1(){
    document.location.href="index.html";
}

function btnClick2(){
    document.location.href="index2.html";
}

//Recuperation images de fond //
for(let index=0; index<paireimg.length; index++){
img[index].srcimgfond = "Images/carte" + paireimg[index] + ".png"
}
    


//Fuction click //
var fonctionementdujeu =1;  
var image1;
var image2;

document.addEventListener("click", function(cliquer) {
//(cliquer.target.src = cliquer.target.srcimgfond) permet l'interaction entre image carte et image a trouver // 
switch(fonctionementdujeu){
case 1 ://Clique1//
if (cliquer.target.tagName == "IMG"){
    cliquer.target.src = cliquer.target.srcimgfond;
    fonctionementdujeu = 2 ;
    console.log("Clique 1 activer #choix image 1");
    image1 = cliquer.target
    
    
}
break;

case 2 ://Clique2//
if (cliquer.target.tagName == "IMG" && cliquer.target != image1){
    cliquer.target.src = cliquer.target.srcimgfond;
    fonctionementdujeu = 3;
    console.log("Clique 2 activer #choix image 2");
    image2 = cliquer.target

    fonctionementdujeu =1;
    score.textContent = comptescore;
    if (document.getElementsByTagName("img").length==0&& cliquer.target != image1){
    }

 

    setTimeout( function () {  //Comparaisons des images//
        if (image1.src == image2.src ){
            image1.style.opacity= 0
            image2.style.opacity= 0
            console.log(" meme paire")
            comptescore += 20
            score.textContent = comptescore;
            if(comptescore >= scoreaMax)
            score.textContent = "n\ Bien jouées, toutes les paires sont trouvées passer au niveau suivant."
            
            

          
    }
     else {
        image2.src = image1.src = "Images/dos_cartes.png"
         console.log("pas les meme paire")
         comptescore = Math.max(0, comptescore -0); 
         score.textContent = comptescore;
      
     }
   
    } , 1000 )
}
break;

}

});
