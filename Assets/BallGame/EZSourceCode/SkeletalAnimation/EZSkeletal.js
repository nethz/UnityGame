#pragma strict

class EZSkeletal extends MonoBehaviour{
	public var _boxCollider:BoxCollider = null;
	public var _hFlip:boolean = false;
	public var _layout:EZLayout;
	public var _prototypeBone:GameObject = null;
	public var _distance:float = 10;
	public var _setupJson:String = "";
	public var _stature:float = 1f;
	public var _type:String; 
	private var bounds_:Vector4;
	public var _offset:GameObject = null;
	private var bones_:Hashtable = new Hashtable();
	private var animations_:Hashtable = new Hashtable();
	private var callback_:Function = null;
	private var tweeners_:EZTweener[] = null; 
	private var isPlaying_:boolean = false;
	private var alpha_:float = 1;
	private var data_:JsonSkeletalSetup = null;
	public var _hudScale:Vector3 = Vector3(2, 2, 2);
	public var _hudOffset:Vector3 = Vector3.zero;
	public var _attackEffectOffset1:Vector3 = Vector3(-10,-50,0);
	public var _attackEffectScale:Vector3 = Vector3.one;
	
	public var _medicalOffset:Vector3 = Vector3(15,-25,0);
	public var _medicalScale:Vector3 = Vector3.one;
	
	public var _dotOffset:Vector3 = Vector3(0,-20,0);
	public var _dotScale:Vector3 = Vector3.one;
	
	public var _hudIPhone4Offset:Vector3 = Vector3.zero;
	private var _offsetPosition:Vector3 = Vector3.zero; 
	private var shifting_:float = 1;
	public function Awake(){
		_offsetPosition = _offset.transform.localPosition;
	}
	public function get hudScale():Vector3{
		return _hudScale;
	}
	public function get hudIPhone4Offset():Vector3{
		return _hudIPhone4Offset;
	}
	
	
	public function get hudOffset():Vector3{
		return _hudOffset;
	}
	
	public function get attackScale():Vector3{
		return _attackEffectScale;
	}
	
	public function get attackOffset():Vector3{
		if(_hFlip){
			return _attackEffectOffset1;
		}else{
			return new Vector3(-_attackEffectOffset1.x,_attackEffectOffset1.y,_attackEffectOffset1.z);
		}
		
	}
	
	public function get medicalScale():Vector3{
		return _medicalScale;
	}
	
	public function get medicalOffset():Vector3{
		if(_hFlip){
			return _medicalOffset;
		}else{
			return new Vector3(-_medicalOffset.x,_medicalOffset.y,_medicalOffset.z);
		}
		
	}
	
	public function get dotScale():Vector3{
		return _dotScale;
	}
	
	public function get dotOffset():Vector3{
		if(_hFlip){
			return _dotOffset;
		}else{
			return new Vector3(-_dotOffset.x,_dotOffset.y,_dotOffset.z);
		}
		
	}
	
	public function get boxCollider():BoxCollider{
		return _boxCollider;
	}
	public function set color(value:Color){
		for(var kv:DictionaryEntry in bones_){
			var bone = kv.Value as EZSkeletalBone;
			bone.color = value;
		}
	} 
	public function show(){
	
		for(var i:int = 0; i< data_.parts.Length; ++i){
			var bone:EZSkeletalBone = bones_[data_.parts[i].name ] as EZSkeletalBone;  
			bone.show(data_.parts[i].place);  
		}
	}
	public function hide(){
		for(var kv:DictionaryEntry in bones_){
			var bone = kv.Value as EZSkeletalBone; 
			bone.hide();
		}
	}
	
	public function setAlpha(a:float){
		alpha_ = a;
		for(var kv:DictionaryEntry in bones_){
			var bone = kv.Value as EZSkeletalBone; 
			bone.alpha = alpha_;;
		}
	}
	
	public function set alpha(value:float){
		alpha_ = value;
		for(var kv:DictionaryEntry in bones_){
			var bone = kv.Value as EZSkeletalBone; 
			bone.alpha = alpha_;;
		}
	}
	
