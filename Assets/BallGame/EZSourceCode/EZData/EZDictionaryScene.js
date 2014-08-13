#pragma strict
//UnityScript
import System.Text.RegularExpressions;

class EZDictionaryScene extends EZScreen{
	class Item{
		var key:SceneName = SceneName.None;
		var val:String = "";
		var iPhone5:boolean = true;
	};	
	enum SceneName{
		Update,
		Guide,
		Game,
		Switch,
		Home,
		Mission,
		Crystal,
		Pet,
		Quest,
		Egg,
		Shop,
		Setting,
		Play,
		Weixin,
		Empty,
		None,	
	}
	
	public var _flag:String = "5";
	public var _list:Item[];
	
	private var map_:Hashtable = new Hashtable();
	private static var instance_:EZDictionaryScene = null;
	
	
	
	function Awake(){
		super.Awake();
		this.instance_ = this;
		for(var i:int = 0; i<_list.Length; ++i){
			var item:Item = _list[i] as Item;
			map_[item.key] = item;
		}
	}
	
	public static function GetInstance():EZDictionaryScene{
		return this.instance_;
	}

	public static function LookUp(key:EZDictionaryScene.SceneName):String{
		if(instance_){
			if(instance_.map_.ContainsKey(key)){
				var ret:Item = instance_.map_[key] as Item;
				if(ret.iPhone5 && instance_.iPhone5){
					return ret.val + instance_._flag;
				}
				return ret.val;
			}
		}
		return "";
	}
	

}