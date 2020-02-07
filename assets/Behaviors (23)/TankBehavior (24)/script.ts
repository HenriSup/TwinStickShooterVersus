class TankBehavior extends Sup.Behavior {
    turretActor:Sup.Actor;
    turretSR:Sup.SpriteRenderer;
    baseSR:Sup.SpriteRenderer;

  
    private world:p2.World;
    private vehicle:p2.TopDownVehicle;
  
  awake() {
    this.turretActor = this.actor.getChild("Turret");
    this.turretSR = this.turretActor.spriteRenderer;
    this.baseSR= this.actor.getChild("Base").spriteRenderer;
    
    this.world = Sup.P2.getWorld();
    this.world.gravity= [0,0];
    
    this.vehicle = this.initCar(this.world);
  }

  update() {
    let rightStickX = Sup.Input.getGamepadAxisValue(0,2);
    let rightStickY = -Sup.Input.getGamepadAxisValue(0,3);
    let rightStickIdle = (Math.abs(rightStickX) < 0.1) && (Math.abs(rightStickY) < 0.1);
    
    let actualAngle = this.turretActor.getEulerZ();
    let anglePad = Math.atan2(rightStickY,rightStickX);
    let anglePadDegre = anglePad * 180.0 / Math.PI;
    if( anglePadDegre < 0 ) anglePadDegre += 360.0;
    let lerpedAngle = Sup.Math.lerpAngle(actualAngle,anglePad,0.2);
 
    
    this.move();
    
    if (!rightStickIdle){
      this.turretActor.setEulerZ(lerpedAngle);
    }
  }
  
  move() {
    //faire bouger le tank en fonction de x et y

    let forward = Sup.Input.isKeyDown("Z");
    let backward = Sup.Input.isKeyDown("S");
    let left = Sup.Input.isKeyDown("Q");
    let right = Sup.Input.isKeyDown("D");
    
    this.actor.getChild("Printer").textRenderer.setText("Z:"+forward + "\nS:"+backward+"\nQ:"+left+"\nD:"+right);
    
    
    
    var maxSteer = Math.PI / 4;
    
    this.vehicle.wheels[0].steerValue = maxSteer * (Number(left) - Number(right));

    
    // Engine force forward
    this.vehicle.wheels[1].engineForce = Number(forward) * 5;
    
    this.vehicle.wheels[1].setBrakeForce(0);
    if(backward){
        if(this.vehicle.wheels[1].getSpeed() > 0.1){
            // Moving forward - add some brake force to slow down
            this.vehicle.wheels[1].setBrakeForce(8);
        } else {
            // Moving backwards - reverse the engine force
            this.vehicle.wheels[1].setBrakeForce(0);
            this.vehicle.wheels[1].engineForce = -4;
        }
    }
  }
  
  private initCar(world):p2.TopDownVehicle{
    let chassisBody = this.actor.p2Body.body;
    world.addBody(chassisBody);
    
    var car = new p2.TopDownVehicle(chassisBody);
    
    var frontWheel = car.addWheel({
      localPosition: [0,2.25] // frontWheel
    });
    frontWheel.setSideFriction(15);

    var backWheel = car.addWheel({
      localPosition: [0, -2.25] // backWheel
    });
    backWheel.setSideFriction(10);
    
    car.addToWorld(this.world);
    return car;
  }
}
Sup.registerBehavior(TankBehavior);
