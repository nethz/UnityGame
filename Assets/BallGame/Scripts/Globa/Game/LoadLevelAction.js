#pragma strict
class LoadLevelAction extends ActionObj{
	private var levelName_:String;
	public function setLevelName(levelName:String){
		this.levelName_ = levelName;
	}
	public function get levelName():String{
		return this.levelName_;
	}
};