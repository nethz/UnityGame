#pragma strict

class UICell extends MonoBehaviour{
	public enum Adaptation{
		Fixed,
		Free,
	};
	public var _adaption:Adaptation = UICell.Adaptation.Fixed;
	public var _sprite:UISlicedSprite = null; 
	public var _collider:BoxCollider = null;
	private var _sortIndex:int = 0; 
	public var _label:UIWidget = null;
	public function get sortIndex():int{
		return this._sortIndex;
	}
	public function set sortIndex(value:int){
		this._sortIndex = value;
	}
	private function doFixed(rect:Rect, z:float, scale:Vector3){
		var ls:Vector3 = _sprite.transform.localScale;
		var sr = ls.x/ls.y;
		var rr = rect.width/rect.height;
		var size:Vector2;
		var padding:Vector2;
		if(sr > rr){
			size.x = rect.width;
			padding.x = 0;
			size.y = size.x /sr;
			padding.y = (rect.height -size.y)/2; 
		}else{
			size.y = rect.height;
			padding.y = 0 ;
			size.x = size.y *sr;
			padding.x = (rect.width -size.x)/2;
		}
		
		_sprite.transform.localScale = Vector3(size.x/scale.x, size.y/scale.y, 1);
		_collider.size = Vector3(size.x/scale.x, size.y/scale.y, 1);
		this.transform.position.x = rect.x + padding.x  + size.x/2;
		this.transform.position.y = rect.y +  rect.height - size.y/2 -  padding.y;
		this.transform.position.z = z*scale.z;
	}
	private function doFree(rect:Rect, z:float, scale:Vector3){
		
		var size:Vector2;
		size.x = rect.width;
		size.y = rect.height;
		
		_sprite.transform.localScale = Vector3(size.x/scale.x, size.y/scale.y, 1);
		_collider.size = Vector3(size.x/scale.x, size.y/scale.y, 1);
		
		this.transform.position.x = rect.x + size.x/2;
		this.transform.position.y = rect.y + size.y/2; 
		
		this.transform.position.z = z*scale.z;
	}
	public function doLayout(rect:Rect, z:float, scale:Vector3){
		if(this._adaption == UICell.Adaptation.Fixed){
			doFixed(rect, z, scale);
		}else{
			doFree(rect, z, scale);
		}
		
	}
	
	public function set visible(value:boolean){
		_sprite.enabled = value; 
		_label.enabled = value;
		if(value){
			_collider.enabled =  true;
		}else{
			_collider.enabled =  false;
		}
	}

}