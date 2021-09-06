var canvas,
    ctxc,
    tr = false,
    stLocatie,
    captura,
    selectie,
    forma;
//variabile folosite

    function modificareCuloareFundal() { 
        ctxc.save();     //salvează starea curentă din canvas 
        ctxc.fillStyle = document.getElementById("culoareGeFundal").value;
        //se preia culoarea
        ctxc.fillRect(0, 0, canvas.width, canvas.height); 
        //se pune culoarea pe dimensiunea canvasului
        ctxc.restore(); //restabilește cea mai recenta stare a canvas-ului
    }//functie pentru modificarea culorii de fundal

function salveaza(){ //salvarea canvas-ului in format png
   
        const imagineSalv =document.createElement("a"); //creare element html
        document.body.appendChild(imagineSalv); //adauga elementul ca ultimul nod din body
        imagineSalv.href=canvas.toDataURL(); //reprezentare a imaginii in formatul specificat (png)
        imagineSalv.download="canvas_imagine.png"; //numele imaginii salvate
        imagineSalv.click(); //eveniment de click
  
}

    culoareFundal = document.getElementById("culoareGeFundal");
    //preluare din fisierul de html a label ului pentru culoare de fundal
    canvas = document.getElementById("canvasGE"); //preluare canvas
    ctxc = canvas.getContext('2d'); 
    
    culoareFundal.addEventListener("input", modificareCuloareFundal, false);
    //apelare functie pentru modificarea culorii de fundal

    var selectareCul = document.getElementById("culoareGE"); 
    //preluare label pentru selectarea culorii formelor

    var grosimeG = document.getElementById("grosimeGE");
    //preluare label pentru selectarea grosimii liniei
    var valoareGrosime = document.getElementById("pxGrosime");
  //preluare label pentru afisarea valorii pentru grosimea liniei

//linie
     function desenCuLinie(pozitie) {
        selectareCul.addEventListener( 'change', event => {
            ctxc.strokeStyle = event.target.value; 
        } ); //apel pentru selectarea culorii desenului

        grosimeG.addEventListener( 'input', event => {
            const width = event.target.value;
            valoareGrosime.innerHTML = width;
            ctxc.lineWidth = width;
        } ); //apel pentru selectarea grosimii liniei
        //ctxc.lineWidth = 5;
        ctxc.lineCap = 'round'; //modalitatea de desenare a liniei
        ctxc.beginPath(); //se incepe un nou path
        ctxc.moveTo(stLocatie.x, stLocatie.y); //stabilire pozitia de desenare a liniei
         ctxc.lineTo(pozitie.x, pozitie.y); //desenarea liniei
        ctxc.stroke(); 
    }
var desenLinie={ // functii necesare miscarii mouse -ului

    trStop: function(event) { //
        tr=false;
        refaCaptura();
        var pozitie=coordonateCanvas(event);
       
        desenCuLinie(pozitie);
    
    },
    tragere: function tragere(event) {
        var pozitie;
        if(tr===true){
            refaCaptura();
            pozitie=coordonateCanvas(event);
            desenCuLinie(pozitie);
     
        }
     
     
     },
     trStart: function (event) {
        tr=true;
        stLocatie=coordonateCanvas(event);
    creeazaCaptura();
    }
    //evenimentele de miscare a mouse-ului pe ecran

}

function initializareComponenteLinie() {
        
    canvas = document.getElementById("canvasGE");
    ctxc = canvas.getContext('2d');
    canvas.onmousedown=desenLinie.trStart;
    canvas.onmousemove=desenLinie.tragere;
    canvas.onmouseup=desenLinie.trStop;
    //functia pentru desenarea liniei folosind metodelel de mai sus
}


