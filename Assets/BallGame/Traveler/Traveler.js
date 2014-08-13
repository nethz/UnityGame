#pragma strict
public var avatar:AvatarBind = null;
public var controlCamera:Camera = null;
public var limits:Vector2 = Vector2(0, 500);
function Start () {
	
}
function testLimits(){
	if(this.transform.localPosition.x > limits.y)
	{
		this.transform.localPosition.x = limits.y;
	}else if(this.transform.localPosition.x < limits.x){
		this.transform.localPosition.x = limits.x;
	}

}

function Update () {
	this.transform.position.x +=1;
	this.testLimits();
}