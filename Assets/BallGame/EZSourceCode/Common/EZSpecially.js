#pragma strict

class EZSpecially extends MonoBehaviour{
	class RenderCamera{
		private var camera_:Camera = null;
		private var renderTexture_:RenderTexture;
		public function create(camera:Camera, name:String, size:int, format:RenderTextureFormat, cullingMask:int){
			camera_ = camera;
			renderTexture_ = RenderTexture.GetTemporary(size, size, 0, format);
			renderTexture_.filterMode = FilterMode.Bilinear;
			renderTexture_.wrapMode = TextureWrapMode.Clamp;
       	 	renderTexture_.name = name;
        	renderTexture_.isPowerOfTwo = true;
        	camera_.targetTexture = renderTexture_;
      		camera_.cullingMask = cullingMask;
		}
		public function get camera():Camera{
			return camera_;
		}
		public function get texture():RenderTexture{
			return renderTexture_;
		
		}
		public function destroy(){
			RenderTexture.ReleaseTemporary(renderTexture_);
		}
		
	};
	public var _size:int = 256;
	private var effect_:EZSpeciallyEffect = null;
	public var _box:BoxCollider;
	public var _offset:EZSpeciallyOffset;
	public var _external:float = 32;
	public var _camera:Camera; 
	private var renderCameras_:List.<RenderCamera> = new List.<RenderCamera>();
	public var _format:RenderTextureFormat = RenderTextureFormat.ARGB32;
	private var renderTexture_:RenderTexture; 
	public var _refreshNow:boolean = true;
	public var _front:exSprite;
	public var _back:EZEffect;
	public var _shadow:EZShadow;
	private var scale_:Vector3;
	private var rotation_:Quaternion;
	private var size_:Vector3;
	private var shadowMode_:float = 1.25f;
	public function get effect():EZEffect{
		return _back;
	}
	
	
	
	public function get texture():RenderTexture{
		return renderTexture_;
	}
	public function createRenderCamera(camera:Camera, name:String, size:int, format:RenderTextureFormat, cullingMask:int):RenderCamera{
		var rc:RenderCamera = new RenderCamera();
		camera.gameObject.transform.parent = this._camera.gameObject.transform.parent;
		rc.create(camera, name, size, format, cullingMask);
		renderCameras_.Add(rc); 
		updateCamera();
		return rc;
	}
	public function Awake(){
		
		var rc:RenderCamera = createRenderCamera(_camera, "RenderTexture" + this.gameObject.GetInstanceID(), _size, _format, 1<<this._box.gameObject.layer); 
		
      		
      		
      	_front.gameObject.name = "front";
      	renderTexture_= rc.texture;
      	_front.renderer.material.mainTexture =  renderTexture_;  
      	_back.renderer.material.mainTexture =  renderTexture_;  
      	_shadow.renderer.material.mainTexture = renderTexture_;  
      	
      	if(testChange()){
			updateCamera();
      	}
      	setEffect(EZSpeciallyEffectManager.Type.None);
	}
	
	public function OnDestroy(){ 
	
		for(var j:int = 0; j< renderCameras_.Count; ++j){
		      	renderCameras_[j].destroy();
		} 
		
	}
	public function set shadow(value:boolean){
		var active:boolean = value;
		_shadow.gameObject.SetActive(active);
	}
	public function setEffect(type:EZSpeciallyEffectManager.Type){
		this.effect_ = EZSpeciallyEffectManager.Create(type);
		this.effect_.setup(_front);
	}
	public function setTargetLayer(layer:int){
		for(var j:int = 0; j< renderCameras_.Count; ++j){
		      	renderCameras_[j].camera.cullingMask = 1<<layer;
		}
	}
	public function set shadowMode(value:float){
		this.shadowMode_ = value;
		updateCamera();
	}
	private function updateCamera(){
		var size:float = _box.size.y > _box.size.x? _box.size.y:_box.size.x;
		var os:float =  (size/2 + _external);
		var oy:float =  (_box.size.y/2); 
		
			
		 
		for(var i:int = 0; i< renderCameras_.Count; ++i){
			renderCameras_[i].camera.orthographicSize = os * scale_.y;  
			renderCameras_[i].camera.transform.localPosition = this._box.center;
		}
      	_front.width =  2*os;
      	_front.height =  2*os; 
      	
      	_back.size = Vector2(2*os, 2*os);
      	
      	_shadow.size = Vector2(2*os, 2*os);
      	_shadow.offset = Vector2(0, -(oy/2) * scale_.y);
      	
      	_shadow.skew = Vector2( (Mathf.PI *shadowMode_),0);
      	
      	
		for(var j:int = 0; j< renderCameras_.Count; ++j){
			if(rotation_ == Quaternion(0, 0, 0, 1)){
		      	renderCameras_[j].camera.transform.localRotation = Quaternion.AngleAxis(0, Vector3.up);
		     }else{ 
		      	renderCameras_[j].camera.transform.localRotation = Quaternion.AngleAxis(180, Vector3.up);
		      }
		}
		
		
      
      	
      	this.transform.localPosition = Vector3(0,0, 0);
      	this.transform.position = this.transform.position + Vector3(0,0, 10);
      	
      	_shadow.transform.localPosition = Vector3(0, 0 , 0); 
      	var sOffset:Vector3 = Vector3.zero;
      	if(_offset){
      		sOffset = _offset.position;
      	}
      	_shadow.transform.position = _shadow.transform.position + Vector3(0,-(oy/2) * scale_.y, 10) + sOffset;
		
	};
	private function testChange():boolean{
		var scale:Vector3 = Geek.GetWorldScale(_box.transform); 
		
		if(size_ != _box.size || scale_ != scale ||this.transform.rotation != rotation_ ){
			rotation_ = this.transform.rotation;
			size_ = _box.size;
			scale_ = scale;
			return true;
		} 
		return false;
	}
	public function LateUpdate(){
		
      	if(testChange()){
			updateCamera();
      	}
      	if(effect_ != null){
			effect_.update(Time.deltaTime);
		}
		
	} 


}