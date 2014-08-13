#pragma strict
class UIPanelOffsetLayout extends UIPanelLayout
{

	//public var _offset:Vector3 = Vector3(0, 0, 0);
	private var offset_ = Vector3(0, 0, 0);
	public var _offsetObj:GameObject = null;
	public var _camera:Camera = null;
	function Awake(){
		super.Awake();
		this.updateLayout();
	}
	function Update(){
		this.updateLayout();
	}
	private function updateLayout(){
	
		if( offset_ != _offsetObj.transform.localPosition){
			offset_ = _offsetObj.transform.localPosition;
			var offset:Vector2 = Geek.Screen2Space(offset_, _camera.orthographicSize);
			var rect = this.adaptation.getRect();
			this.doLayout(new Rect(rect.x + offset.x, rect.y + offset.y, rect.width, rect.height));
		}
	}
	
}