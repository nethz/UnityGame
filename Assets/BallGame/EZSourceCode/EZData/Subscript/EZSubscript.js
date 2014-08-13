#pragma strict
class EZSubscript extends MonoBehaviour{
	public var _talbeName = "name";
	public var _subscript:JsonData.Subscript = null;
	public var _refresh:EZSubscriptRefresh = null;
	public var _debug:boolean = false;
	
	public function Awake(){
		if(PlayerPrefs.HasKey("sub_"+_talbeName)){
		
			if(!_debug){
				_subscript = JsonData.Subscript.Load(PlayerPrefs.GetString("sub_"+_talbeName));
			}
		}
		
		if(_subscript == null){
			_subscript = new JsonData.Subscript();
		}
	}
	public function get number():int{
		return _subscript.getNumber(_refresh.getList());
		
	}
	public function has(key:String):boolean{
		return _subscript.has(key);
	}
	
	public function isNew(key:String){
		 return _subscript.isNew(key);
	}
	public function update(key:String){
		 _subscript.update(key);
	}
	
	public function save(){
		var json:String = JsonData.Subscript.Save(_subscript);
		PlayerPrefs.SetString("sub_"+_talbeName, json);
		PlayerPrefs.Save();
	}
	public function touch(key:String){
		_subscript.touch(key);
		save();
	}
	public function refresh(){
		var list:List.<String> = _refresh.getList();
		for(var i:int = 0; i<list.Count; ++i){
			update(list[i]);
		}
		save();
	}
}