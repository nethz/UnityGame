#pragma strict

class WebTaskFactories extends MonoBehaviour{

	
	//public var _webInfo: WebInfo;
	//private var data_:WebData = new WebData();  
	
	//public function set data(value:WebData){
	//	this.data_ = value;
	//} 
	//public function get data():WebData{
	//	return this.data_;
	//}
	private static var instance_:WebTaskFactories = null;
	function Awake(){
		this.instance_ = this;
//		_webInfo.setup();
	}
	
	static function GetInstance():WebTaskFactories{
		return this.instance_;
	}
	
	//public function get info():WebInfo{
//		return _webInfo;
//	}
	
	private function linkImpl(task:WebTask){
		
		task.reset();
		var www:WWW = task.www() as WWW;
		yield www;
		task.handle(www);
		task.callback();

	}

	public function link(task:WebTask){
		 linkImpl(task);
	}
	public function relink(task:WebTask){
		
		linkImpl(task);
	} 
}