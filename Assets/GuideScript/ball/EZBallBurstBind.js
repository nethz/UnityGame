#pragma strict

class EZBallBurstBind  extends MonoBehaviour{
	private var type_:Geek.MagicType = Geek.MagicType.None;
	function Start () {
		this.refreshType();
	}
	function burst(){
	}
	
	function setColor(r:float, g:float, b:float){
	}
	function setType(type:Geek.MagicType){
		this.type_ = type;
		this.refreshType();
	
	}
	function animationOver(name:String){
	}

	
	function refreshType(){
		
	}

}
