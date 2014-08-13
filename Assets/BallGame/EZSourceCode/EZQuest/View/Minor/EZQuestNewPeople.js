#pragma strict



class EZQuestNewPeople extends MonoBehaviour{
	
	public var _name:UILabel;
	public var _adr:UILabel;
	class Mode{
		public var mode:String ="";
		public var sprites:UISprite[];
		public var text:String = "text";
		public var mesage:String = "text";
		public var title:String = "title"; 
		public function close(){
			for(var i:int = 0; i<sprites.Length; ++i){
				sprites[i].enabled = false;
			}
		}
		public function open(){
			for(var i:int = 0; i<sprites.Length; ++i){
				sprites[i].enabled = true;
			}	
		}
		
	}
	public var _modes:Mode[] = null;
	private var mode_:Mode = null;
	private var isOpen_:boolean =false;
	public function get title():String{
		if(mode_){
			return mode_.title;
		}
		return 	"";
	}
	public function get text():String{
		if(mode_){
			return mode_.text;
		}
		return 	"";
	}
	public function Awake(){
		this.close();
	}
	public function setup(mode:String):String{
		if(mode_){
			mode_.close();
		}
		mode_ = null;
		for(var i:int = 0; i <_modes.Length; ++i){
			
			if(_modes[i].mode == mode){
				mode_ = _modes[i];
			}
		}
		open();
		if(mode_){
			return mode_.text;
		}
		return "";
	}
	public function refresh(){
		if(isOpen_){
			if(mode_){
				mode_.open();
				_name.text = mode_.title;
				_adr.text = mode_.mesage;
				_name.enabled = true;
				_adr.enabled = true;
			}
		}else{
			if(mode_){
				mode_.close();
				_name.enabled = false;
				_adr.enabled = false;
			}
		
		}
	}
	public function open(){
		isOpen_ = true;
		refresh();
	}
	public function close(){
		isOpen_ = false;
		refresh();
	
	}
}