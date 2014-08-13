#pragma strict
class EZUIButton extends MonoBehaviour{
	
	
	public var _button:UIButton;
	public var _boxCollider:BoxCollider;
	public var _background:UIWidget;
	public var _label:UIWidget;
	public var _layout:EZTableLayout;
	public function Start(){
		_layout.doLayout(this.doLayout);
	}
	private function doLayout(rect:Rect){
		var scale:Vector3 = Geek.GetWorldScale(this.transform);
		_button.tweenTarget.transform.localScale = Vector3(rect.width/scale.x, rect.height/scale.y, 1);
		_boxCollider.size = Vector2(rect.width/scale.x, rect.height/scale.y);
		this.transform.position.x = rect.x + scale.x * _boxCollider.size.x/2;
		this.transform.position.y = rect.y + scale.y * _boxCollider.size.y/2;
	}

}