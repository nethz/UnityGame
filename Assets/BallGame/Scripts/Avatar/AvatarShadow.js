#pragma strict
//private var shadow_:boolean = false;
private var shadowObj_ :GameObject = null;
public var prototype:GameObject = null;
private var shadow_:WithShadow = null;
function Start () {


	//this.ex_ = GetComponent("exSprite") as exSprite; 
//	if(!this.shadow_)
	//{ 
		//DebugStreamer.Log(this.ex_.height);
		this.shadowObj_= Instantiate(
				this.prototype, 
				transform.position + Vector3(0,0,10),
				transform.rotation
			);  
		this.shadowObj_.transform.parent = this.transform;
		this.shadow_ = this.shadowObj_.AddComponent("WithShadow") as WithShadow;
		this.shadow_.object_ = this.shadowObj_;
		//this.shadowObj_.transform.parent = this.transform;
		//var script:AvatarShadow = this.shadowObj_.GetComponent("AvatarShadow") as AvatarShadow; 
		//script.setShadow(true);
	//}
//	else{
		
//	}
}


function Update () {
	/*if(this.shadow_)
	{	
		transform.position.y  = horizon;

	}*/
}