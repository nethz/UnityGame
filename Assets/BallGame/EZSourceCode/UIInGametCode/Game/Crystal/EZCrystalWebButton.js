#pragma strict
/*
class EZTaskCloseable extends Task{
	public var close:Function = null;

}*/
class EZCrystalWebButton extends MonoBehaviour{
	public var filled_:boolean = false;
	public var isActive_:boolean = false;
	
	
	public var _box:BoxCollider = null;
	public function Awake(){
		
		refresh();
	}
	public function set filled(value:boolean){
		filled_ = value;
		refresh();
	}
	
	public function set isActive(value:boolean){
		isActive_ = value;
		refresh();
		
	}
	private function refresh(){
		if(filled_ && isActive_){
			_box.enabled = true;
		
		}else{
		
			_box.enabled = false;
		}
	
	}
}