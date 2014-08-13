#pragma strict

class EZLayerForZ extends MonoBehaviour{
	//private var layers_:EZLayer[];
	public var _z:float[];
	public var _camera:Camera = null;
	public var _cameraGetter:CameraGetter;
	
	function getCamera():Camera{
		if(_camera == null){
			if(_cameraGetter != null){
				_camera = _cameraGetter.getCamera();
			}
		}
		return this._camera;
	}
	
	public function Awake(){
		var layers:Component[] = this.gameObject.GetComponentsInChildren(EZLayer);
		var camera:Camera = getCamera();
		var cp:float = camera.gameObject.transform.position.z;
		var op:float = this.gameObject.transform.position.z;
		
		System.Array.Sort(layers, 
   	 		function(a:Component, b:Component):int{	
   	 			if( a.gameObject.transform.position.z > b.gameObject.transform.position.z) return -1; return 0;
   	 		}
 		);
 		for(var i:int = 0; i < layers.length; ++i){
 			var r:float = 0;
 			if(i < _z.length){
 				r = _z[i];
 			}
 			layers[i].gameObject.transform.position.z = op * (1-r) + cp *r;
 		}
	}

}