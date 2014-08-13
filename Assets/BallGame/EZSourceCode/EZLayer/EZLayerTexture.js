#pragma strict

class EZLayerTexture extends MonoBehaviour{
	
	private var width_:float;
	private var origin_:Vector3;
	private var roll_:Vector3;
	private var shifting_:boolean = false;
	public var _sprite:exSprite = null;
	public var _unObjs:GameObject[] = null;
	
	public function unActivateObjs(){
		if(_unObjs){
			for(var i:int = 0;i<_unObjs.length;++i){
				_unObjs[i].SetActive(false);
			}
		}
	}
	
	public function Awake(){
		if(this._sprite == null){
			this._sprite = this.gameObject.GetComponent(exSprite) as exSprite;
		}
		this.width_ = this._sprite.width;	
	}
	public function set shifting(value:boolean){
		this.shifting_ = value;
	}
	public function set roll(value:Vector2){
		this.roll_ = value;
	}
	public function set origin(value:Vector3){
		this.origin_ = value;
	}
	
	
	function getPose(position:Vector3){
	
		var scale = Geek.GetWorldScale(this.transform);
		var ox = ( position.x - (position.x *roll_.x)) - (this.origin_.x * scale.x);
	
		var n:float = ox/(width_ * scale.x);
		if(this.shifting_){
			n += 1;
			n = Mathf.Floor(n/2)*2;
		}
		else{
			n = Mathf.Floor(n/2)*2 +1;
		}
		return n;
		
	}
	public function refresh(position:Vector3){
		var scale = Geek.GetWorldScale(this.transform);
		var n:int = this.getPose(position);
		this.transform.localPosition.x = (position.x *roll_.x /scale.x + width_ * n);//this.origin_.x;
		//this.transform.position.x = (position.x *roll_.x /scale.x + width_ * n);//this.origin_.x;
	}
}