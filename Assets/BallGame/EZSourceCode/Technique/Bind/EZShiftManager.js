#pragma strict

class EZShiftManager extends MonoBehaviour{
	class KeyValue{
		public var key:String;
		public var val:String;
	};
	public var _list:KeyValue[];
	private var map_:Hashtable = null;
	static private var instance_:EZShiftManager = null;
	
	
	public function Awake(){
		map_ = new Hashtable();
		for(var i:int = 0; i<_list.length; ++i){
			map_[_list[i].key] = _list[i].val;
		}
		
		instance_ = this; 
	}
	public function create(obj:GameObject, data:JsonData.JsonPack):EZShift{
	
		var type:String = data.toString("type");
		var ret:EZShift = create(obj, type);
		ret.setup(data);
		return ret;
	}
	public function create(obj:GameObject, datas:JsonData.JsonPack[]):EZShift[]{
		var ret:EZShift[] = null;
		if(datas){
			ret = new EZShift[datas.length];
			for(var i:int = 0; i<datas.length; ++i){
				ret[i] = create(obj, datas[i]);
			}
		}
		return ret;
	}
	
	public static function GetInstance():EZShiftManager{
		return instance_;
	}
	public function create(obj:GameObject, type:String):EZShift{
		var script:String = map_[type];
		var shift = obj.AddComponent(script) as EZShift;
		shift.enabled = false;
		return shift;
	}
}