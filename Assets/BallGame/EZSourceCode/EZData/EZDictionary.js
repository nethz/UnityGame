#pragma strict
//UnityScript
import System.Text.RegularExpressions;

class EZDictionary extends MonoBehaviour{

	class Item{
		var key:String = "";
		var val:String = "";
	};	
	

	
	public var _list:Item[];
	public var _error:Item[];
	private var map_:Hashtable = new Hashtable();
	private var error_:Hashtable = new Hashtable();
	
	private static var instance_:EZDictionary = null;
	function Awake(){
		this.instance_ = this;
		for(var i:int = 0; i<_list.Length; ++i){
			var item:Item = _list[i] as Item;
			map_[item.key] = item.val;
		}
		
		for(var j:int = 0; j<_error.Length; ++j){
			var eitem:Item = _error[j] as Item; 
			error_[eitem.key] = eitem.val;
		}
		
	
		
	}
	public static function GetInstance():EZDictionary{
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
	
	public static function LookError(key:String){
		
		if(instance_){
			if(instance_.error_.ContainsKey(key)){
				return instance_.error_[key].ToString();
			}
		}
		Debug.LogWarning(key);
		return LookUp("!unknow_error");
	}
	

	
	
}