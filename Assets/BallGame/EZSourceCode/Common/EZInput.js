#pragma strict

class EZInput extends MonoBehaviour{
	protected var enable_:boolean = false;
	public var _longTime:float = 1.5f;
	private var long_:boolean = false;
	private var time_:float = 0;
	private var id_:String = "";
	protected var reset_:Function = null;
	public function set reset(value:Function){
		reset_ = value as Function;
		reset_();
	}
	protected function set enable(value:boolean){
		this.enable_ = value;
	}
	public function open(){
	}
	public function info(){
	}
	public function close(){
	
	}
	//protected function feedback(id:String,color:Color){
	//}
	public function onPress(id:String, state:boolean){
		this.onAction(id, state);
		if(this.enable_){
			if(state){
				long_ = false;
				time_ = 0;
				id_ = id;
			}else{
				if(id_ != ""){
					onShort(id_);
					id_ = "";
				}else if(long_){
					onLongRelease();
					long_ = false;
				}
			}
			
		}
	}	
	
	public function onAction(id:String, state:boolean){
	
	}
	public function onShort(id:String){
	
	} 
	public function onLong(id:String){
		
		Debug.Log("~~long:" + id);
		
	}
	public function onLongRelease(){
		
	}
	
	public function Update(){
		if(enable_){
			if(id_ != ""){
				time_ += Time.deltaTime;
				if( time_ >= _longTime){
					onLong(id_);
					id_ = "";
					time_ = 0;
					long_ = true;
				}
			}
		}
	}
	

	
}