#pragma strict

class EZUI extends MonoBehaviour{
	public var _skeletal:EZSkeletal;
	private var bounds_:Vector4;
	public var _size:float = 1;
	enum Y_AXIS{
		up,
		middle,
		down,
	};
	
	enum X_AXIS{
		left,
		middle,
		right,
	};
	
	enum Z_AXIS{
		front,
		back,
	};

	public var _yAxis:Y_AXIS;
	public var _xAxis:X_AXIS;
	public var _zAxis:Z_AXIS;
	
	public var _autoLoad:boolean = true;
	
	
	
	public function load(){
		var data:JsonSkeletalSetup = JsonSkeletalSetup.Load(_skeletal._setupJson); 
		bounds_.x = data.bounds[0];
		bounds_.y = data.bounds[1];
		bounds_.z = data.bounds[2];
		bounds_.w = data.bounds[3];
		
		if(_skeletal._layout != null){
			_skeletal._layout.doLayout(this.layout);
		}
		if(this._zAxis == Z_AXIS.back){
			 this.transform.position.z =  _skeletal.transform.position.z +  _skeletal._distance;
		}else{
			 this.transform.position.z =  _skeletal.transform.position.z -  _skeletal._distance *data.parts.Length ;
		}
		
		if(_skeletal._hFlip){
			this.transform.localRotation = Quaternion.AngleAxis(180, Vector3.up);
		}
	}
	function Awake(){
		if(_autoLoad){
			load();
		}
		
	}
	
	public function layout(rect:Rect){ 
		
		var scale = Vector3(1,1,1);
		if(this.transform.parent){
			 scale = Geek.GetWorldScale(this.transform.parent);
		}  
		var position:Vector2 = Vector2(0,0);
		var ls:Vector2 = Vector2(1,1);
		
		var y:float = rect.height * _skeletal._stature/bounds_.w; 
		ls.x = y/scale.y;
		ls.y = y/scale.y;  
		
	
		
		position.x =  rect.width/2 +  rect.x;
		position.y = rect.y + (ls.y * this.bounds_.w)/2*scale.y;  
		if(_yAxis == Y_AXIS.up){
			this.transform.position.y = position.y + (bounds_.w*ls.y)/2 * scale.y;
		}else if(_yAxis == Y_AXIS.down){
			this.transform.position.y = position.y - (bounds_.w*ls.y)/2* scale.y;
		}else{
			this.transform.position.y = position.y;
		}  
		this.transform.position.x = position.x;
		this.transform.localScale  = Vector3(_skeletal.hudScale.x/(scale.x*15), _skeletal.hudScale.y/(scale.y*15), this.transform.localScale.z);
		this.transform.position  += _skeletal.hudOffset;
		
		
		
	}

	
}