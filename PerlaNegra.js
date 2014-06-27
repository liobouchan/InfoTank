  //Metodo inicial el cual es invocado una sola vez al iniciar el juego
    function init(tank){
        //Asigna el nombre del tanque
        tank.setName("Perla Negra");
    }

  //Regresa el tanque (TankInfo) más cercano
    function getNearestTank(base){

      var tanks = base.getTanksInfo().iterator();
      var tank = null;
      var dis;

      while (tanks.hasNext()){
        var aux = tanks.next();
        var d = getDist(base.getX(),base.getY(),aux.getX(),aux.getY());
        if (d < dis || tank==null){
          tank = aux;
          dis = d;
        }
      }
      return tank;
    }

  //Regresa la distancia entre dos puntos
    function getDist(x1, y1, x2, y2){
      var a = y2 - y1;
      var b = x2 - x1;
      return Math.sqrt((a * a) + (b * b));
    }

  //Regresa el angulo entre dos puntos
    function getAngle(x1, y1, x2, y2){
      if (x1 <= x2){
        return Math.atan(- (y2 - y1) / (x2 - x1)) * TO_GRAD;
      }else{
        return (Math.atan(- (y2 - y1) / (x2 - x1)) + Math.PI) * TO_GRAD;
      }
    }

  //Metodo de procesamiento del juego el cual es invocado cada 20 milisegundos
    function move(tank){

      //Se mueve una posición a adelante
      if(!tank.moveForward()){//si no pudo moverse (llego a una esquina)            
        //Cambia dirección en ángulo aleatorio
        tank.setTankDirection(Math.random() * 360);
        //Si hay teleportaciones disponibles, inicia teleportación...
        if(tank.canFireTeleport())tank.fireTeleport(Math.random() * tank.getBattlefieldWidth(), Math.random() * tank.getBattlefieldHeight());
      }

      //Si tiene balas dispara en un ángulo aleatorio 
      if(tank.canFireBullet())tank.fireBullet(Math.random() * 360);

      //Si tiene misiles dispara en ángulo y distancia aleatoria 
      if(tank.canFireMissile())tank.fireMissile(Math.random() * 360,Math.random() * tank.getBattlefieldHeight());

      //Si tiene minas disponibles dispara una mina en la posición actual 
      if(tank.canFireMine())tank.fireMine();

      //Si tiene campos de fuerza disponibles dispara un campo de fuerza
      if(tank.canFireShield())tank.fireShield();

      //Disparar pulso electromagnético
      if(tank.canFireEmp())tank.fireEmp(10);
    }