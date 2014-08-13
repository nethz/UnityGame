#pragma strict

class EZInputHandler extends MonoBehaviour
{
	public var _position:Vector2 = Vector2.zero;
	public var _box:BoxCollider = null;
	private function dealEvent(evt:EZMouseEvent):EZMouseEvent{ 
		var cam:Camera =  UICamera.currentCamera;
		var position:Vector3  = cam.WorldToScreenPoint(this.gameObject.transform.position);
		var abc:Vector3  = cam.ScreenToViewportPoint(evt.absolute - position);  
		evt.worldPoint = cam.ScreenToWorldPoint(evt.absolute); 
		
		var scale:Vector3 = Geek.GetWorldScale(this.gameObject.transform); 
		var r = (cam.GetScreenWidth()/ cam.GetScreenHeight()) ;   
		
		var v:Vector3 = Vector3((_box.size.x* scale.x)/(r *2), (_box.size.y* scale.y)/2 , 1);
		evt.position = Vector3(abc.x/v.x, (abc.y)/v.y , 1);   
		evt.position.x = Mathf.Clamp01(evt.position.x);
		if(evt.position.x == 1.0f){
			evt.position.x = 0.99999f;
		}
		evt.position.y = Mathf.Clamp01(evt.position.y);
		if(evt.position.y == 1.0f){
			evt.position.y = 0.99999f;
		}
		_position = evt.position;
		//evt.worldPoint.y = (evt.position.y * _box.size.y *2)/scale.y + this.gameObject.transform.position;
		return evt;
	}
	
	protected function inputMove(evt:EZMouseEvent){}
	protected function inputUp(evt:EZMouseEvent){}
	protected function inputDown(evt:EZMouseEvent){}
	
	public function doMove(evt:EZMouseEvent){
		inputMove(dealEvent(evt));
	}
	public function doUp(evt:EZMouseEvent){
		inputUp(dealEvent(evt));
	}
	public function doDown(evt:EZMouseEvent){
		inputDown(dealEvent(evt));
	}
	
	
	public function OnPress(press:boolean){
		if(press){
			doDown(new EZMouseEvent(0, UICamera.lastTouchPosition));
		}else{
			doUp(new EZMouseEvent(0,  UICamera.lastTouchPosition));
		}
	}
	public function OnDrag(delta:Vector2){
		doMove(new EZMouseEvent(0, UICamera.lastTouchPosition));
	}
	
	
}