#pragma strict

class MissionSwitchButton extends MonoBehaviour{
	//public var _boxBg:BoxCollider = null;
//	public var _normalBtn:UIImageButton = null;
	//public var _eliteBtn:UIImageButton = null;
	public var _sprite:UISprite = null;
	public var _normal:String = "";
	public var _hard:String = "";
	private var isElite_:boolean = false;
	
	public function activeNormal(){
		isElite_ = false;
		refresh();
	}
	
	public function activeElite(){
		isElite_ = true;
		refresh();
	}
	
	public function open(){

		this.gameObject.SetActive(true);
	}
	
	public function close(){
		this.gameObject.SetActive(false);
	}
	
	public function refresh(){
		if(isElite_){
			_sprite.spriteName = _normal;
		}else{
		
			_sprite.spriteName = _hard;
		}
	
	}
	public function OnClick(){
		var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
		if(isElite_){
			target.SendMessage("OnAction", "normal", SendMessageOptions.DontRequireReceiver);
		}else{
			target.SendMessage("OnAction", "elite", SendMessageOptions.DontRequireReceiver);
		}
	}
	
}