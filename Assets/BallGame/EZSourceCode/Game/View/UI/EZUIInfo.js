#pragma strict

class EZUIInfo extends MonoBehaviour{
	var _name:EZUIInfoName;
	var _attack:EZUIInfoMagicType2;
	//var _medical:EZUIInfoMagicType;
	var _affix:EZUIInfoAffix;
	var _text:EZUIInfoText;
	var _open:boolean = false;
	var _table:UITable;
	var _bind:EZUIInfoBindList;
	var _panels:UIPanel[];
	var _boxs:BoxCollider[];
	var _draggable:UIDraggablePanel;
	private var repositionNow_:boolean = false;
	private static var instance_:EZUIInfo = null;
	function Awake(){
		this.instance_ = this;
	}
	public function Update(){
		if(repositionNow_ && !_affix._table.repositionNow){
			repositionNow_ = false;
			_table.repositionNow = true;
		}
	
	}
	public static function GetInstance():EZUIInfo{
		return this.instance_;
	}
	public function setup(soul:EZSoul){
	
		_name.setup(soul);
		_attack.setup(soul.type);
		//_medical.setup(soul.type);
		var binds:List.<EZBindData> = EZBindHandler.GetList(soul);
		_bind.setup(binds);
		var pet:EZPetSoul = soul.gameObject.GetComponent(EZPetSoul) as EZPetSoul;
		if(pet){
			_affix.setup(pet.info);
		}else{
			_affix.setup(null);
		}
		
		var info:EZFoeInfo = soul.gameObject.GetComponent(EZFoeInfo) as EZFoeInfo;
		if(info){
			Debug.Log(info.info);
			_text.setup(info.info);
		}else{
			_text.setup("");
		}
		
		_draggable.ResetPosition();
		_table.repositionNow = true;
		repositionNow_ = true;
	}
	function Start(){
		if(_open){
			this.open();
		}else{
			this.close();
		}
	}
	
	function open(){
		for(var i:int =0; i<_panels.Length; ++i){
			_panels[i].enabled = true;
		}
		for(var j:int =0; j<_boxs.Length; ++j){
			_boxs[j].enabled = true;
		}
		_draggable.ResetPosition();
	}
	function close(){
		for(var i:int =0; i<_panels.Length; ++i){
			_panels[i].enabled = false;
		}
		for(var j:int =0; j<_boxs.Length; ++j){
			_boxs[j].enabled = false;
		}
	}
	
}