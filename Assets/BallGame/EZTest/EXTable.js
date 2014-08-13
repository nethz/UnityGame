#pragma strict
class EXTable extends MonoBehaviour{
	public var _layout:EZTableLayout;
	public var ex_:exSprite = null;
	
	
	
	function Awake () {
		_layout.doLayout(this.doLayout);
	}

	private function resizeImpl(width:float, height:float){
		
		var worldScale:Vector3 = new Vector3(1,1,1);
		if(this.transform.parent != null)
			worldScale = Geek.GetWorldScale(this.transform.parent);
			
		this.transform.localScale = new Vector3(width/this.ex_.width/worldScale.x, height/this.ex_.height/worldScale.y, height/this.ex_.height/worldScale.z);
	}


	private function setXImpl(x:float){
		this.transform.position.x = x;
	}
	private function setYImpl(y:float){
		this.transform.position.y = y;
	
	}
	
	function doLayout(rect:Rect){
		this.resizeImpl(rect.width, rect.height);
		this.setXImpl(rect.center.x);
		this.setYImpl(rect.center.y);
	
	}

}