#pragma strict


class EZAffixDB  extends MonoBehaviour{
	class TypeValue{
		var type:String = null;
		var title:String = "";
	}
	public var _unknow:EZAffixDBInfoBase;
	public var _infos:EZAffixDBInfoBase[];
	public var _techList:TypeValue[] = null;
	public var _typeList:TypeValue[] = null;
	
	static private var instance_:EZAffixDB = null;
	public function Awake(){
	
		this.instance_ = this;
	}
	public function OnDestroy(){
		this.instance_ = null;
	}
	
	public static function GetInstance():EZAffixDB{
		return instance_;
	}
	public function getTitle(tech:String){
	
		if(!String.IsNullOrEmpty(tech)){
		
			for(var j:int = 0; j<_techList.Length; ++j){
				
				if(_techList[j].type == tech){
					return _techList[j].title;
				}
			
			}
		}
		return "";
	}
	public function getTitle( mark:String, type:String):String{
		
		
		var base:EZAffixDBInfoBase = getInfo(mark);
		
		if(base && base != _unknow){
			return base.getTitle();
		}else{
			for(var i:int = 0; i<_typeList.Length; ++i){
				
				if(_typeList[i].type == type){
					return _typeList[i].title;
				}
			
			}
		
		}
		return "";
	}
	public function createInfos(soul:JsonData.Soul, tech:JsonData.TechInfo):EZAffixInfo[]{
		
		var infos:EZAffixInfo[] = new EZAffixInfo[tech.affixes.length];
		for(var i:int = 0; i<tech.affixes.length; ++i){
			var mark:String = tech.affixes[i].toString("mark");
			var db:EZAffixDBInfoBase = this.getInfo(mark);
			db.setup(soul);
			var info:EZAffixInfo = new EZAffixInfo();
			info.title = db.getTitle();
			info.maxLv = db.max;
			info.info = db.text();
			
			if(tech.affixes[i].hasKey("lv")){
				info.lv = tech.affixes[i].toInt("lv");
			}
			infos[i] = info;
		}
		return infos;
	
	}

	
	public function getInfo(mark:String):EZAffixDBInfoBase{
		for(var i:int =0; i< _infos.length; ++i){
			//if(mark == "dot_hurted2"){
			//	Debug.Log(mark+"???");
			//	Debug.Log(_infos[i].type+"!!!" + _infos[i].title);
			//}
			if(_infos[i].type == mark){
				
				//Debug.Log(_infos[i].type+"!22!" + _infos[i].title);
				return _infos[i];
			}
		
		}
		return _unknow;
	}

};