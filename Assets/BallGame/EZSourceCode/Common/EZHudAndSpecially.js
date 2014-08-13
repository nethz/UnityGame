#pragma strict

class EZHudAndSpecially extends MonoBehaviour{
	public var _hasHud:boolean = true;
	public var _hasSpecially:boolean = true;
	public var _hasGhost:boolean = true;
	public var _box:BoxCollider = null;
	public var _offset:EZSpeciallyOffset = null;
	public var	_hud:GameObject = null;
	public var	_specially:GameObject = null;
	public var	_ghost:GameObject = null;
	public var _skeletal:EZSkeletal;
	private var hud_:EZHud = null;
	private var specially_:EZSpecially = null;
	private var ghost_:EZGhost = null;
	
	
	
	public function get hud():EZHud{
		return hud_;
	}
	public function get specially():EZSpecially{
		return specially_;
	}
	
	public function get ghost():EZGhost{
		return ghost_;
	}
	public function Awake(){
		if(_hasHud){
			var tUI:EZUI = _hud.GetComponent(EZUI) as EZUI;
			tUI._skeletal = this._skeletal;
			var hud:GameObject = GameObject.Instantiate(_hud);
			hud.transform.parent = this.transform;
			hud.name = "hud";
			hud.SetActive(true);
			hud_ = hud.GetComponent(EZHud) as EZHud;
		}
		if(_hasSpecially){
			var tSpecially:EZSpecially = _specially.GetComponent(EZSpecially) as EZSpecially;
			tSpecially._box = this._box;
			tSpecially._offset = this._offset;
			var specially:GameObject = GameObject.Instantiate(_specially);
			specially.transform.parent = this.transform;
			specially.name = "specially";
			specially.SetActive(true);
			specially_ = specially.GetComponent(EZSpecially) as EZSpecially;
		}
		if(_hasGhost){
		
		
			var tghost:EZGhost = _ghost.GetComponent(EZGhost) as EZGhost;
			tghost._box = this._box;
			
			var ghost:GameObject = GameObject.Instantiate(_ghost);
			ghost.transform.parent = this.transform;
			ghost.name = "ghost";
			ghost.SetActive(true);
			ghost_ = ghost.GetComponent(EZGhost) as EZGhost;
		}
		
		
	}
	public function OnDestroy(){
		//GameObject.DestroyObject(_hud);
		//GameObject.DestroyObject();
	}
}