#pragma strict
class EZUITexture extends MonoBehaviour{
	public enum Style{
		Free,
		Fixed,
	};
	
	public var _target:Transform = null;
	public var _style:Style = Style.Free;
	public var _layout:EZTableLayout;
	public function Awake(){
		if(_target == null){
			_target = this.transform;
		}
		_layout.doLayout(this.doLayout);
	}
	private function doFixed(rect:Rect){
	
		var ls:Vector3 = _target.transform.localScale;
		var sr = ls.x/ls.y;
		var rr = rect.width/rect.height;
		var scale:Vector3 = Geek.GetWorldScale(_target.transform.parent);
		if(sr > rr){
		
			_target.transform.localScale.x = rect.width/scale.x;
			_target.transform.localScale.y = _target.transform.localScale.x/sr;
			
		}else{
		
			_target.transform.localScale.y = rect.height/scale.y;
			_target.transform.localScale.x = _target.transform.localScale.y *sr;
		}
		
		//this.transform.position.x = rect.x +rect.width/2;
		//this.transform.position.y = rect.y + rect.height/2;
		
	}
	private function doLayout(rect:Rect){
		if(_style == Style.Free){
			var scale:Vector3 = Geek.GetWorldScale(_target.transform.parent);
			_target.transform.localScale.x = rect.width/scale.x;
			_target.transform.localScale.y = rect.height/scale.y;
		//	this.transform.position.x = rect.x +rect.width/2;
		//	this.transform.position.y = rect.y + rect.height/2;
		}else{
			doFixed(rect);
		}
		
	}

}