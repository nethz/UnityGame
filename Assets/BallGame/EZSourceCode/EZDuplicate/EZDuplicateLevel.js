#pragma strict

class EZDuplicateLevel extends MonoBehaviour{
	public var _name:UILabel;
	public var _msg:UILabel;
	public var _time:UILabel;
	private var data_:EZDuplicateLevelData =null;
	
	public function get data():EZDuplicateLevelData{
		return data_;
	}
	/*
	public function selectTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			GameLevelInfo.getInstance().levelName = data_._level;
			var load:Task = GameLevelInfo.getInstance().loadTask();
			TaskManager.PushBack(load, function(){
				Debug.Log(" is cool! ");
				isOver = true;
			});
			TaskManager.Run(load);
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	*/
	public function load(data:EZDuplicateLevelData){
		this.data_ = data;
		_name.text = data._name;
		_msg.text = "消耗AP:" + data._ap + "pt 敌人:" + data._team +"队";
		_time.text = "";
	}
}