#pragma strict

public var horizon:float = 0;
private var ex_:exSprite = null;
public var object_:GameObject = null;
function Start () {
	this.ex_ = GetComponent("exSprite") as exSprite; 
	this.transform.localScale.y = object_.transform.lossyScale.y * 0.3;
	this.transform.localScale.x =  object_.transform.lossyScale.x;
	this.transform.localScale.z =  object_.transform.lossyScale.z ;
	var ab:AlphaBind = this.GetComponent(AlphaBind) as AlphaBind;
	ab.setAlpha(0.5);
	this.ex_.color.r = 0;
	this.ex_.color.g = 0;
	this.ex_.color.b = 0;
	this.ex_.VFlip();
}

function setAlpha(alpha:float){
	var ab:AlphaBind = this.GetComponent(AlphaBind) as AlphaBind;
	ab.setAlpha(alpha);
	

}
function Update () {

	//this.transform.position.y = horizon;
}