function pala(x, y, h){
    this.ctx = null;
    this.x_ini = x;
    this.y_ini = y;
    this.fh = h;
    this.width = 10;
    this.height = 40;
    this.vy = 0;
    this.speed = 3;

    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.update = function() {
        this.y += this.vy*this.speed;
        if (this.y > this.fh - this.height){
            this.y = this.fh - this.height;
        } else if (this.y < 0) {
            this.y = 0;
        }
    }

    this.reset = function() {
        this.y = this.y_ini;
        this.x = this.x_ini;
    };
}
function campo (w, h){
    this.ctx = null;
    this.width = w;
    this.height = h;
    this.points1 = 0;
    this.points2 = 0;

    this.init = function(ctx) {
        this.ctx = ctx;
    };

    this.draw = function(){
        this.ctx.beginPath();
        //color de la linea que divide el campo
        this.ctx.strokeStyle = 'blue';
        //hace que la raya sea rayada
        this.ctx.setLineDash([9, 9]);
        //move to y line to me permiten colocar la linea centrada, si cambio
        //sus parametros la linea se mueve
        this.ctx.moveTo(this.width/2,0);
        this.ctx.lineTo(this.width/2, this.height)
        //stroke es para finalmente dibujarla, sin esa function no se dibuja nada
        this.ctx.stroke();
        //este es el tipo de letra del marcador, tamaño y el color
        this.ctx.font = '90px monospace';
        this.ctx.fillStyle = 'grey';
        //MARCADOR,coordenadas donde se coloca el marcador para P1 y P2
        this.ctx.fillText(this.points1, 195, 70);
        this.ctx.fillText(this.points2, 340, 70);
        //escribe jugador 1 y 2 y le cambio el tamaño de la fuente
        this.ctx.font = '16px monospace';
        this.ctx.fillText('PLAYER_1', 20, 70);
        this.ctx.fillText('PLAYER_2', 480, 70);

    };

    this.reset = function(){
        this.points1 = 0;
        this.points2 = 0;
    };
}
function ball(h, snd){
    this.ctx = null;
    this.fh = h;
    this.x_ini = 50;
    this.y_ini = 50;
    //tamaño de la bola
    this.width = 9;
    this.height = 9;
    this.x = 0;
    this.y = 0;
    this.vx = 4;
    this.vy = 1;

    this.init = function(ctx) {
        this.ctx = ctx;
        this.reset();
    };

    this.draw = function () {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    };

    this.update = function () {
        this.x += this.vx*this.speed;
        this.y += this.vy*this.speed;
        if (this.y > this.fh - this.height || this.y < this.height){
            //snd.play();
            this.vy = -this.vy;
        }
    };

    this.reset = function() {
        this.x = this.x_ini;
        this.y = this.y_ini;
        //este if significa que cuando gana el jugador la direccion
        //de la bola cambie, ya que el saque ahora es desde el otro lado
        if (this.x_ini == 549) {
          this.vx *= -1 ;
        }else if (this.x_ini == 51) {
          this.vx *= -1 ;
        }
    };
}
//me creo la function de mover palas
function mover_palas(pala1, pala2){
  document.onkeydown = function (ev) {
    switch (ev.keyCode) {
      case 38: // Up
        pala2.vy = -1;
        break;
      case 40: // Down
        pala2.vy = 1;
        break;
      case 65: // a
        pala1.vy = -1;
        break;
      case 88: // x
        pala1.vy = 1;
        break;
   }
   document.onkeyup = function (ev) {
     pala1.vy = 0;
     pala2.vy = 0;
   }
  }
}
function collision(pala1, pala2, bola){
    if (bola.x <= (pala1.x + pala1.width) && bola.x >= pala1.x){
        if (bola.y >= pala1.y && bola.y <= (pala1.y + pala1.height)){
            //snd.play();
            //el menos significa que la bola a impactado en la pala y cambia
            //el sentido de la bola
            bola.vx = -bola.vx;
            bola.vy =  Math.floor(Math.random() * (-4 - 4 + 1) + 4);
        };
    };

    if ((bola.x + bola.width) >= pala2.x && (bola.x + bola.width) <= (pala2.x + pala2.width)){
        if ((bola.y + bola.height) <= (pala2.y + pala2.height) && (bola.y + bola.height) >= pala2.y){
            //snd.play();
            //el menos cambia el sentido de la bola
            bola.vx = -bola.vx;
            bola.vy =  Math.floor(Math.random() * (-4 - 4 + 1) + 4);
        };
    };
}

