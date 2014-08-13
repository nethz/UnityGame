#pragma strict
class EZPetTexture  extends MonoBehaviour{
	private var pet_:EZPet = null;
	public var _layout:EZTableLayout;
	public var _parent:GameObject = null;
	public var side:float = 0.01;
	public var _loading:boolean = true;
	public var _mainTexture:UITexture = null; 
	public var _camera:Camera = null;
	public var _fireTexture:UITexture = null;
	public var _index:int = 1;
	private var alpha_:float = 1.0f;
	static private var instance_:EZPetTexture = null;
	public function Awake(){
		instance_ = this; 
	}
	public function get pet():EZPet{
		return pet_;
	}
	public function setMainColor(color:Color){
		_mainTexture.color = color;
	}
	public static function GetInstance():EZPetTexture{
		return instance_;
	}
	
	public function setTexture(texture:Texture){
		_mainTexture.mainTexture = texture;
		_mainTexture.material.SetFloat("_side", side);
	}
	
	
	
	private function setupTask(key:Geek.SoulKey):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		_mainTexture.enabled = false;
		if(_fireTexture != null){ 
			 _fireTexture.enabled = false;
		}
		task.init = function(){
			pet_ = EZMonsterFactories.GetInstance().create(key, _parent.transform, "pet", false, true, false);
			var load:Task = pet_.layoutingTask(_layout, false, this._parent.layer); 
			
			TaskManager.PushBack(load, function(){ 
			
				if(pet_.specially){ 
				
					pet_.specially.shadow = false;
					pet_.show();
					setTexture(pet_.specially.texture); 
					_mainTexture.enabled = true;
					_mainTexture.material.SetFloat("_alpha", alpha_); 
					if(_fireTexture != null && _camera != null){ 
						var rc:EZSpecially.RenderCamera =  pet_.specially.createRenderCamera(_camera, "RenderTexture" + this.gameObject.GetInstanceID(), 256, RenderTextureFormat.ARGB32, this._camera.cullingMask);
						_fireTexture.mainTexture = rc.texture;  
						 _fireTexture.enabled = true;
						 _fireTexture.material.SetFloat("_alpha", alpha_);
						_camera.enabled = true;
					}
				}
				pet_.post("weakup");
				isOver = true;
			});
			TaskManager.Run(load);
		
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}
	
	public function sideAlphaFade(b:boolean){
		if(b){
			TweenAlpha.Begin(_mainTexture.gameObject,0.3f,1f);
		}else{
			TweenAlpha.Begin(_mainTexture.gameObject,0.3f,0f);
		}
	}

	public function setAlpha(alpha:float){
		alpha_ = alpha;
		_mainTexture.material.SetFloat("_alpha", alpha);
		if(_fireTexture){
				_fireTexture.material.SetFloat("_alpha", alpha); 
		}
	}
	

	///////////////class EZSpecially extends MonoBehaviour{
	public function destroy(){ 
		if(_camera != null){
			_camera.enabled = false;
			_camera.gameObject.transform.parent = _parent.transform;
		}
		if(pet_){
			
			_mainTexture.enabled = false; 
			if(_fireTexture){
				_fireTexture.enabled = false; 
			}
			GameObject.DestroyObject(pet_.gameObject);
			pet_ = null;
		}
	}
	public function loadTask(key:Geek.SoulKey, quality:int):Task{
					
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.1f;
		loading.alpha = 0.0f;
		loading.text = "";
		loading.index = _index;
		loading.quality = quality;
		if(_loading){ 
			loading.show = 0.3f;
			loading.time = 0.0f;
		}else{ 
			loading.show = 0.0f;
			loading.time = 0.0f;
		}
		loading.type = key.type;
		
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		
		 if(_loading){ 
			loaded.time = 0.2f;
		}else{ 
			loaded.time = 0.0f;
		}
		
		var task:Task = this.setupTask(key);
		
		var tl:TaskList = new TaskList();
		
		TaskManager.PushFront(tl, function(){this.destroy();});
		if(_loading){
			tl.push(loading);
			tl.push(task);
			tl.push(loaded);
		}else{
			tl.push(task);
		}
		
		return tl;
	}

}
