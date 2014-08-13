#pragma strict

class EZTeamTable extends MonoBehaviour{
	private static var instance_:EZTeamTable = null;
	private var team_:JsonData.Team = null;
	private var tableName_:String = "game_team";
	public var _debug:boolean = false;
	public function Awake(){
		this.instance_ = this;
		this.reset();
	}
	public function release(){
		team_ = new JsonData.Team();
		team_.battle = 0;
		this.save(team_);
	}
	public function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			var json:String = PlayerPrefs.GetString(tableName_);
			team_ = JsonData.Team.Load(json);
		}
		if(team_ == null || _debug) {
			release();
		};
	}
	
	public static function GetInstance():EZTeamTable{
		return this.instance_;
	}
	
	public function get data():JsonData.Team{
		return team_;
	}


	public function save(data:JsonData.Team){
		team_ = data;
		PlayerPrefs.SetString(tableName_, JsonData.Team.Save(team_));
		PlayerPrefs.Save();
	}
	

}