	public function get alpha():float{
		return alpha_;
	}
	public function close(){
		isPlaying_ = false;
		if(tweeners_){
			for(var i:int = 0; i < tweeners_.Length; ++i){
				tweeners_[i].close();
			}
		}
	}
	public function pose(name:String){
		if(animations_.ContainsKey(name)){
			var data:JsonSkeletalAnimation = (animations_[name] as EZSkeletalAnimation).data;
			this.pose(data);	
		}
	
	}
	public function createAnimationTask(name:String):EZAnimationTask{
	
		var task:EZAnimationTask = new EZAnimationTask();
		var data:JsonSkeletalAnimation = null;
		
		task.init = function(){
			
			task.over = false;
			if(animations_.ContainsKey(name)){
				data = (animations_[name] as EZSkeletalAnimation).data;
			}
			if(data){
				this.callback_ = task.callback;
				this.play(data);
			}else{
				Debug.LogError("nononon" + name);
			}
		}; 
		task.setShifting = function(shifting:float){
			this.shifting_ = shifting;
		};
		task.isOver = function():boolean{
			if(task.over){
				return true;
			}
			return (!this.isPlaying_);
		};
		task.shutdown = function(){
			//this.callback_ = null;
		};
		task.close1 = function(){
			
			this.close();
			task.over =true;
		};
		task.pose = function(name:String){
			this.pose(name);
		};
		task.close = function(){
			this.close();
		};
		
		return task;
	}
	public function loadBoneTask(data:JsonSkeletalSetup, layer:int):Task{
		var task:Task = new Task();
		var isOver :boolean = false;
		task.init = function(){
			isOver = true;
			for(var i:int = 0; i< data.parts.Length; ++i){
				var obj:GameObject = GameObject.Instantiate(_prototypeBone);
				obj.name = data.parts[i].name;
				var bone:EZSkeletalBone =  obj.GetComponent(EZSkeletalBone) as EZSkeletalBone; 
				bone.gameObject.layer = layer;
				bone.joint.layer = layer; 
				obj.transform.localScale = Geek.GetWorldScale(this.transform);//.localScale; 
				obj.transform.parent = _offset.transform; 
				
				if(this._hFlip){
					obj.transform.localPosition.z = (data.parts.Length -i -1) * _distance;;
				}
				else{ 
					obj.transform.localPosition.z =   -(data.parts.Length - i-1)* _distance;
				}
				bones_[data.parts[i].name ] = bone; 
				bone.setup(this._type, data.parts[i]);
				isOver = true;
			}
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	
	}
	
	public function getFlipHorizintal():boolean{
		return _hFlip;
	}
	public function flipHorizintal(hFlip:boolean){
		_hFlip = hFlip;
		
		if(_hFlip){
			this.transform.localRotation = Quaternion.AngleAxis(180, Vector3.up);
		}else{
			this.transform.localRotation = Quaternion.AngleAxis(0, Vector3.up);
		}
		
		
		for(var i:int = 0; i< data_.parts.Length; ++i){
			var bone:EZSkeletalBone = bones_[data_.parts[i].name ] as EZSkeletalBone;  
			
			if(this._hFlip){
				bone.gameObject.transform.localPosition.z = (data_.parts.Length -i -1) * _distance;;
			}
			else{ 
				bone.gameObject.transform.localPosition.z =   -(data_.parts.Length - i-1)* _distance;
			}
		}
	}
	
	public function setupTask(data:JsonSkeletalSetup, layer:int):Task{
	
		var bone:Task = loadBoneTask(data, layer);
		TaskManager.PushFront(bone,
			function(){
				bounds_.x = data.bounds[0];
				bounds_.y = data.bounds[1];
				bounds_.z = data.bounds[2];
				bounds_.w = data.bounds[3];
				if(_boxCollider){
					_boxCollider.size.x = bounds_.z;
					_boxCollider.size.y = bounds_.w;
					_boxCollider.center.x  = -( -bounds_.x - bounds_.z/2) *this.transform.localScale.x;
					_boxCollider.center.y  =  -(bounds_.y + bounds_.w/2) *this.transform.localScale.y;
				}
				_offset.transform.parent = this.transform;
				_offset.transform.localPosition.x = ( -bounds_.x - bounds_.z/2) *this.transform.localScale.x +_offsetPosition.x;
				_offset.transform.localPosition.y = (bounds_.y + bounds_.w) *this.transform.localScale.y + _offsetPosition.y;
				_offset.transform.localScale = Vector3(1, 1, 1);
				_offset.transform.localPosition.z = 0;
			}
		);
		return bone;
		
	}
	
	public function loadTask(layer:int):Task{ 
		
		
		this.gameObject.layer = layer;
		this.data_ = JsonSkeletalSetup.Load(_setupJson); 
		var setup:Task = this.setupTask(data_, layer);
		
		TaskManager.PushBack(setup, function(){
			var animations:EZSkeletalAnimation[]  = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(EZSkeletalAnimation), 
			function (component){component as EZSkeletalAnimation;}
			); 
			var debug:JsonSkeletalAnimation = null;	
			for(var i:int = 0; i< animations.Length; ++i){
				var animation:EZSkeletalAnimation = animations[i];
				
				this.animations_[animation.animationName] = animation;
				if(animation.debug){
					debug = animation.data;
				}
			} 
			if(debug){
				this.play(debug);
			}
			if(this._hFlip){
				this.transform.localRotation = Quaternion.AngleAxis(180, Vector3.up);
			}
			if(this._layout != null){
				_layout.doLayout(this.layout);
			} 
			
		
		});
		return setup;
		
		
	}
	
