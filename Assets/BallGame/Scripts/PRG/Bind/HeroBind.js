#pragma strict
private var hitBind_:HitBind = null;
private var ex_:exSprite = null;
private var animation_:exSpriteAnimation = null;
function Start () {
  
	this.hitBind_ = this.GetComponentInChildren(HitBind) as HitBind;
	this.animation_ = this.GetComponentInChildren(exSpriteAnimation) as exSpriteAnimation;
	
	
	this.hideChant();
	this.ex_ = GetComponent("exSprite") as exSprite;
	
}
function animationTask(){
	
}
function playAnimation(animationName:String){
	this.animation_.Play(animationName);
}
function stopAnimation(){
	this.animation_.Stop();
}
function PlayAnimationClip(o){
}
function Update() {
	
}
function setChantText(text:String){
	hitBind_.setText(text);
}
function showChant(){
	hitBind_.show();

}
function hideChant(){
	hitBind_.hide();

}
