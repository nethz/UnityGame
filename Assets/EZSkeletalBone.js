#pragma strict
class EZSkeletalBone extends MonoBehaviour{
	//public var _obj:GameObject;
	public var _sprite:exSprite = null;
	public var _skew:EZSkew = null;
	public var _joint:GameObject = null;
	private var used_:boolean = false;
	private var callback_:Function = null;
	private var reset_:Vector4;
	private var skeletalTween_:EZSkeletalTween = null;
	private var jointTween_:EZJointTween = null;
	private var enabled_:boolean = false;
	//private var size_:Vector2 = Vector2.one;
	private var _isloaded:boolean = false;
	public function Awake(){
	}
	public function get used():boolean{
		return used_;
	}
	public function set used(value:boolean){
		used_ = value;
	}
	public function get bone():GameObject{
		
		return this.gameObject;
	}
	public function get joint():GameObject{
		return this._joint;
	}
	public function set color(value:Color){
		_sprite.color = value;
	} 
	public function set alpha(value:float){
		
		_skew.baseAlpha = value;
	}
	public function show(data:JsonSkeletalObj){
		if(skeletalTween_){
			skeletalTween_.pause(false);
		}
		
		if(jointTween_){
			jointTween_.pause(false);
		}
		
		place(data, true);
		//this._sprite.enabled = true;
	}
	public function hide(){
		if(skeletalTween_){
			skeletalTween_.pause(true);
		}
		
		
		if(jointTween_){
			jointTween_.pause(true);
		}
		this._sprite.enabled = false;
	}
	

	public function load(bundle:AssetBundle, bone:String, onEnd:Function){
		
		loadAsync(bundle, bone, 
		function(width:float, height:float){
		
			_sprite.height = height;
			_sprite.width = width;
			//size_ = Vector2(width, height);
			onEnd();
			}
		);
		 
	
	}
	public function loadAsync(bundle:AssetBundle, bone:String, onEnd:Function){
		
		var mat:Material = null; 
		mat = new Material(Shader.Find("EZ/Skew"));
		var request:AssetBundleRequest = bundle.LoadAsync(bone, typeof(Texture2D)); 
		yield request;
		var texture:Texture2D = request.asset as Texture2D;
		if(!texture){
			Debug.LogError("type:~ bone:" + bone );
		}
		mat.SetTexture("_MainTex", texture);
		this._sprite.gameObject.renderer.sharedMaterial = mat;
		onEnd(texture.width, texture.height);
	}
	
	public function load(type:String, bone:String){
		var mat:Material = null; 
		mat = new Material(Shader.Find("EZ/Skew"));
		var texture:Texture2D =  Resources.Load("EZMedia/"+type+"/"+bone, Texture2D) as Texture2D;
		if(!texture){
			Debug.LogError("type:" + type + " bone:" + bone);
		}
		mat.SetTexture("_MainTex", texture);
	
		this._sprite.gameObject.renderer.material = mat;
		
		_sprite.width = texture.width;
		_sprite.height = texture.height;
		//size_ = Vector2(texture.width, texture.height);
	}
	private function place(data:JsonSkeletalObj, show:boolean){ 
		reset_ = GetXY(data.x, data.y, data.regX, data.regY);
		bone.transform.localPosition.x = reset_.x;
		bone.transform.localPosition.y = reset_.y ; 
		_skew.skew = new Vector2(
			 data.skewX/360 * 2 * Mathf.PI,
			 -data.skewY/360 * 2 * Mathf.PI
			);
		
		var rot:Quaternion = Quaternion.AngleAxis(data.rotation, Vector3.back);
		this.transform.localRotation  = Quaternion.Euler(rot.eulerAngles);
		this.transform.localScale = new Vector3(data.scaleX, data.scaleY, 1);
		_sprite.color.a = data.alpha;
		_sprite.offset.x = reset_.z;   
		_sprite.offset.y = reset_.w;
		_sprite.enabled = show && (!data._off);
		_sprite.ForceUpdateMesh( _sprite.meshFilter.sharedMesh );
		_isloaded = true;
	}
	
	public function init(data:JsonSkeletalObj){
		this.place(data, true);
	}
	
	
	public function OnFinished (tween:EZTweener){   
		isFinished_ ++;
		if(isFinished_ == 2){
			
			bone.transform.localPosition.x = reset_.x;
			bone.transform.localPosition.y = reset_.y;
			bone.transform.localRotation = Quaternion.AxisAngle(Vector3.back, 0);
			
			_sprite.offset.x = reset_.z;   
			_sprite.offset.y = reset_.w; 
			
			_sprite.ForceUpdateMesh( _sprite.meshFilter.sharedMesh );
			_isloaded = true;
			callback_();
		}
	}
	
	
	private var isFinished_:int = 0;
	
	public function addSteps(datas:JsonSkeletalObj[], speed:float, callback:Function){ 
		callback_ = callback;
		isFinished_ = 0;
		skeletalTween_ = EZSkeletalTween.Begin(bone, datas, speed); 
		jointTween_ = EZJointTween.Begin(bone, joint, _sprite, _skew, datas, speed);
	}

	
	
	private function endCallback(){
		if(callback_ != null){
			callback_();
		}
	}
	private  function GetXY(x:float, y:float, regX:float, regY:float):Vector4{ 
		return Vector4(x, -y , -regX, regY);
	}
	public function setup(type:String, data:JsonBoneData){
		this.load(type, data.name);
		this.place(data.place, false);
	}
	
	public function setup(bundle:AssetBundle, data:JsonBoneData, onEnd:Function){
		this.load(bundle, data.name, function(){
			this.place(data.place, false);
			onEnd();
		});
		
	}
}