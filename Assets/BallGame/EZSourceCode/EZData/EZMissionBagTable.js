#pragma strict

class EZMissionBagTable extends MonoBehaviour{
	enum Type{
		Pve,
		Pvp,
		Evt,
	}
	public class SceneInfo{
		var mission:JsonData.Mission = null;
		var evtMission:JsonData.EvtMission = null;
	};
	private static var instance_:EZMissionBagTable = null;
	private static var tableName_:String = "game_mission_bag";
	private var isBagLoaded_:boolean = false;
	
	
	private var missionBag_:JsonData.MissionBag = null;
	
	public var _missionTable:EZMissionTable = null;
	public var _evtMissionTable:EZEvtMissionTable = null;
	function findEvtMissionFromId(id):JsonData.EvtMission{
		return _evtMissionTable.findFromId(id);
		
	}
	public function addField(pack:WebPack){
	
		pack.addField("quick_mission", "1");
		if(this.missionBag_ != null && this.missionBag_.list != null){
			_missionTable.addField(pack, missionBag_.list);
		}
		
		if(this.missionBag_ != null && this.missionBag_.evtList != null){
			_evtMissionTable.addField(pack, missionBag_.evtList);
		}
	
	}
	function isEnabled(evt:JsonData.EvtMission):boolean{
		return !this.isEvtNotEnable(evt.id);
	}
	function isEvtNotEnable(id):boolean{
		return _evtMissionTable.isNotEnable(id);
	
	}
	
	
	
	
	function release(){
		isBagLoaded_ = false;
		
		if(missionBag_){
			missionBag_ = null;
		}
	}
	
	function get lastType():String{
		var id:int = -1;
		var type:String = null;
		var mission:JsonData.Mission = _missionTable.lastType();
		var evt:JsonData.EvtMission = _evtMissionTable.lastType();
		if(mission != null && evt != null){
		
			if(mission.id > evt.id){
				return mission.type;
			}
			return evt.type;
		}
		
		if(mission!=null){
			return mission.type;
		}
		
		if(evt != null){
			return evt.type;
		}
		
		return null;
	}
	
	function find(type:String):SceneInfo{
		
		var mission:JsonData.Mission = _missionTable.find(type);
		if(mission != null){
			var info:SceneInfo = new SceneInfo();
			info.mission =  mission;
			return info;
		}
		var evt:JsonData.EvtMission = _evtMissionTable.find(type);
		if(evt != null){
			var evtInfo:SceneInfo = new SceneInfo();
			evtInfo.evtMission =  evt;
			return evtInfo;
		}
		return null;
		
	}
	function reset(){
		if(PlayerPrefs.HasKey(tableName_)){
			missionBag_ = JsonData.MissionBag.Load(PlayerPrefs.GetString(tableName_));
		}else{
			missionBag_ = new JsonData.MissionBag();
		}
		
		if(this.missionBag_ != null && missionBag_.list != null){
			for(var i:int = 0; i<missionBag_.list.Length; i++){
				_missionTable.setup(missionBag_.list[i].id);
			}
			
			for(var j:int = 0; j < missionBag_.evtList.Length; j++){
				_evtMissionTable.setup(missionBag_.evtList[j].id);
			}
		}
		isBagLoaded_ = false;
	}
	function Awake(){
		this.instance_ = this;
	}
	function Start(){
		
		reset();
	}
	public function GetNormalCount():int{
		return _missionTable.countNoBig();
	}
	public function GetHardCount():int{
		return _missionTable.countBig();
	}
	public static function GetInstance():EZMissionBagTable{
		return this.instance_;
	}
	public function get bag():JsonData.MissionBag{
		return missionBag_;
	}
	public function get list():List.<JsonData.Mission>{
		return _missionTable.list;
	}
	public function get evtList():List.<JsonData.EvtMission>{
		
		return _evtMissionTable.list;
	}
	
	public function get isLoaded():boolean{
		return isBagLoaded_ ;
	}
	
	public function save(data:JsonData.QuickMissionBag){
		missionBag_ = data.bag; 
		var json:String = JsonData.MissionBag.Save(missionBag_);
		PlayerPrefs.SetString(tableName_, json); 
		PlayerPrefs.Save(); 
		isBagLoaded_ = true; 
		Debug.LogWarning("data.missions.Length" + data.missions.Length);
		for(var i:int =0 ;i<data.missions.Length; ++i){
			Debug.LogWarning("typeid:"+ data.missions[i].type +":"+ data.missions[i].id);
		
		}
		_missionTable.save(data.bag.list, data.missions);
		_evtMissionTable.save(data.bag.evtList, data.events);
	
	
	}

}