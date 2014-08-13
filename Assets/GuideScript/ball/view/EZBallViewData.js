#pragma strict
class EZBallViewData extends MonoBehaviour{

	enum State{
		Perfect = 0,
		//Flaw = 1,
		Splintering = 1,
		Diamond = 2,
	};
	class SprinteName{
		public var shell:String = "";
		public var broken:String = "";
		public var rock:String = "";
		public var rockLight:String = "";
		public var rockBroken:String = "";
		public var shellLight:String = "";
		public var brokenLight:String = "";
	};
	
	public var _diffuse:EZSound = null;
	public var _method:GeekTweener.Method = GeekTweener.Method.Linear;
	public var _names:SprinteName[] = null;
	public var _shell:UISprite = null;
	public var _broken:UISprite = null;
	public var _rock:UISprite = null;
	public var _rockLight:UISprite = null;
	public var _rockBroken:UISprite = null;
	public var _shellLight:UISprite = null;
	public var _brokenLight:UISprite = null;
	public var _patchBig:UISprite = null;
	public var _patchSmall:UISprite = null;
	public var state_:State = EZBallViewData.State.Perfect;
	public var _atime:float = 0.1f; 
	
	private var layer_:int = 1;  
	private var magicType_:Geek.MagicType = Geek.MagicType.Fire; 
	private var alpha_:float = 1.0f;
	private var flash_:boolean = false;
	
	public function set layer(value:int){ 
		layer_ = value;
	}
	
	
	public function set state(value:EZBallViewData.State){ 
		state_ = value;
	}
	public function get state():EZBallViewData.State{ 
		return state_;
	}
	
	
	public function set magicType(value:Geek.MagicType){
		this.magicType_ = value;
	}
	public function get magicType():Geek.MagicType{
		return this.magicType_;
	}
	
	public function set alpha(value:float){
		this.alpha_ = value;
	} 
	
	public function get alpha():float{
		return this.alpha_;
	}
	
	
	
	public function set flash(value:boolean){
		this.flash_ = value;
	} 
	
	public function get flash():boolean{
		return this.flash_;
	}
	
	function spallTask(p:GameObject, type:Geek.MagicType, begin:Vector3, rb:float):Task{
	
		var spall:EZSpallTask = new EZSpallTask(p);
		TaskManager.PushFront(spall, function(){
				_diffuse.play();
		});
		spall.setBegin(begin);
		spall.setType(type);
		
		var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
		var angle:float = Mathf.PI *2 * Random.value;
		var r:float = rb + Random.value*rb;
		var a:float = Mathf.Sin(angle) * r * scale.x;
		var b:float = Mathf.Cos(angle) * r * scale.y;
		spall.setEnd(begin + Vector3(a, b, 0));
		spall.setScale(scale);
		spall.setAllTime(0.2);
		return spall;
	}
	
	function refresh(){
		this._shell.depth = layer_ * 8 + 3;
		this._shellLight.depth = layer_ * 8 + 6;
		this._brokenLight.depth = layer_ * 8 + 7;
		this._broken.depth = layer_ * 8 + 4;
		this._rock.depth = layer_ * 8 + 0;
		this._rockLight.depth = layer_ * 8 + 1;
		this._rockBroken.depth = layer_ * 8 + 2; 
		if(this._patchBig){
			this._patchBig.depth = layer_ * 8 + 5;
		}
		if(this._patchSmall){
			this._patchSmall.depth = layer_ * 8 + 5;
		}
	
	}
}
