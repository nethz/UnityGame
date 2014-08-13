#pragma strict

class BallTemp{
	private var view_:BallBind = null;
	private var object_:GameObject = null;
	function BallTemp(ballPrototype:GameObject){
		var gameObj = GameObject.FindGameObjectWithTag("Puzzle");
		
		this.object_ = GameObject.Instantiate(ballPrototype);
		this.object_.name = "Temp";
 		this.view_ = this.object_.GetComponent(BallBind);
		this.object_.transform.parent = gameObj.transform;
		 
		this.setPosition(Vector2(0,0));
		this.view_.setSize(Geek.Screen2Space(AutoSize.getInstance().getBallSize(), PuzzleCamera.instance().orthographicSize));
		this.view_.setVisible(true);
	}
	
	function setRotate(rotate:float){
		this.view_.setRotate(rotate);
	
	}
	function setPosition(position:Vector2){
		this.view_.setViewPosition(Geek.Coordinate(position, this.object_.transform.parent, PuzzleCamera.instance().orthographicSize));
	}
	
	function setType(t:Geek.MagicType){
		this.view_.setType(t);
	
	}
	function release(){
		this.view_.setVisible(false);
		GameObject.DestroyObject(this.object_);
	}
	function setVisible(v:boolean){
		this.view_.setVisible(v);
	}

};