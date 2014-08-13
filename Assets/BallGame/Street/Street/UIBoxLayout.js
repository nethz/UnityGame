#pragma strict
class UIBoxLayout extends UITableLayout
{
	public var _boxCollider:BoxCollider = null;
	public var _background:UISlicedSprite = null;
	public var _label:UILabel = null;
	
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		//_button.tweenTarget.transform.localScale = Vector3(this.rect_.width/scale.x, this.rect_.height/scale.y, 1);
		
		this.transform.position.x = rect.x + scale.x * _boxCollider.size.x/2;
		this.transform.position.y = rect.y + scale.y * _boxCollider.size.y/2;
		var ls:Vector3 = this._background.transform.localScale;
		var r:float = ls.x/ls.y;  
		var y:float = rect.height/scale.y;
		var x:float = y*r;
		this._background.transform.localScale = Vector3(x, y, 1);
		_boxCollider.size = Vector3(x, y, 0);
	} 
	
	public function hidden(){
		if(_boxCollider != null)
		{
			_boxCollider.center = Vector3(10000,0,0);
		}
		if(_background != null){
			_background.enabled = false;
		}
		if(_label != null){
			_label.enabled = false;
		}
		
		
	}
	
	public function show(){
		if(_boxCollider != null)
		{ 
			_boxCollider.center   = Vector3(0,0,0);
			//_boxCollider.enabled = true;
		}
		if(_background != null){
			_background.enabled = true;
		}
		if(_label != null){
			_label.enabled = true;
		}
	}
	
}