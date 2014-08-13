#pragma strict
class EZSizeLayup extends MonoBehaviour{
	
	
	public var _layout:EZTableLayout;
	public function Awake(){
		_layout.doLayout(this.doLayout);
	}
	private function doLayout(rect:Rect){
		
		var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
		
		this.transform.localScale.x = rect.width/scale.x;
		this.transform.localScale.y = rect.height/scale.y;
	}

}