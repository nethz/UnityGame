#pragma strict

class BackGroundBind extends MonoBehaviour
{
	public var _camera:Camera = null;
	var roll:Vector2 = Vector2(0,0);
	private var myCopyRight:boolean = true;
	private var offset:Vector2 = Vector2(0,0);
	private var ex:exSprite = null; 
	private var clone_:GameObject = null;
	private var cell = 0;
	private var origin_:Vector3 = Vector3(0, 0, 0);
	var size:Vector2 = Vector2(1,1);
	var position:Vector2 = Vector2(0,0);
	function Start () {
	
		this.ex = GetComponent("exSprite") as exSprite;
		this.offset = Vector2(ex.width, 0);
		if(this.myCopyRight)
		{ 
			this.myCopyRight = true;
			this.clone_= Instantiate(
					this.gameObject, 
					transform.position,
					transform.rotation
				);  
			clone_.transform.parent = this.transform.parent;
			var bg:BackGroundBind = this.clone_.GetComponent("BackGroundBind") as BackGroundBind; 
			bg._camera = this._camera;
			bg.temp();
			this.origin_ = this.transform.position; 
			bg.setOrigin(this.origin_);
			
			
		}
		this.setup();
	} 
	function setOrigin(origin:Vector3){
		this.origin_ = origin;
	
	}
	
	function setup(){
		this.offset = Vector2(ex.width, 0);
		this.transform.localScale.x = 1;
		this.transform.localScale.y = 1;
		this.transform.localScale.z = 1;
	}
	
	function temp(){
		this.myCopyRight = false;
	}
	
	function getPose(scale:Vector3){
	
		var camera = this._camera;
		var ox =( camera.transform.position.x - (camera.transform.position.x *roll.x)) - (this.origin_.x * scale.x);
		
		var n:float = ox/(this.ex.width * scale.x);
		if(this.myCopyRight){
			n += 1;
			n = Mathf.Floor(n/2)*2;
		}
		else{
			n = Mathf.Floor(n/2)*2 +1;
		}
		return n;
	}
	function Update () {
	
		var scale = Geek.GetWorldScale(this.transform);//get world scale
		var camera = this._camera;
		var n:int = this.getPose(scale);//get whaere
		this.transform.localPosition.x = (camera.transform.position.x *roll.x /scale.x+ offset.x * n)+ this.origin_.x;//this.origin_.x;
	}
}