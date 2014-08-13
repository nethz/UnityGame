#pragma strict

class EZDuplicateModel extends MonoBehaviour{
	public var _refresh:boolean = false;
	
	public function load(){
	
	}
	public function get refresh():boolean{
		return _refresh;
	}
	public function set refresh(value:boolean){
		this._refresh = value;
	}
	public function get ap():float{
		return 0.0f;
	}
	public function get allAp():float{
		return 1.0f;
	}
	
	public function get event():EZDuplicateListModel[]{
		return null;
	}
	public function get pvp():EZDuplicateListModel[]{
		return null;
	}
	public function get pve():EZDuplicateListModel[]{
		return null;
	}
	
	
	
	public function get levels():EZDuplicateLevelData[]{
		return null;
	}
	
}