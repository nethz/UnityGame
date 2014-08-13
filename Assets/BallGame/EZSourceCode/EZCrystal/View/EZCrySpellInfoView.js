#pragma strict

class EZCrySpellInfoView extends MonoBehaviour{
  
	public var _description:EZSpellDescription;
	public var _icon:UISprite;
	public var _level:UILabel;
	public var _name:UILabel;
	//public var _back:UISprite;
	//public var _lustre:UISprite;
	//public var _side:UISprite;
	//public var _text:EZCrySpellInfoTextView = null;
	public var _spellName:String[];
	private var open_:boolean = false;
	private var lv_:int = -1;
	private var id_:int = -1;
	private var data_:JsonData.MagicBall = null;
	public function setup(data:JsonData.MagicBall){
		data_ = data;
		//_text.setup(data.cryBag.mp, data.cryBag.mpMax, data.cryBag.addMpMax, data.cryBag.resetTime);
		refresh();
	}
	public function set id(value:int){
		this.id_ = value;
		Debug.Log("id!" + id_);
		_description.id = this.id_;
		refresh();
	}
	public function set icon(value:String){
		_icon.spriteName = value;
	}
	private function refreshName(){
		if(open_){
		 	if(id_ >= 0 &&  id_ < _spellName.Length){
		 		_name.text = _spellName[id_];
		 	}
		
			_name.enabled = true;		
		}else{
			_name.enabled = false;	
		}
	}
	private function refresh(){
		if(open_){
			_icon.enabled = true;
			_level.text = (lv_ +1).ToString();
			_level.enabled = true;
			//_back.enabled = true;
			//_lustre.enabled = true;
			//_side.enabled = true;
		}else{
			_icon.enabled = false;
			_level.enabled = false;	
			//_back.enabled = false;
			//_lustre.enabled = false;
			//_side.enabled = false;
		}
		refreshName();
	}
	public function open(){
		this.open_ = true;
		//_text.open();
		
		_description.open();
		refresh();
	}
	public function set lv(value:int){
		this.lv_ = value;
		_description.lv = this.lv_;
		//_description.lv = this.lv_;
		refresh();
	}
	public function close(){
		this.open_ = false;
		//_text.close();
		_description.close();
		refresh();
	}
}