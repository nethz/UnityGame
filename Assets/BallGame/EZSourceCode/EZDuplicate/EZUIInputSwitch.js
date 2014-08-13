#pragma strict


class EZUIInputSwitch  extends MonoBehaviour{
	private var inputs_:UICamera[] = null;
	private var deep_:int = 0;
	//private static var instance_:EZUIInputSwitch = null;
	//public static function GetInstance():EZUIInputSwitch{
	//	return this.instance_;
	//}
	public function Awake(){
	//	instance_ = this;
		this.inputs_ = System.Array.ConvertAll(
			this.GetComponentsInChildren(UICamera), 
			function (component){component as UICamera;}
			);
		
	}
	public function close(){
		if(deep_ <= 0){
			setEnabled(false);
		}
		deep_++;
	}
	public function open(){
	
		deep_--;
		if(deep_ <= 0){
			setEnabled(true);
		}
	}
	public function setEnabled(enabled:boolean){
		for(var i:int = 0; i<this.inputs_.length; ++i){
			this.inputs_[i].enabled = enabled;
		}
	}
	
}