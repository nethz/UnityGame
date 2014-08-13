#pragma strict

class EZGhost extends MonoBehaviour{
	
	public var _sprite:exSprite;
	public var _box:BoxCollider;
	public var _method:GeekTweener.Method = GeekTweener.Method.EaseOut;
	public var _collectTime:float = 0.5f;
	private var p_:Vector3;
	private var collectPoint_:Vector3;
	private var quality_:int = -1;
	private var type_:Geek.MagicType = Geek.MagicType.None;
	public function set collectPoint(value:Vector3){
		this.collectPoint_ = value;
	
	}
	class MagicTypeTexture{
		public var _metal:Texture2D;
		public var _wood:Texture2D;
		public var _water:Texture2D;
		public var _fire:Texture2D;
		public var _earth:Texture2D;
		public function getTexture(type:Geek.MagicType):Texture2D{
			var texture:Texture2D = null;
			switch(type){
				case Geek.MagicType.Metal:
					texture = _metal;
					break;
				case Geek.MagicType.Wood:
					texture = _wood;
					break;
				case Geek.MagicType.Water:
					texture = _water;
					break;
				case Geek.MagicType.Fire:
					texture = _fire;
					break;
				case Geek.MagicType.Earth:
					texture = _earth;
					break;
			}
			return texture;
		}
	};
	
	public function collect():Task{
		var task:Task = new Task();
		var tp:TweenAbsPosition = null;
		var ts:GeekTweenScale = null;
		
		collectPoint_.z = this.gameObject.transform.position.z;
		task.init = function(){
			tp = TweenAbsPosition.Begin(this.gameObject, _collectTime, collectPoint_);
			tp.method = _method;
			ts = GeekTweenScale.Begin(this.gameObject, _collectTime, Vector3(0, 0, 0));
			ts.method = _method;
		};
		
		task.isOver = function():boolean{
			return !tp.enabled && !ts.enabled;
		};
		
		return task;
	}
	public function Awake(){
		this.gameObject.renderer.material = new Material(Shader.Find("EZ/Ghost"));
		this.gameObject.renderer.material.SetFloat("_alpha", 1);
		
		_sprite.enabled = false;
	}	
	public function reset(){
		this.transform.localPosition = this._box.center;
		Debug.Log(this._box.center);
		quality_ = -1;
		type_ = Geek.MagicType.None;
	}
	public var _textures:MagicTypeTexture[] = null;
	
	
	private function getTexture(quality:int, type:Geek.MagicType):Texture2D{

		if(quality >= _textures.Length){
			return null;
		}
		return _textures[quality].getTexture(type);
	}
	
	public function show(){
		_sprite.enabled = true;
	}
	
	public function get quality():int{
		return quality_;
	}
	public function get magicType():int{
		return type_;
	}
	public function setup(quality:int, type:Geek.MagicType){
		type_ = type;
		quality_ = quality;
		var texture:Texture2D = getTexture(quality, type);
		if(texture != null){
			this.gameObject.renderer.material.SetTexture("_MainTex", texture);
		}
		p_ = Geek.GetWorldScale(this.transform.parent);
		this.transform.localScale = Vector3(0.1/p_.x, 0.1/p_.y, 0.1/p_.z);
		this.transform.localPosition = this._box.center;
		var p:Vector3 = Geek.GetWorldScale(this.transform.parent);
	
		
	}
	
	public function hide(){
		_sprite.enabled = false;
	}
	
}