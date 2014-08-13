#pragma strict

class EZDuplicateModelDebug extends EZDuplicateModel{
	public var _ap:float = 0.0f;
	public var _allAp:float = 1.0f;
	public var _pve:EZDuplicateListModel[];
	public var _pvp:EZDuplicateListModel[];
	public var _event:EZDuplicateListModel[];
	
	public var _json:String;
	
	public function Awake(){
		//var data:JsonData.Mission = JsonData.Mission.Load(_json);
		_pve = loadLevels(null);
		_pvp = loadLevels(null);
		_event = loadLevels(null);
		
	}
	private function loadLevels(data:JsonData.LevelList):EZDuplicateListModel[]{
	
		var list:EZDuplicateListModel[] = new EZDuplicateListModel[data.lists.length];
		for(var i:int = 0; i<data.lists.length; ++i){
			list[i] = new EZDuplicateListModel();
			list[i].load(data.lists[i]);
		}
		return list;
	}
	public function get ap():float{
		return _ap;
	}
	public function get allAp():float{ 
		return _allAp;
	}
	
	public function get event():EZDuplicateListModel[]{
		return _event;
	}
	public function get pvp():EZDuplicateListModel[]{
		return _pvp;
	}
	public function get pve():EZDuplicateListModel[]{
		return _pve;
	}
	
	
}