//cerc
function desenCuCerc(pozitie) {
   // ctxc.strokeStyle = 
   selectareCul.addEventListener( 'change', event => {
        ctxc.strokeStyle = event.target.value; 
    } ); //selectare culoare in cazul formei goale pe interior
    //ctxc.fillStyle = 
    selectareCul.addEventListener( 'change', event => {
        ctxc.fillStyle = event.target.value; 
    } ); //selectare culoare in cazul formei pline pe interior
    ctxc.lineWidth = 4;
    ctxc.lineCap = 'round';

    var radius = Math.sqrt(Math.pow((stLocatie.x - pozitie.x), 2) +Math.pow((stLocatie.y - pozitie.y), 2));
    ctxc.beginPath();
    ctxc.arc(stLocatie.x, stLocatie.y, radius, 0, 2 * Math.PI, false);

    if(selectie.checked){
        ctxc.fill();
    }else{
        ctxc.stroke();
    } //in functie de situatia aleasa, forma va fi plina sau goala

}

var desenCerc={ //evenimentele de miscare a mouse-ului pe ecran

    trStop: function(event) {
        tr=false;
        refaCaptura();
        var pozitie=coordonateCanvas(event);
        desenCuCerc(pozitie);
       
    
    },
    tragere: function tragere(event) {
        var pozitie;
        if(tr===true){
            refaCaptura();
            pozitie=coordonateCanvas(event);
            desenCuCerc(pozitie);
            
            
        }
     
     
     },
     trStart: function (event) {
        tr=true;
        stLocatie=coordonateCanvas(event);
    creeazaCaptura();
    }

}

function initializareComponenteCerc() {
        
    canvas = document.getElementById("canvasGE");
    ctxc = canvas.getContext('2d');
    selectie=document.getElementById("f");


    canvas.onmousedown=desenCerc.trStart;
   canvas.onmousemove=desenCerc.tragere;
   canvas.onmouseup=desenCerc.trStop;
   
}


//desen Elipsa

function desenCuElipsa(pozitie) {
    // ctxc.strokeStyle = 
    selectareCul.addEventListener( 'change', event => {
         ctxc.strokeStyle = event.target.value; 
     } ); //selectare culoare in cazul formei goale pe interior
     //ctxc.fillStyle = 
     selectareCul.addEventListener( 'change', event => {
         ctxc.fillStyle = event.target.value; 
     } ); //selectare culoare in cazul formei pline pe interior
 
 
    ctxc.beginPath(); // //se incepe un nou path
    scx=pozitie.x-stLocatie.x;
    scy=pozitie.y-stLocatie.y;
    ctxc.save(); //salvare stare curenta a canvas-ului
    ctxc.scale(scx, scy); //adaugă o transformare de scalare la pixelii din canvas orizontal(scx) și vertical(scy).
    cenX=(stLocatie.x/scx)+1;
    cenY=(stLocatie.y/scy)+1;
    ctxc.arc(cenX, cenY,1,0,2 * Math.PI)
   
     ctxc.restore();
     ctxc.stroke();

 
     if(selectie.checked){
         ctxc.fill();
     }else{
         ctxc.stroke();
     } //in functie de situatia aleasa, forma va fi plina sau goala
 
 }
 
 var desenElipsa={ //evenimentele de miscare a mouse-ului pe ecran
 
     trStop: function(event) {
         tr=false;
         refaCaptura();
         var pozitie=coordonateCanvas(event);
         desenCuElipsa(pozitie);
        
     
     },
     tragere: function tragere(event) {
         var pozitie;
         if(tr===true){
             refaCaptura();
             pozitie=coordonateCanvas(event);
             desenCuElipsa(pozitie);
             
             
         }
      
      
      },
      trStart: function (event) {
         tr=true;
         stLocatie=coordonateCanvas(event);
     creeazaCaptura();
     }
 
 }
 
 function initializareComponenteElipsa() {
         
     canvas = document.getElementById("canvasGE");
     ctxc = canvas.getContext('2d');
     selectie=document.getElementById("f");
 
 
     canvas.onmousedown=desenElipsa.trStart;
    canvas.onmousemove=desenElipsa.tragere;
    canvas.onmouseup=desenElipsa.trStop;
    
 }







