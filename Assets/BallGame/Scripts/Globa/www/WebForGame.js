#pragma strict

class WebForGame extends MonoBehaviour{

	
	public var _webInfo: WebInfo;
	private var data_:WebData = new WebData();  
	
	public function set data(value:WebData){
		this.data_ = value;
	} 
	public function get data():WebData{
		return this.data_;
	}
	private static var instance_:WebForGame = null;
	function Awake(){
		this.instance_ = this;
	//	_webInfo.setup();
	}
	
	static function GetInstance():WebForGame{
		return this.instance_;
	}
	
	public function get info():WebInfo{
		return _webInfo;
	}

}