#pragma strict
class UISlicedSpriteLayout extends UITableLayout
{
	public var _sprite:UIWidget = null;
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		var scale2 = Geek.GetWorldScale(this.transform.parent);
		_sprite.transform.localScale = Vector3(rect.width/scale2.x, rect.height/scale2.y, 1);
		this.transform.position.x = rect.x;
		this.transform.position.y = rect.y +  rect.height;
	
	} 
	
	public function hidden(){
		if(_sprite != null)
		{
			_sprite.enabled   = false;
		}
	
	}
	
	public function show(){
		if(_sprite != null)
		{
			_sprite.enabled   = true;
		}
		
	}
	
}