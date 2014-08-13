#pragma strict

class EZQuestClass extends MonoBehaviour{
	
	public var _card:UISprite = null;
	class Item{
		var key:String;
		var val:String;
	}
	public var _list:String[] = null;
	public function close(){
		_card.enabled = false;
	}
	public function open(){
		_card.enabled = true;
	}
	
	public function text(cls:String):String{
		
	}
}