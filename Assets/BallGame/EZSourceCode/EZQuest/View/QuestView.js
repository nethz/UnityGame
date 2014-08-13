#pragma strict

class QuestView extends MonoBehaviour{
	public var _main:QuestMainView = null;
	public var _minor:QuestMinorView = null;
	
	public function get main(){
		return _main;
	}
	
	public function get minor(){
		return _minor;
	}
		
}