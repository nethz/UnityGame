#pragma strict
class EZUIForTouch extends MonoBehaviour{
	
	public function OnPress(state:boolean){
		var touch:EZTouch = EZTouch.GetInstance();
		if(touch){
			if(state){
				
				touch.inputDown(new MouseEvent(0, UICamera.lastTouchPosition));
			}else{
				if(Input.GetMouseButtonUp(0)){
					touch.inputUp(new MouseEvent(0, UICamera.lastTouchPosition));
				}
				
			}
		}
	
	}
	
	

}