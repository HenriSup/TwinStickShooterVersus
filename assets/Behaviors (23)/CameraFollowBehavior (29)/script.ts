class CameraFollowBehavior extends Sup.Behavior {
  private subject:Sup.Actor;
  private camera:Sup.Camera;
  
  awake() {
    this.camera=this.actor.camera;
    this.subject=Sup.getActor("Tank");
    
  }

  update() {
    let actualPosition = this.actor.getPosition();
    let subjectPosition = this.subject.getPosition();
    let lerp = 0.10;
    
    let newX = actualPosition.x- (actualPosition.x - (subjectPosition.x - this.camera.getViewport().width / 2)) *  lerp; 
    let newY = actualPosition.y- (actualPosition.y - (subjectPosition.y - this.camera.getViewport().height / 2)) *  lerp;
    
    this.actor.setPosition(newX,newY);
  }
}
Sup.registerBehavior(CameraFollowBehavior);
