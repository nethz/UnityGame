#pragma strict

class EZCrystalInGameMove extends MonoBehaviour{
	public var _obj:GameObject;
	public var _leftPos:Vector3 = Vector3.zero;
	public var _righPost:Vector3 = Vector3.zero;
	public var _time:float;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	/*
	public function moveLeft(){
		GeekTweenPosition.Begin(_obj,_time,_leftPos); 
	}
	
	public function moveRight(){
		GeekTweenPosition.Begin(_obj,_time,_righPost); 
	}*/
	
}