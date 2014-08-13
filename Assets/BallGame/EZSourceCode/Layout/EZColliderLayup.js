#pragma strict
class EZColliderLayup extends MonoBehaviour{
	
	
	public var _collider:BoxCollider;
	public var _layout:EZTableLayout;
	public function Awake(){
		_layout.doLayout(this.doLayout);
	}
	private function doLayout(rect:Rect){
	
		var scale:Vector3 = Geek.GetWorldScale(this.transform.parent);
		_collider.size = Vector2(rect.width/scale.x, rect.height/scale.y);
	}

}