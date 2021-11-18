
var x = 0;

function compteur() {
    x = parseInt(x) + 1;
    x = x.toString().padStart(4, "0");
    document.getElementById('nb').innerHTML = x;

}

function reset() {
    x = 0;
    x = x.toString().padStart(4, "0");
    document.getElementById('nb').innerHTML = x;

}




