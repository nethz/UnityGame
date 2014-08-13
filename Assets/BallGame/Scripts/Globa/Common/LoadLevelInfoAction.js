#pragma strict

class LoadLevelInfoAction extends ActionObj{
	private var data_:JsonData.LevelData = null;
	
	public function get levelInfo():JsonData.LevelData{
		return data_;
	}
	
	public function setLevelInfo(data:JsonData.LevelData){
		data_ = data;
	}
	
	//var setLevelInfo:Function = null;
};