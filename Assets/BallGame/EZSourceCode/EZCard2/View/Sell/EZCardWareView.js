#pragma strict

class EZCardWareView extends MonoBehaviour{
	/*var _side:UISprite;
	var _magicType:UISprite;
	var _pet:UISprite;*/
	public var _core:EZCardCoreView = null;
	
	//var _box:BoxCollider = null;
	
	private var data_:EZCard = null;
	
	private var _target:GameObject = null;
	private var action_:String = "removeCard";
	
	function OnClick(){
		if(data_){
			_target.SendMessage(action_, data_, SendMessageOptions.DontRequireReceiver);
		}
	}

	public function Awake(){
		this.clear();
		_target = GameObject.FindGameObjectWithTag("Ctrl");
	}
	public function load(data:EZCard){
		data_ = data;
		if(data_){
			refresh();
		}else{
			clear();
		}
		
	}
	
	private function clear(){
	
	
		/*if(_side){
			_side.enabled = false;
		}
		if(_magicType){
			_magicType.enabled = false;
		}
		if(_pet){
			_pet.enabled = false;
		}*/
		_core.close();
	}
	
	private function refresh(){
		if(data_){
			/*if(_side){
				_side.color = Geek.GetQualityColor(data_.quality, 1, 1);
				_side.enabled = true;
			}
			if(_magicType){
				_magicType.color = Geek.GetColor(data_.magicType, 1, 1);
				_magicType.enabled = true;
			}
				
			if(_pet){
				_pet.enabled = true;
			}*/
			
			_core.setup(data_);
			_core.open();
			//_box.enabled = true;

		}
	}

	
	public function get data():EZCard{
		return this.data_;
	}
	
}