#pragma strict
function Start () {

} 

function Update () {

}
function hFLip(){
	
	var ex:exSprite = GetComponentInChildren(exSprite);
	ex.HFlip();

}

function setBodyAlpha(alpha:float){
	var ab:AlphaBind = GetComponentInChildren(AlphaBind);
	ab.setAlpha(alpha);

}
function setPowerAlpha(alpha:float){
	var text:TextBind = GetComponentInChildren(TextBind);
	text.setAlpha(alpha);
}
function setHorizon(horizon:float){
	//var clipping:Clipping = GetComponentInChildren(Clipping);
	//clipping.setHorizon(horizon);
}
function setPower(power:String){
	var text:TextBind = GetComponentInChildren(TextBind);
	text.setText(power);
}
function getPosition(){
	return this.transform.position;
}
function changePowerTask(power:int, fadein:float, fadeout:float){
	var text:TextBind = GetComponentInChildren(TextBind);
	return text.changeTask(power.ToString(), fadein, fadeout);

}

function animationTask(animBegin:String){
	var ab:AnimationBind = GetComponentInChildren(AnimationBind);
	return ab.animationTask(animBegin);

}
/*
function moveTask(begin:Vector3, end:Vector3, allTime:float){
	var task:Task = new Task();
	var time:float;
	task.init = function(){
		time = 0;
		this.transform.position = begin;
	};
	task.update = function(d:float){
		time += d;
		var s:float = time/allTime;
		this.transform.position = begin * (1-s) + end *s;
	};
	task.shutdown = function(){
		this.transform.position = end;
	};
	task.isOver = function(){ 
		return (time >= allTime);
	};
	return task;
}*/
function changeBodyAlphaTask(alphaIn:float, alphaOut:float, allTime:float)
{
	var ab:AlphaBind = GetComponentInChildren(AlphaBind);
	return ab.changeAlpha(alphaIn, alphaOut, allTime);

}


function changePowerAlphaTask(alphaIn:float, alphaOut:float, allTime:float)
{
	var text:TextBind = GetComponentInChildren(TextBind);
	return text.changeAlpha(alphaIn, alphaOut, allTime);
}

