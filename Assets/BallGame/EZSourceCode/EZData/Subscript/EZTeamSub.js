#pragma strict
class EZTeamSub extends MonoBehaviour{
	public var _new:UISprite;
	private var isOpen_:boolean = false;
	private var isNew_:boolean = false;
	private var subscript_:EZSubscript = null;
	private var list_:List.<String> = null;
	public function Awake(){
		this.close();
	}
	public function get isNew():boolean{
		return isNew_;
	} 
	public function load(subscript:EZSubscript, list:List.<String>){
		subscript_ = subscript; 
		list_ = list;
		this.refresh();
	}
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	
	public function refresh(){
		if(isOpen_){  
			isNew_ = false;
			if(subscript_ && list_){ 
				
				for(var i:int = 0; i<list_.Count; ++i){
					if(subscript_.isNew(list_[i])){
						isNew_ = true;
						break;
					}
				}
			}
			
		
			if(isNew_){
				_new.enabled = true;
			}else{
				_new.enabled = false;
			}
		}else{
			_new.enabled = false;
		}
	}
}