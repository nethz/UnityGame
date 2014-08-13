#pragma strict

class EZCardCoreView extends MonoBehaviour{
	public var _quality:UISprite = null;
	public var _type:UISprite = null;
	public var _pet:UISprite = null;
	public var _side:UISprite = null;
	public var _box:Collider = null;
	private var hasData_:boolean = false;
	private var isOpen_:boolean = false;
	private var isSelected_:boolean = false;
	private var _data:EZCardCoreData = null;
	/*public function Awake(){
		isOpen_ = false;
		hasData_ = false;
		isSelected_ = false;
		refresh();
	}*/
	public function refresh(){
		if(isOpen_ && hasData_){
			_quality.enabled = true;
			_type.enabled = true;
			_pet.enabled = true;
			_side.enabled = true;
			if(_box){
				_box.enabled = !isSelected_;
			}
			/*if(isSelected_){
				_quality.color.a = 0.5f;
				_type.color.a  = 0.5f;
				_pet.color.a = 0.5f;
				_side.color.a = 0.5f;
			}else{
				_quality.color.a = 1f;
				_type.color.a = 1f;
				_pet.color.a = 1f;
				_side.color.a = 1f;
			}*/
		}else{
			if(_box){
				_box.enabled = false;
			}
			_quality.enabled = false;
			_type.enabled = false;
			_pet.enabled = false;
			_side.enabled = false;
			
		}
	}

	public function set quality(value:Color){
		_quality.color = value;
	}
	
	public function set type(value:Color){
		_type.color = value;
	}
		
	public function set pet(value:String){
		_pet.spriteName = value;
		_pet.MakePixelPerfect();
		_side.spriteName = value;
		_side.MakePixelPerfect();
	}
	
	public function open(){
		isOpen_= true;
		refresh();
	}
	
	public function close(){
		
		isOpen_= false;
		refresh();
	}
	
	public function selected(isSelected:boolean){
		isSelected_= isSelected;
		refresh();
		
	}
	public function setupCore(data:EZCardCoreData){
		_data = data;
		if(_data){
			
			if(_data.style == "none"){
				_pet.spriteName = "none";
				_side.spriteName = "none";
			}else{
				var quality:Color = Geek.GetQualityColor(_data.quality, 1, 1);	
				_quality.color = quality;
				var type:Color = Geek.GetColor(_data.magicType, 1, 1);
				_type.color = type;
				var pet:String = Geek.GetNameByProSty(_data.magicType, _data.style);
				_pet.spriteName = pet;
				_side.spriteName = pet;
				_side.color = quality;
			}
			_pet.MakePixelPerfect();
			_side.MakePixelPerfect();
			hasData_ = true;
		}else{
			hasData_ = false;
		}
		
		refresh();
		
	}
	public function setup(data:EZCard){
		if(data == null){
			var temp:EZCardCoreData;
			temp.style = "none";
			this.setupCore(temp);
		}else{
			this.setupCore(data.core);
		}
	}
}