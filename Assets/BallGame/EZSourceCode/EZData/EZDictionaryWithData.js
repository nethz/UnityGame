#pragma strict
//UnityScript
import System.Text.RegularExpressions;

class EZDictionaryWithData extends MonoBehaviour{

	class Item{
		var key:String = "";
		var val:String = "";
	};	
	

	
	public var _list:Item[];
	private var map_:Hashtable = new Hashtable();
	
	private static var instance_:EZDictionaryWithData = null;
	function Awake(){
		this.instance_ = this;
		for(var i:int = 0; i<_list.Length; ++i){
			var item:Item = _list[i] as Item;
			map_[item.key] = item.val;
		}
		
	
		
	}
	public static function GetInstance():EZDictionaryWithData{
		return this.instance_;
	}
	public static function LookUp(key:String){
		if(instance_){
			if(instance_.map_.ContainsKey(key)){
				return instance_.map_[key].ToString();
			}
		}
		return key;
	}
	

	
	
}