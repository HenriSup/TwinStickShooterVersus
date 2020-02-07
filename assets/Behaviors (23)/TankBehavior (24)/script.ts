class TankBehavior extends Sup.Behavior {
    turretActor:Sup.Actor;
    turretSR:Sup.SpriteRenderer;
    baseSR:Sup.SpriteRenderer;
  
  awake() {
    this.turretActor = this.actor.getChild("Turret");
    this.turretSR = this.turretActor.spriteRenderer;
    this.baseSR= this.actor.getChild("Base").spriteRenderer;
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
    
    if (!rightStickIdle){
      this.turretActor.setEulerZ(lerpedAngle);
    }
  }
}
Sup.registerBehavior(TankBehavior);
