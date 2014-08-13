#pragma strict
class UIPositionLayout extends UITableLayout
{

	public function doLayoutImpl(rect:Rect, scale:Vector3){
		
		//Debug.Log("%%%%%%%" + this.gameObject.name + ((rect.xMin + rect.width/2)/scale.x));
		//this.gameObject.transform.localPosition.x = (rect.xMin + rect.width/2)/scale.x ;
		this.transform.localPosition.x =  (rect.xMin + rect.width/2)/scale.x ;
		//this.transform.localPosition.y = rect.y + scale.y * rect.height/scale.y/2;
	} 
	
	public function hidden(){
	}
	
	public function show(){
	}

}