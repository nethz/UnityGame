#pragma strict

class BallClone{
	private var view_:BallBind = null;
	private var object_:GameObject = null;
	function BallClone(ballPrototype:GameObject){
		var gameObj = GameObject.FindGameObjectWithTag("Puzzle");
		
		this.object_ = GameObject.Instantiate(ballPrototype);
		this.object_.name = "BallCursor";
		this.view_ = this.object_.GetComponent(BallBind);
		this.object_.transform.parent = gameObj.transform;
		this.setPosition(Vector2(0,0));
		this.view_.setSize(Geek.Screen2Space(AutoSize.getInstance().getBallSize(), PuzzleCamera.instance().orthographicSize));
		this.view_.setLocking(true);
		this.view_.setLayer(1);
	}
	function setPosition(position:Vector2){
		this.view_.setViewPosition(Geek.Coordinate(Vector2(position.x - 0.5, position.y - 0.5), this.object_.transform.parent, PuzzleCamera.instance().orthographicSize)); 
	}
	
	function setFlash(flash:boolean){
		this.view_.setFlash(flash);
		
	}
	function setRotate(rotate:float){
		this.view_.setRotate(rotate);
	}
	function setType(t:Geek.MagicType){
		this.view_.setType(t);
	}
	
	function release(){
		this.view_.setVisible(false); 
		GameObject.DestroyObject(this.object_ ); 
		this.object_ = null;
	//	DataCenter.getInstance().destroy(this.object_);
	}

};