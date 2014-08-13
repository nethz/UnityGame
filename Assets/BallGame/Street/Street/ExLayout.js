#pragma strict

class ExLayout extends EZLayout
{
	public var debug:boolean = false;
	public var ex_:exSprite = null;
	public var adaptation:Adaptation = null;
	private var r_:float = 1;
	function Awake () {
		r_ = this.ex_.width / this.ex_.height;
		this.doLayout();
	}

	private function resizeImpl(width:float, height:float){
	
		
		
//		Debug.LogWarning("www"+width + ":" + (width/this.ex_.width));
		var worldScale:Vector3 = new Vector3(1,1,1);
		if(this.transform.parent != null)
			worldScale = Geek.GetWorldScale(this.transform.parent);
			
		this.transform.localScale = new Vector3(width/this.ex_.width/worldScale.x, height/this.ex_.height/worldScale.y, height/this.ex_.height/worldScale.z);
	}

	public function getRect():Rect
	{
		
		return this.adaptation.getRect();
	
	}
	private function setXImpl(x:float){
		this.transform.position.x = x;
	}
	private function setYImpl(y:float){
		this.transform.position.y = y;
	
	}
	
	function doLayout(){
		var rect:Rect = this.getRect();
		this.resizeImpl(rect.height*r_, rect.height);
		this.setXImpl(rect.center.x);
		this.setYImpl(rect.center.y);
	
	}

}