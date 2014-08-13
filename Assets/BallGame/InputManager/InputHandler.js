#pragma strict

class InputHandler extends MonoBehaviour
{
	
	public var _layout:EZLayout = null;
	function get layout():EZLayout{
		return this._layout;
	}
	private function dealEvent(evt:MouseEvent, camera:Camera):MouseEvent{
		if(_layout){
			var oldr:Rect = _layout.getRect();
			var rect:Rect = Geek.Space2Screen(oldr, camera.orthographicSize);
			evt.opposite = Vector2(evt.position.x - (rect.xMin + Screen.width/2) ,
				evt.position.y - (rect.yMin + Screen.height/2)
			);
			if(evt.opposite.x < 0.0f){
				evt.opposite.x = 0.0f;
			}else{
				if(evt.opposite.x > rect.width- 0.001f){
					evt.opposite.x = rect.width - 0.001f;
				}
			}
			
			if(evt.opposite.y < 0.0f){
				evt.opposite.y = 0.0f;
			}else{
				if(evt.opposite.y > rect.height- 0.001f){
					evt.opposite.y = rect.height - 0.001f;
				}
			}
		}else{
			evt.opposite = evt.position;
		}
		return evt;
	}
	public function doMove(evt:MouseEvent, camera:Camera){
		
		inputMove(dealEvent(evt, camera));
	}
	public function doUp(evt:MouseEvent, camera:Camera){
		inputUp(dealEvent(evt, camera));
	}
	public function doDown(evt:MouseEvent, camera:Camera){
		
		inputDown(dealEvent(evt, camera));
	}
	protected function inputMove(evt:MouseEvent){
		
	}
	protected function inputUp(evt:MouseEvent){
	}
	protected function inputDown(evt:MouseEvent){
	}
}