  //Metodo inicial el cual es invocado una sola vez al iniciar el juego
  function init(tank){
      //Asigna el nombre del tanque
      tank.setName("Perla Negra");
      //Rotar el tanque
      tank.rotateTank(2.345);
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
  }