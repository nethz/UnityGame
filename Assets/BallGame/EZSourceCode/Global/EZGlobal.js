#pragma strict

class EZGlobal extends EZScreen{
	
	private static var instance_:EZGlobal = null;
	
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance(){
		return this.instance_;
	}
	
	private var levelName_:String = "";
	private var stateName_:String = "";
	public function get levelName():String{
		return levelName_;
	}
	public function get stateName():String{
		return stateName_;
	}
	
	public function set stateName(value:String){
		stateName_ = value;
	}
	
	public function LoadLevel(level:String, state:String){
		stateName_ = state;
		LoadLevel(level);
	}

	public function LoadLevel(level:String){
		
			if(level == "EZShop5"){
				level = "EZHome5";
				stateName_ = "Shop";
			}else if(level == "EZShop"){
				level = "EZHome";
				stateName_ = "Shop";
			}else if(level == "EZSetting"){
				level = "EZHome";
				stateName_ = "Setting";
			}else if(level == "EZSetting5"){
				level = "EZHome";
				stateName_ = "Setting";
			}else{
				stateName_ = "";
			}
			
			Resources.UnloadUnusedAssets();
			System.GC.Collect();
			Application.LoadLevel(level);
			Resources.UnloadUnusedAssets();
			System.GC.Collect();
	}
}