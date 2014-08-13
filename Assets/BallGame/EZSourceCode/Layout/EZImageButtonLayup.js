#pragma strict
class EZImageButtonLayup extends MonoBehaviour{
	public enum Style{
		Free,
		Fixed,
	};
	public var _image:Transform ;
	public var _layout:EZTableLayout;
	public var _collider:BoxCollider;
	public var _style:Style = Style.Free;
	
	public function Awake(){
		_layout.doLayout(this.doLayout);
	}
	
	


	private function doFixed(rect:Rect){
	
		var ls:Vector3 = this.transform.localScale;
		var sr = ls.x/ls.y;
		var rr = rect.width/rect.height;
		
		var scale:Vector3 = Geek.GetWorldScale(_image);
		if(sr > rr){
		
			
			this.transform.localScale.x = rect.width/scale.x *this.transform.localScale.x;
			this.transform.localScale.y = this.transform.localScale.x/sr;
			
		}else{
		
			this.transform.localScale.y = rect.height/scale.y*this.transform.localScale.y;
			this.transform.localScale.x = this.transform.localScale.y *sr;
		}
		
		
		
	}
	
	
	private function doLayout(rect:Rect){
		
		if(_style == Style.Free){
			var scale:Vector3 = Geek.GetWorldScale(_image);
			this.transform.localScale.x = rect.width/scale.x *this.transform.localScale.x;
			this.transform.localScale.y = rect.height/scale.y*this.transform.localScale.y;
		
		}else{
			doFixed(rect);
		}
		
		_collider.size = Vector2(_image.localScale.x,_image.localScale.y);
		
		
		
	}

}