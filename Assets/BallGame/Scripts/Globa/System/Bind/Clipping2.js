#pragma strict
private var ex_:exSprite = null;
private var originalHeight_:float = 0;
private var allHeight:float = 0;
private var horizon_:float = 0;
private var top_:float = 0;



function Start () {
	this.ex_ = this.GetComponent(exSprite);
	this.ex_.customSize = true;
	this.originalHeight_ = this.ex_.height;
	this.refreshHeight();

}

function refreshHeight(){
	if(this.ex_ != null){
		var scale:float = this.getScale();
		this.allHeight = this.originalHeight_ * scale;
	}
}
function setHorizon(horizon:float){
	this.horizon_ = horizon;
	this.refreshHeight();
}
function resetHeight(height:float){
	
	if(height < 0)
		height = 0;
	if(height > 1)
		height = 1;
	this.renderer.material.SetTextureOffset("_MainTex", Vector2(0, (1-height)));
	this.renderer.material.SetTextureScale("_MainTex", Vector2(1, height));
	this.ex_.height = originalHeight_ * height;

}
function getScale(){

	var t:Transform = this.transform;
	var s:float = t.localScale.y;
	while(t.parent != null)
	{
		t = t.parent;
		s *= t.localScale.y;
	
	}
	return s;

}


function Update () {
	
	var up:float = this.transform.position.y;
	var top = (up - this.horizon_);
	this.resetHeight(top/this.allHeight);
}