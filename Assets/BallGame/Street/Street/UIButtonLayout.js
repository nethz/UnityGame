#pragma strict
class UIButtonLayout extends UITableLayout
{
	public var _button:UIButton = null;
	public var _boxCollider:BoxCollider = null;
	public var _background:UIWidget = null;
	public var _label:UIWidget = null;
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
	
		_button.tweenTarget.transform.localScale = Vector3(rect.width/scale.x, rect.height/scale.y, 1);
		_boxCollider.size = Vector2(rect.width/scale.x, rect.height/scale.y);
		this.transform.position.x = rect.x + scale.x * _boxCollider.size.x/2;
		this.transform.position.y = rect.y + scale.y * _boxCollider.size.y/2;
	
	} 
	
	public function hidden(){
		if(_boxCollider != null)
		{
			//_boxCollider.enabled   = false;
			_boxCollider.center   = Vector3(10000,0,0);
		}
		if(_background != null)
		{
			_background.enabled   = false;
		}
		if(_label != null)
		{
			_label.enabled  = false;
		}
	}
	
	public function show(){
		if(_boxCollider != null)
		{
			_boxCollider.center   = Vector3(0,0,0);
			//_boxCollider.enabled = true;
		}
		if(_background != null)
		{
			_background.enabled   = true;
		}
		if(_label != null)
		{
			_label.enabled  = true;
		}
	}
	
}