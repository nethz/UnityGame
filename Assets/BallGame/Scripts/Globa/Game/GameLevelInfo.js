#pragma strict
/*
class GameLevelInfo extends MonoBehaviour{
	
	static private var instance_:GameLevelInfo = null; 
	private var levelName_:String = ""; 
	private var hero_:JsonData.Hero = null;
	private var level_:JsonData.LevelData = null;
	public function get hero():JsonData.Hero{
		return hero_;
	}
	public function get level():JsonData.LevelData{
		return level_;
	}
	
	public function filled(){
		return ((hero_ != null) && (level_ != null));
	}
	public function get levelName():String{
		return levelName_;
	}
	public function set levelName(value:String){
		this.levelName_ = value;
	}
	
	public function Awake(){
		instance_ = this;
	}
	
	
	public function OnDestroy(){
		instance_ = null;
	}
	
	public function refreshHero(data:JsonData.Hero){
		 hero_ = data;
	}
	public function refreshLevel(data:JsonData.LevelData){ 
		 level_ = data;
		
	}
	public function loadTask():Task{
		
		var mt:MultiTask = new MultiTask();

		
		var level:WebLevelTask =  WebTaskFactories.GetInstance().createTask(new WebLevelTask()) as WebLevelTask;
		level.setup(WebForGame.GetInstance().data, this.levelName_);
		level.setCallback(this.refreshLevel);
		
		mt.push(level);
		
		TaskManager.PushFront(mt, function(){hero_ = null; level_ = null;});
		
		return mt;
	}
	public static function getInstance():GameLevelInfo{
		return instance_;
	}
	

}*/