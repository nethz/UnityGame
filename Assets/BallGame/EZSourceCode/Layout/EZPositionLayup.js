#pragma strict
class EZPositionLayup extends MonoBehaviour{

	public enum YAxis{
		Top,
		Center,
		Bottom,
	};
	public var _yAxis:YAxis = YAxis.Center;
	public var _layout:EZTableLayout;
	public function Start(){
		_layout.doLayout(this.doLayout);
	}
	private function doLayout(rect:Rect){
		this.transform.position.x = rect.x + rect.width/2;
		
		
		if(_yAxis == YAxis.Center){
			this.transform.position.y = rect.y + rect.height/2;
		}else if(_yAxis == YAxis.Top){
			this.transform.position.y = rect.y + rect.height;
		}if(_yAxis == YAxis.Bottom){
			this.transform.position.y = rect.y;
		}
	}

}