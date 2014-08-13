#pragma strict
class UIProgressBarLayout extends UITableLayout
{
	public var _slider:UISlider = null;
	public var _background:UIWidget = null;
	public var _foreground:UIWidget = null;
	
	//public var _background:GameObject = null;
	
	
	public function doLayoutImpl(rect:Rect, scale:Vector3){
		
		_background.gameObject.transform.localScale= Vector3(rect.width/scale.x, rect.height/scale.y, 1);
		_slider.fullSize = Vector2(rect.width/scale.x, rect.height/scale.y);
		
		this.transform.position.x = rect.x;
		this.transform.position.y = rect.y + scale.y * rect.height/scale.y/2;
	} 

	function hidden(){
		if(this._slider){
			this._slider.enabled = false;
		}
		if(this._foreground){
			this._foreground.enabled = false;
		}
		if(this._background){
			this._background.enabled = false;
		}
	}
	
	function show(){
		if(this._slider){
			this._slider.enabled = true;
		}
		if(this._foreground){
			this._foreground.enabled = true;
		}
		if(this._background){
			this._background.enabled = true;
		}
		
	}
}