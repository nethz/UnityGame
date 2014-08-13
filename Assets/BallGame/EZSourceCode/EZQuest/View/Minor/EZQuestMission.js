#pragma strict

class EZQuestMission extends MonoBehaviour{
	
	public var _scene:UISprite = null;
	class Item{
		var key:String;
		var val:String;
	}
	public var _list:Item[] = null;
	public function close(){
		_scene.enabled = false;
	}
	public function open(){
		_scene.enabled = true;
	}
	public function setScene(scene:String){
		for(var i:int = 0; i< _list.Length; ++i){
			if(_list[i].key == scene.ToLower()){
				_scene.spriteName = _list[i].val;
				_scene.MakePixelPerfect();
			}
		}
	}
}