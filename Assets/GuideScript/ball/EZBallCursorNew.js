#pragma strict

class EZBallCursorNew extends MonoBehaviour{
	private var view_:EZBallView = null;
	private var object_:GameObject = null; 
	private var position_:Vector3 = Vector3.zero;
	private var prototype_:GameObject = null;
	function locked(parent:Transform, prototype:GameObject){
		prototype_ = prototype;
		this.object_= GameObject.Instantiate(prototype);
		this.object_.name = "BallCursor";
		this.view_ = this.object_.GetComponent.<EZBallView>();
		var from:EZBallView = prototype.GetComponent.<EZBallView>();
		this.object_.transform.parent = parent;
		this.object_.transform.localScale = prototype.transform.localScale; 
		this.view_.setLayer(3);
		this.view_.magicType = from.magicType;
		this.view_.setAlpha(0.7);
		this.view_.setState(from.getState());
		this.object_.transform.localPosition = Vector3(0, 0, 0);
	}
	function setPosition(position:Vector2){
		position_ =  Vector3(position.x, position.y, 0);
	
	}
	function Update(){
		if(prototype_!= null){
			var o:Vector3 = prototype_.transform.position;
			
			var width:float = position_.x - o.x;
			var height:float = position_.y - o.y;
			if(Mathf.Abs(width) > Mathf.Abs(height)){
				var r:float = Mathf.Abs(Mathf.Abs(width) - Mathf.Abs(height))/0.085f;
				object_.transform.position = new Vector3(position_.x * r + o.x * (1-r), o.y, position_.z);
			}else if(Mathf.Abs(width) < Mathf.Abs(height)){
				var r1:float = Mathf.Abs(Mathf.Abs(width) - Mathf.Abs(height))/0.085f;
				object_.transform.position = new Vector3(o.x, position_.y * r1 + o.y * (1-r1), position_.z);
			}else{
				object_.transform.position = o;
			}
		}
		
	}
	function setFlash(flash:boolean){
		this.view_.setFlash(flash);
		
	}
	
	function unlock(){
		prototype_ = null;
		GameObject.DestroyObject(this.object_);
	
	}
}
