#pragma strict

class EZCrystalTable extends MonoBehaviour{
	private static var instance_:EZCrystalTable = null;
	private static var tableName_:String = "game_crystal";
	private var crystal_:JsonData.Crystal = null;
	public function release(){
		crystal_ = null;
	
	}
	public function reset(){
	
		if(PlayerPrefs.HasKey(tableName_)){
			try{
				crystal_ = JsonData.Crystal.Load(PlayerPrefs.GetString(tableName_));
			}catch(e:System.Exception)
			{	
				crystal_ = null;
				PlayerPrefs.DeleteKey(tableName_);
			}
			
		}else{
			crystal_ = null;
		}
	}
	public function Awake(){
		this.instance_ = this;
		reset();
		
		
		
	}
	/*public function propose(data:JsonData.Crystal){
		if(data && crystal_ == null){
			this.save(data);
		}
	}*/
	public static function GetInstance():EZCrystalTable{
		return this.instance_;
	}
	public function get data():JsonData.Crystal{
		return crystal_;
	}
	public function save(data:JsonData.Crystal){
		this.crystal_ = data;
		var json:String = JsonData.Crystal.Save(crystal_);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
	}
}