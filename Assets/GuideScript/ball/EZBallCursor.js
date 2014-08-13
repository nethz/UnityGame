#pragma strict

class EZBallCursor extends MonoBehaviour{
	private var view_:EZBallView = null;
	private var object_:GameObject = null; 
	private var position_:Vector3 = Vector3.zero;
	function locked(parent:Transform, ballPrototype:GameObject){
		this.object_= GameObject.Instantiate(ballPrototype);
		this.object_.name = "BallCursor";
		this.view_ = this.object_.GetComponent.<EZBallView>();
		var from:EZBallView = ballPrototype.GetComponent.<EZBallView>();
		this.object_.transform.parent = parent;
		this.object_.transform.localScale = ballPrototype.transform.localScale; 
		this.view_.setLayer(3);
		this.view_.magicType = from.magicType;
		this.view_.setAlpha(0.7);
		this.view_.setState(from.getState());
		this.object_.transform.localPosition = Vector3(0, 0, -1);
	}
	
	function setPosition(position:Vector2){
		position_ =  Vector3(position.x, position.y, -1);
		object_.transform.position = position_;
	}
	
	function setFlash(flash:boolean){
		this.view_.setFlash(flash);
		object_.transform.position = position_;
	}
	
	function unlock(){
		GameObject.DestroyObject(this.object_);
	
	}
}
