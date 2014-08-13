#pragma strict

class EZBallTemp{
	private var view_:EZBallView= null;
	private var object_:GameObject = null;
	function EZBallTemp(parent:Transform, ballPrototype:GameObject){
		
		this.object_= GameObject.Instantiate(ballPrototype);
		this.object_.name = "BallTemp";
		this.view_ = this.object_.GetComponent.<EZBallView>(); 
		this.object_.transform.parent = parent;
		this.object_.transform.localScale = ballPrototype.transform.localScale; 
		this.view_.setLayer(32);
		this.object_.transform.localPosition = Vector3(0, 0, 0); 
		var from:EZBallView = ballPrototype.GetComponent.<EZBallView>(); 
		this.view_.magicType = from.magicType;
		this.view_.setState(from.getState());
	}
	
	function setRotate(rotate:float){
		//this.view_.setRotate(rotate);
	
	} 
	
	function getCoordinate(position:Vector2):Vector2 {
		var ret:Vector2 = new Vector2(position.x*98.5 + 50, position.y*(98.5) + 50);
		return ret;
	
	}
	function setPosition_(position:Vector3){
		this.view_.setPosition(getCoordinate(position));
	}
	
	function setType(t:Geek.MagicType){
	//	this.view_.setType(t);
	
	}
	function release(){
		//this.view_.setVisible(false);
		GameObject.DestroyObject(this.object_);
	}
	function setVisible(v:boolean){
		//this.view_.setVisible(v);
	}

};