	/*
	public function setup(data:JsonSkeletalSetup, layer:int, onEnd:Function){  
		
		bounds_.x = data.bounds[0];
		bounds_.y = data.bounds[1];
		bounds_.z = data.bounds[2];
		bounds_.w = data.bounds[3];
		if(_boxCollider){
			_boxCollider.size.x = bounds_.z;
			_boxCollider.size.y = bounds_.w;
			_boxCollider.center.x  = -( -bounds_.x - bounds_.z/2) *this.transform.localScale.x;
			_boxCollider.center.y  =  -(bounds_.y + bounds_.w/2) *this.transform.localScale.y;
		}
		_offset.transform.parent = this.transform;
		_offset.transform.localPosition.x = ( -bounds_.x - bounds_.z/2) *this.transform.localScale.x +_offsetPosition.x;
		_offset.transform.localPosition.y = (bounds_.y + bounds_.w) *this.transform.localScale.y + _offsetPosition.y;
		_offset.transform.localScale = Vector3(1, 1, 1);
		_offset.transform.localPosition.z = 0;
		loadBone(data, layer, onEnd);
	
		
		
	} 
	*/
	public function getJoint(name:String):GameObject{
		if(bones_.ContainsKey(name)){
	 		var bone:EZSkeletalBone =  bones_[name] as EZSkeletalBone; 
	 		return bone.joint;
	 	}	
	 	return null;
	}
	//private var i:int = 0;
	public function playBone(data:JsonSkeletalPart, speed:float, callback:Function){
		//!!!!@@
	
		if(bones_.ContainsKey(data.target)){
	 		var bone:EZSkeletalBone =  bones_[data.target] as EZSkeletalBone; 
	 		bone.init(data.init);
	 		bone.addSteps(data.steps, speed, callback);
	 		bone.used = true;
	 	}	

	}
	
	
	public function poseBone(data:JsonSkeletalPart){
	
	
		if(bones_.ContainsKey(data.target)){
	 		var bone:EZSkeletalBone =  bones_[data.target] as EZSkeletalBone; 
	 		
	 		bone.init(data.init);
	 		bone.used = true;
	 	}	

	}
	
	
	public function pose(data:JsonSkeletalAnimation){
		for(var kv:DictionaryEntry in bones_){
			var bone1 = kv.Value as EZSkeletalBone;
			bone1.used = false;
		}
		for(var i:int = 0; i<data.parts.Length; ++i ){
			this.poseBone(data.parts[i]);
		} 
		for(var kv:DictionaryEntry in bones_){
			var bone2 = kv.Value as EZSkeletalBone;
	 		if(!bone2.used){
	 			bone2._sprite.enabled = false;
	 		}
		}		
		
	}
	public function play(data:JsonSkeletalAnimation){
	   
	 	data.setup();
	 	var n:int = 0;
	 	isPlaying_ = true;
	 	for(var kv:DictionaryEntry in bones_){
			var bone1 = kv.Value as EZSkeletalBone;
			bone1.used = false;
		}
		for(var i:int = 0; i<data.parts.Length; ++i ){
			this.playBone(data.parts[i], data.speed * this.shifting_,  function(){
				++n; 
				if(n == data.parts.Length){
					if(this.callback_){
						isPlaying_ = false;	
						this.callback_();
					}else{
						if(isPlaying_)
							this.play(data);
					}
				}
			});
		} 
		if(tweeners_ == null){
			tweeners_ = System.Array.ConvertAll(
					this.GetComponentsInChildren(EZTweener),
					function (component){component as EZTweener;}
				);
		}		
				
		for(var e:int = 0; e<tweeners_.Length; ++e){
			tweeners_[e].doStart();
		}
		
		for(var kv:DictionaryEntry in bones_){
			var bone2 = kv.Value as EZSkeletalBone;
	 		if(!bone2.used){
	 			bone2._sprite.enabled = false;
	 		}
		}		
		
		
	} 
	/*
	private function load(layer:int, onEnd:Function){ 
		
		
		this.gameObject.layer = layer;
		this.data_ = JsonSkeletalSetup.Load(_setupJson); 
		this.setup(data_, layer, function(){
			var animations:EZSkeletalAnimation[]  = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(EZSkeletalAnimation), 
			function (component){component as EZSkeletalAnimation;}
			); 
			var debug:JsonSkeletalAnimation = null;	
			for(var i:int = 0; i< animations.Length; ++i){
				var animation:EZSkeletalAnimation = animations[i];
				
				this.animations_[animation.animationName] = animation;
				if(animation.debug){
					debug = animation.data;
				}
			} 
			if(debug){
				this.play(debug);
			}
			if(this._hFlip){
				this.transform.localRotation = Quaternion.AngleAxis(180, Vector3.up);
			}
			if(this._layout != null){
				_layout.doLayout(this.layout);
			} 
			
			onEnd();
		
		});  
		
		
	}
	*/
	
	public function layout(rect:Rect){ 
		var scale = Vector3(1,1,1);
		if(this.transform.parent){
			 scale = Geek.GetWorldScale(this.transform.parent);
		}  
	
	
		var y:float = rect.height/bounds_.w * _stature; 
		this.transform.localScale.x = y/scale.y;
		this.transform.localScale.y = y/scale.y;  
		
		
		this.transform.position.x =  rect.width/2 +  rect.x;
		this.transform.position.y = rect.y;
		
	}

	
}