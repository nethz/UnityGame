#pragma strict

class EZBindManager extends MonoBehaviour{
	class KeyValue{
		public var key:String;
		public var val:String;
	};
	
	public var _listBuff:KeyValue[];
	private var mapBuff_:Hashtable = null;
	
	
	
	public var _listDot:KeyValue[];
	private var mapDot_:Hashtable = null;
	
	
	static private var instance_:EZBindManager = null;
	private var count_:int = 0;
	
	public function Awake(){
		mapBuff_ = new Hashtable();
		for(var i:int = 0; i<_listBuff.length; ++i){
			mapBuff_[_listBuff[i].key] = _listBuff[i].val;
		}
		
		mapDot_ = new Hashtable();
		for(var d:int = 0; d<_listDot.length; ++d){
			mapDot_[_listDot[d].key] = _listDot[d].val;
		}
		
		count_ = 0;
		instance_ = this; 
	}
	
	
	
	public static function GetInstance():EZBindManager{
		return instance_;
	}
	
	public function doting(soul:EZSoul, type:String, magicType:Geek.MagicType):EZDot{
		count_++;
	
		if(mapDot_.ContainsKey(type)){
			var suffix:String = Geek.GetMagicName(magicType);
			var scriptDot:String = mapDot_[type];
			var bindDot:EZDot = soul.gameObject.GetComponent(scriptDot+suffix) as EZDot;
			if(bindDot == null){
				bindDot = soul.gameObject.AddComponent(scriptDot+suffix) as EZDot;
			}
			
			bindDot.magicType = magicType;
			bindDot.number = count_;
			return bindDot;
		}
		return null;
		
	}
	
	
	
	public function buffing(soul:EZSoul, type:String):EZBuff{
	
		if(mapBuff_.ContainsKey(type)){
			var scriptBuff:String = mapBuff_[type];
			var bindBuff:EZBuff = soul.gameObject.GetComponent(scriptBuff) as EZBuff;
			
			if(bindBuff == null){
				bindBuff = soul.gameObject.AddComponent(scriptBuff) as EZBuff;
			}
			return bindBuff;
		
		}
		return null;
		
	}
	
	
}