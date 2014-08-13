#pragma strict
class EZSubscriptManager extends MonoBehaviour{
	class Item{
		public var key:String = "";
		public var sub:EZSubscript = null;
	};
	public var _items:Item[] = null;
	
	private static var instance_:EZSubscriptManager = null;
	
	
	public function Awake(){ 
		this.instance_ = this;
		
	} 
	
	public static function GetInstance():EZSubscriptManager{
		return this.instance_;
	}
	public function getSubscript(key:String):EZSubscript{
		for(var i:int =0;i<_items.Length; ++i){
			if(_items[i].key == key){
				return _items[i].sub;
			}
		}
		return null;
	}
	public function load(){
		for(var i:int =0;i<_items.Length; ++i){
			_items[i].sub.refresh();
		}
	
	}
}