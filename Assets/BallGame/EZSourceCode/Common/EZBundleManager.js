#pragma strict

class EZBundleManager extends MonoBehaviour{
	private static var _map:Hashtable;
 	static private var instance_:EZBundleManager = null;
	public function Awake(){ 
		instance_ = this;
		_map = new Hashtable();
	}
	
	public static function GetInstance():EZBundleManager{
		
		if(instance_ == null){
			var obj = new GameObject("BundleManager"); 
			instance_ = obj.AddComponent(EZBundleManager);
		}
		return instance_;
	}

	public function load(url:String, onCallback:Function){ 
		var bundle:AssetBundle = null; 
		if(!_map.ContainsKey(url))
		{
			var www:WWW = new WWW(url);
			yield www;  
			if (www.error == null){
				bundle = www.assetBundle;
				_map[url] = bundle;
			}
		}else{
			bundle = _map[url] as AssetBundle;
		}
		onCallback(bundle);
	}
}