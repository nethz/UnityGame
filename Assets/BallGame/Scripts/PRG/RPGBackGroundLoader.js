#pragma strict

class RPGBackGroundLoader extends MonoBehaviour{
	class ObjectName{
		public var name:String;
		public var object:GameObject;
	};
	private var _sceneObj:GameObject = null;
	public var _camera:Camera;
	public var _scenes:ObjectName[];
	public function Awake(){
		ActionManager.registerAction("view.background.loader", function():ActionObj{
			
			var loader:EZLoadAction = new EZLoadAction();
			loader.execute = function(){
				this.load(loader.loadName);
			};
			return loader;
		});
	}
	public function OnDestroy(){
		ActionManager.unregisterAction("view.background.loader");
	}
	
	public function load(name:String){
		for(var i:int = 0; i < _scenes.Length; ++i){
			if(_scenes[i].name == name){
				if(_sceneObj != null){
					GameObject.DestroyObject(_sceneObj);
					_sceneObj = null;
				}
		 		_sceneObj  = GameObject.Instantiate(_scenes[i].object);
		 		_sceneObj.transform.parent = this.transform;
		 		var adaptation:Adaptation = _sceneObj.GetComponentInChildren(Adaptation) as Adaptation;
		 		var scn:EZScene =_sceneObj.GetComponentInChildren(EZScene) as EZScene;
		 		if(scn){
		 			if(EZMonsterFactories.GetInstance()){
		 				EZMonsterFactories.GetInstance().shadowMode = scn.shadowMode;
		 			}
		 			if(EZHeroFactories.GetInstance()){
		 				EZHeroFactories.GetInstance().shadowMode = scn.shadowMode;
		 			}
		 		}
		 		adaptation._camera = this._camera;
		 		
		 		var layers:EZLayer[] =  System.Array.ConvertAll(
					_sceneObj.GetComponentsInChildren(EZLayer), 
					function (component){component as EZLayer;}
					);
				for(var n:int = 0; n<layers.Length; ++n){
					layers[n]._camera = this._camera;
				}
		 		
			}
		}
	} 
}