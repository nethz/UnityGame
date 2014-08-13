#pragma strict
class EZLoginTable extends MonoBehaviour{
	private static var instance_:EZLoginTable = null;
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance():EZLoginTable{
		return this.instance_;
	}
	
	function filled():boolean{
		return true;
	}
	
	public function get uuid():String{
	
	}
	public function get hash():String{
	
	}
	public function get url():String{
	
	}
	
	
	function fill(url:String, uuid:String, hash:String){
	
	}
			//this.uuid_ = login.uuid();//PlayerPrefs.GetString("uuid");
			//this.hash_ = login.hash();//PlayerPrefs.GetString("hash");
			//this.server_ = login.url();//PlayerPrefs.GetString("server");
}