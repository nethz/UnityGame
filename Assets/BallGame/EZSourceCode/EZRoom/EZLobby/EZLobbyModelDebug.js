#pragma strict

class EZLobbyModelDebug extends EZLobbyModel{
	public var _lv:int = 0;
	public var _ap:float = 0.0f;
	public var _exp:float = 0.0f;
	public var _allAp:float = 1.0f;
	public var _allExp:float = 1.0f;
	public var _diamond:int = 1;
	public var _money:int = 1;
	public var _bag:int = 1;
	public var _news:int = 1;
	public var _quest:int = 1;
	
	public function get news():int{
		return _news;
	}
	public function get quest():int{
		return _quest;
	}
	
	public function get diamond():int{
		return _diamond;
	}
	public function get money():int{
		return _money;
	}
	public function get bag():int{
		return _bag;
	}
	
	
	
	public function get lv():int{
		return _lv;
	}
	public function get ap():float{
		return _ap;
	}
	public function get exp():float{
		return _exp;
	}
	
	public function get allAp():float{
		return _allAp;
	}
	public function get allExp():float{
		return _allExp;
	}
	

}