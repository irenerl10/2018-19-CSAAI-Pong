function main(){
  console.log("Pong: Main: Start!")
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");

  //-- Línea horizontal y vertical, unidas
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.strokeStyle = 'blue';

  //-- Cambiar el tamaño de la linea del trazo
  ctx.lineWidth = 4;

  // --Escribir puntuaciones
  ctx.font = "25px Arial";
  ctx.fillStyle = 'yellow'
  ctx.fillText("P1",250, 30);
  ctx.font = "25px Arial";
  ctx.fillStyle = 'yellow'
  ctx.fillText("P2", 320, 30);

  //-- Dibujar el trazo
  ctx.stroke()

  var pala1 = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 100,
    //-- Dimensiones de la Bola
    width: 10,
    height: 40,
    //-- Coornenadas
    x : 0,
    y : 100,
    //-- Contexto
    ctx: null,
    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar bola
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  var pala2 = {
    //-- Posición inicial de la pelota
    x_ini: 550,
    y_ini: 100,
    //-- Dimensiones de la Bola
    width: 10,
    height: 40,
    //-- Coornenadas
    x : 0,
    y : 100,
    //-- Contexto
    ctx: null,
    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar bola
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 50,
    //-- Dimensiones de la Bola
    width: 5,
    height: 5,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 4,
    vy : 1,
    //-- Contexto
    ctx: null,
    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    //-- Dibujar bola
    draw: function () {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },
    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Inicializar y pintar palas
  pala1.init(ctx);
  pala1.draw();
  pala2.init(ctx);
  pala2.draw();

  var step = new Number(document.getElementById("step").value);
  window.onkeydown = (e) => {
  //-- Eliminar el comportamiento por defecto de la tecla
    e.preventDefault();
    //-- Detectar si es la tecla Espacio
    switch (e.keyCode) {
      case 38: // Up
        pala2.y=-step;
        console.log(pala2.y);
        break;
      case 40: // Down
        pala2.y=pala2.y+step;
        console.log(pala2.y);
        break;
      case 65: // Up
        pala2.y=pala2.y-step;
        console.log(pala2.y);
        break;
      case 88: // Down
        pala2.y=pala2.y+step;
        console.log(pala2.y);
        break;
      }
      //¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿Por que no se mueven?????????????????????????
    pala1.draw();
    pala2.draw();
  }

  // --Dibujar bola e inicializar
  bola.init(ctx);
  bola.draw();

  //-- Crear timer para la animación inicialmente a null
  var timer = null;

  //-- Boton de sacar
  var sacar = document.getElementById('sacar')
  sacar.onclick = () => {

    if (!timer) {
      //-- Esto se ejecuta cada 20ms
      timer = setInterval(()=>{
      //-- Actualizar la bola
      bola.update();

      //-- Borrar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //-- Dibuar la bola
      bola.draw();

        //-- Si la bola llega a la parte derecha del canvas:
        //-- Terminar
        if (bola.x > canvas.width) {

          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;

          //-- Bola a su posicion inicial
          bola.reset();

          //-- Dibujar la bola en pos. inicial
          bola.draw();
        }
      },20); //-- timer
    }
  } //-- Fin onclick


  //-- Inicializar y pintar la bola
  bola.init(ctx);
  bola.draw();
  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;

  //-- Boton de salcar
  var sacar = document.getElementById('sacar')
  sacar.onclick = () => {

    if (!timer) {

      //-- Lanzar el timer. Su funcion de retrollamada la definimos
      //-- en su primer parámetro
      timer = setInterval(()=>{

        //-- Esto se ejecuta cada 20ms

        //-- Actualizar la bola
        bola.update();

        //-- Borrar el canvas
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        //-- Dibuar la bola
        bola.draw();

        //-- Si la bola llega a la parte derecha del canvas:
        //-- Terminar
        if (bola.x > canvas.width) {

          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;

          //-- Bola a su posicion inicial
          bola.reset();

          //-- Dibujar la bola en pos. inicial
          bola.draw();
        }
      },20); //-- timer
    }
  } //-- Fin onclick
}
