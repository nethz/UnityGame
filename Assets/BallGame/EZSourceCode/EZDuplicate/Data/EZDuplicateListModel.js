#pragma strict

class EZDuplicateListModel{
	public var _name:String;
	public var _collection:float = 0;
	public var _info:String;
	public var _levels:EZDuplicateLevelData[];
	
	public function load(data:JsonData.Level){
		_name = data.name;
		
		_info = data.info;
		_levels = new EZDuplicateLevelData[data.items.length];
		for(var i:int = 0; i<data.items.length; ++i){
			_levels[i] = new EZDuplicateLevelData();
			_levels[i].load(data.items[i]);
		}
	}
	
	
}