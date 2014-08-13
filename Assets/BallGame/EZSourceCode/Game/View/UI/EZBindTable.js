#pragma strict

class EZBindTable extends MonoBehaviour{
	
	
	class KeyValue{
		var name:String;
		var style:String;
		var title:String;
		var magicType:Geek.MagicType;
		var bind:EZBindData.BindType;
		var info:EZBindInfo;
	};
	
	
	var _list:KeyValue[];
	private function getKv(name:String, magicType:Geek.MagicType):KeyValue{
		for(var i:int = 0; i < _list.length; ++i){
			if(_list[i].name == name && _list[i].magicType == magicType){
				return _list[i];
			}
		}
		return null;
		
	}
	public function create(name:String, magicType:Geek.MagicType):EZBindData{
	
		var kv:KeyValue = getKv(name, magicType);
		if(kv){
			var data:EZBindData = null;
			data = new EZBindData();
			data.magicType = magicType;
			data.name = name;
			data.style = kv.style;
			data.bindType = kv.bind;
			data.title = kv.title;
			return data;
		}
	
		return null;
		
	
	}
	
	
	
	
	
	
	
	static private var instance_:EZBindTable = null;
	
	public function Awake(){ 
		instance_ = this;
	}
	
	public static function GetInstance():EZBindTable{
		return instance_;
	}
	
	public function getInfo(data:EZBindData):String{
		
		
		for(var i:int = 0; i < _list.length; ++i){
			if(_list[i].name == data.name && _list[i].magicType == data.magicType){
			
				return _list[i].info.getInfo(data);
			}
		}
		return "";
	}
	
}