#pragma strict

class EZLevelLoaderAction extends ActionObj{
	
	private var level_:JsonData.LevelData;
	private var doc_:JsonData.LevelDoc;
	public function get level():JsonData.LevelData{
		return level_;
	}

	
	public function get doc():JsonData.LevelDoc{
		return doc_;
	}
	
	public function set doc(value:JsonData.LevelDoc){
		this.doc_ = value;
	}
	
	
	public function set level(value:JsonData.LevelData){
		this.level_ = value;
	}
	
	
	
}