//desen poligon
function desenCuPoligon(pozitie, colturi, unghi) {
  //  ctxc.strokeStyle = 'yellow';
  //  ctxc.fillStyle = 'red';
  selectareCul.addEventListener( 'change', event => {
    ctxc.strokeStyle = event.target.value; 
} );
//ctxc.fillStyle = 
selectareCul.addEventListener( 'change', event => {
    ctxc.fillStyle = event.target.value; 
} );
    ctxc.lineWidth = 4;
    ctxc.lineCap = 'round';

    var coordonatePol = [],
        rDius = Math.sqrt(Math.pow(( stLocatie.x - pozitie.x), 2) + Math.pow(( stLocatie.y - pozitie.y), 2)),
        index = 0;

    for (index = 0; index < colturi; index++) {
        coordonatePol.push({x:  stLocatie.x + rDius * Math.cos(unghi), y:  stLocatie.y - rDius * Math.sin(unghi)});
        unghi += (2 * Math.PI) / colturi;
    }

    ctxc.beginPath();
    ctxc.moveTo(coordonatePol[0].x, coordonatePol[0].y);
    for (index = 1; index < colturi; index++) {
        ctxc.lineTo(coordonatePol[index].x, coordonatePol[index].y);
    }

    ctxc.closePath();
    

    if (selectie.checked) {
        ctxc.fill();
    } else {
        ctxc.stroke();
    }

    console.log("hai");

}

var desenPoligon={
    trStop: function(event) {
        tr=false;
        refaCaptura();
        var pozitie=coordonateCanvas(event);
        desenCuPoligon(pozitie, 8, Math.PI/4);
       
    
    },
    tragere: function tragere(event) {
        var pozitie;
        if(tr===true){
            refaCaptura();
            pozitie=coordonateCanvas(event);
            desenCuPoligon(pozitie, 8, Math.PI/4);
            
            
        }
     
     
     },
     trStart: function (event) {
        tr=true;
        stLocatie=coordonateCanvas(event);
    creeazaCaptura();
    }

}

function initializareComponentePoligon() {
        
    canvas = document.getElementById("canvasGE");
    ctxc = canvas.getContext('2d');
    selectie=document.getElementById("f");


    canvas.onmousedown=desenPoligon.trStart;
   canvas.onmousemove=desenPoligon.tragere;
   canvas.onmouseup=desenPoligon.trStop;
   
}

//desen patrat

function desenCuPatrat(pozitie){
    selectareCul.addEventListener( 'change', event => {
        ctxc.strokeStyle = event.target.value; 
    } );
    //ctxc.fillStyle = 
    selectareCul.addEventListener( 'change', event => {
        ctxc.fillStyle = event.target.value; 
    } );
  
    ctxc.lineWidth = 5;
    //ctxc.lineCap = 'round';

    ctxc.beginPath();            
    ctxc.rect(stLocatie.x, stLocatie.y, pozitie.x, pozitie.y);
    
    if(selectie.checked){
        ctxc.fill();
    }else{
        ctxc.stroke();
    }
}

var desenPatrat={
    trStop: function(event) {
        tr=false;
        refaCaptura();
        var pozitie=coordonateCanvas(event);
        desenCuPatrat(pozitie);
       
    
    },
    tragere: function tragere(event) {
        var pozitie;
        if(tr===true){
            refaCaptura();
            pozitie=coordonateCanvas(event);
            desenCuPatrat(pozitie);
            
            
        }
     
     
     },
     trStart: function (event) {
        tr=true;
        stLocatie=coordonateCanvas(event);

    creeazaCaptura();
    }

}


function initializareComponentePatrat() {
        
    canvas = document.getElementById("canvasGE");
    ctxc = canvas.getContext('2d');
    selectie=document.getElementById("f");


    canvas.onmousedown=desenPatrat.trStart;
   canvas.onmousemove=desenPatrat.tragere;
   canvas.onmouseup=desenPatrat.trStop;
   
}


    function coordonateCanvas(event) {
        var gbcr = canvas.getBoundingClientRect(); //dimensiunea elementului
        // și poziția sa în raport cu fereastra de vizualizare
    return{
        x: event.clientX -gbcr.top,
        y: event.clientY - gbcr.top
          }
     
     }//functie care preia coordonatele mouse-ului pe canvas
    
    function creeazaCaptura() {
        captura = ctxc.getImageData(0, 0, canvas.width, canvas.height);
    }//functie pentru recuperarea desenului 
    
    function refaCaptura() {
        ctxc.putImageData(captura, 0, 0); //deseneaza datele anterioare
    }

