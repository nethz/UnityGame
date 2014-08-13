#pragma strict

class EZGuideTable extends MonoBehaviour{
	private static var instance_:EZGuideTable = null;
	private var data_:JsonData.Guide = null;
	public var _debug:boolean = false;
	private var tableName_:String = "game_guide";
	
	function release(){
		save(new JsonData.Guide());
	}
	
	function reset(){
		if(_debug){
			release();
		}else{
			if(PlayerPrefs.HasKey(tableName_)){
				var json:String = PlayerPrefs.GetString(tableName_);
				data_ = JsonData.Guide.Load(json);
			} 
			
			if(data_ == null) {
				data_ = new JsonData.Guide();
			}; 
		}
	}
	
	function Awake(){
		this.instance_ = this;
		reset();
	}
	
	public static function GetInstance():EZGuideTable{
		return this.instance_;
	}
	
	public function get data():JsonData.Guide{
		return data_;
	}
	
	public function save(data:JsonData.Guide){
		data_ = data;
		PlayerPrefs.SetString(tableName_, JsonData.Guide.Save(data_));
		PlayerPrefs.Save();
	}
	
}