#pragma strict
#pragma strict
class UISpriteLayout extends UITableLayout
{
	public var _sprite:UISprite = null;
	
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
	
		this.transform.position.x = rect.x + rect.width/2;
		this.transform.position.y = rect.y + scale.y * rect.height/scale.y/2;
		this.transform.localScale = Vector3(rect.width/scale.x *this.transform.localScale.x, rect.height/scale.y *this.transform.localScale.y, 1);
	} 

	function hidden(){
		this._sprite.enabled = false;
	}
	
	function show(){
		this._sprite.enabled = true;
	}
}