//funcion de la bola falsa, en main estan en comentarios
function ball_fake(w, h){
  this.ctx = null;
  this.fh = h;
  this.fw = w;
  this.x_ini = 50;
  this.y_ini = 20;
  this.width = 9;
  this.height = 9;
  this.x = 0;
  this.y = 0;
  this.vx = 8;
  this.vy = 1;


  this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();
  };

  this.draw = function () {
    console.log('la bola se dibuja');
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
  };

  this.update = function () {
    console.log('la bola se mueve');
      this.x += this.vx*this.speed;
      this.y += this.vy*this.speed;
      this.update = function () {
          this.x += this.vx*this.speed;
          this.y += this.vy*this.speed;
          console.log('posicion x',this.x);
          if (this.y > this.fh - this.height || this.y < this.height){
              //snd.play();
              this.vy = -this.vy;

          }else if (this.x > this.fw - this.width || this.x < this.width) {
            this.vx = -this.vx;
          }
    };
  }

  this.reset = function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
      //este if significa que cuando gana el jugador la direccion
      //de la bola cambie, ya que el saque ahora es desde el otro lado
      if (this.x_ini == 549) {
        this.vx *= -1 ;
      }else if (this.x_ini == 51) {
        this.vx *= -1 ;
      }
  };
}

function main(){
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var timer = null;
  var speed = 0;

  //me declaro las coordenadas x e y de cada una de las palas, asi metiendolas
  //en la function palas me podré crear dos palas, una para cada jugador, cont
  //una única funcion
  var pala1_x = 50;
  var pala1_y = 100;
  var pala2_x = 550;
  var pala2_y = 300;

  var bola = new ball(canvas.height, snd1);
  //var bola_fake = new ball_fake(canvas.width,canvas.height);

  //me creo la pala 1 y 2 con los datos anteriores y la funcion palas, las inicializo
  //y las dibujo, dependiendo del modo de juego la pala se movera sola o la moveremos
  //con el teclado
  var pala1 = new pala(pala1_x, pala1_y, canvas.height);
  var pala2 = new pala(pala2_x, pala2_y, canvas.height);
  var mode = document.getElementById('Mode');

  pala1.init(ctx);
  pala2.init(ctx);
  pala1.draw();
  pala2.draw();

  //ahora me creo el campo con una varibale llamando a la function campo me he creado
  //y le meto las coordenadas del canvas para que ese sea el tamaño del pong
  //lo dibujo y lo inicializo
  var campo_pong = new campo(canvas.width, canvas.height);
  campo_pong.init(ctx);
  campo_pong.draw();

  //este es el sonido cuando ...................
  var snd1 = new Audio('');

  //esta es mi bola creada con la funcion ball, le meto el ancho y el sonido
  //la inicializo y la dibujo

  bola.init(ctx);
  bola.draw();
  //dibujamos e inicializamos bola falsa
  //bola_fake.init(ctx);
  //bola_fake.draw();


  //creo variable del boton sacar y hago la funcion onclick, es decir, con esta
  //function detecta cuando en el boton hago click
  var sacar = document.getElementById('sacar');
  //hago la variable del boton reiniciar para cuando lo pinche todo vuelva
  //a la situacion inicial
  var reiniciar = document.getElementById('reiniciar');

  //me creo una funcion de resetar el juego para que el codigo no sea redundante
  function play_reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pala1.reset();
    pala2.reset();
    campo_pong.init(ctx);
    campo_pong.draw();
    pala1.draw();
    pala2.draw();
    if (bola.x < pala1_x) {
      bola.speed = 0;
      bola.x_ini = 51;
      campo_pong.points1 += 1;
      bola.reset();
    }else if (bola.x > pala2_x) {
      bola.speed = 0;
      bola.speed = 0;
      bola.x_ini = 549;
      campo_pong.points2 += 1;
      bola.reset();
    }
    bola.draw();
    //bola_fake.reset();
    //bola_fake.draw();
  }

  //si reinicio no funciona luego el sacar
  reiniciar.onclick = () => {
    bola.speed = 0;
    //bola_fake.speed = 0;
    bola.x_ini = 50;
    console.log('primera',bola.vx);
    //este if lo hacemos para que no me haga punto en el saque despues de darle
    //a reiniciar y habia perdido el jugador dos
    if (bola.vx < 0){
      console.log('entra en el if');
      bola.vx *= -1;
    }
    console.log(bola.vx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bola.reset();
    //bola_fake.reset();
    pala1.reset();
    pala2.reset();
    campo_pong.init(ctx);
    campo_pong.draw();
    pala1.draw();
    pala2.draw();
    campo_pong.draw();
    campo_pong.reset();
  }

  sacar.onclick = () => {
        var Level = document.querySelector('input[name="Level"]:checked').value;
        if (Level == "easy"){
          bola.speed = 1;
          //bola_fake.speed = 1;
          pala1.speed = 6;
          pala2.speed = 6;
        }else if (Level == "medium"){
          bola.speed = 3;
          //bola_fake.speed = 3;
          pala1.speed = 9;
          pala2.speed = 9;
        }else if (Level == "hard"){
          bola.speed = 6;
          //bola_fake.speed = 6;
          pala1.speed = 12;
          pala2.speed = 12;
        }else{
          pass;
        }
        if (!timer) {
                  timer = setInterval(()=>{
                    //movemos bola verdadera
                      bola.update();
                      //movemos bola falsa
                      //bola_fake.update();
                      pala1.update();
                      pala2.update();
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      campo_pong.init(ctx);
                      campo_pong.draw();
                      bola.draw();
                      //bola_fake.draw();
                      pala1.draw();
                      pala2.draw();

                      //muevo las palas llamando a la funcion mover_palas
                      mover_palas(pala1, pala2);
                      collision(pala1, pala2, bola);

                      //este condicional es para que me sume al marcador cada
                      //vez que la bola sobre pasa las palas
                    if (bola.x > canvas.width - bola.width){
                      //snd3.play();
                      play_reset();

                    }else if (bola.x < bola.width) {
                      //snd3.play();
                      play_reset();

                    }
                    if (campo_pong.points1 == 7 || campo_pong.points2 == 7) {
                      clearInterval(timer)
                      timer = null;
                      bola.speed = 0;
                      bola.x_ini = 50;
                      ctx.clearRect(0, 0, canvas.width, canvas.height);

                      if (campo_pong.points1 == 7) {
                        console.log('ganador1');
                        alert("THE PLAYER_1 IS WINNER");
                        bola.reset();
                        //bola_fake.reset();
                        pala1.reset();
                        pala2.reset();
                        campo_pong.reset();
                        pala1.draw();
                        pala2.draw();
                        bola.draw();
                        //bola_fake.draw();
                        campo_pong.draw();
                      }else if (campo_pong.points2 == 7) {
                        console.log('ganador2');
                        alert("THE PLAYER_2 IS WINNER");
                        bola.reset();
                        //bola_fake.reset();
                        pala1.reset();
                        pala2.reset();
                        campo_pong.reset();
                        pala1.draw();
                        pala2.draw();
                        bola.draw();
                        //bola_fake.draw();
                        campo_pong.draw();
                      }
                      }
                  },20);
              }
            }
  }
