#pragma strict

class EZBroadcastTable extends MonoBehaviour{
	public var _data:EZBroadcastData = null;
	public var _pack:EZBroadcastPack = null;
	private var broadcast_:JsonData.BroadcastWeb = null;
	class SceneKeyValue{
		var scene:EZDictionaryScene.SceneName;
		var where:String = "";
	}
	public var _sceneList:SceneKeyValue[] = null;
	private var _init:boolean = false;
	public function init(){
		if(!_init){
			_init = true;
			for(var i:int = 0; i<_sceneList.Length; ++i){
				var list:List.<JsonData.BroadcastData> = _data.getDataForScene(_sceneList[i].where);
				_pack.setup(list, _sceneList[i].where);
			}
		}
	}
	public function save(broadcast:JsonData.BroadcastWeb){
		_pack.save(broadcast);
	}
	public function setScene(scene:int){
		this.init();
		var where:String = "";
		for(var i:int = 0; i<_sceneList.Length; ++i){
			if(_sceneList[i].scene == scene){
				where = _sceneList[i].where;
				break;
			}
		}
		//var list:List.<JsonData.BroadcastData> = _data.getDataForScene(where);
		_pack.open(where);
		return _pack;
	}

}