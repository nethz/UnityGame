#pragma strict
class EZPanelReset extends MonoBehaviour{
	public var _panel:UIPanel = null; 
	private var position_:Vector3 = Vector3.zero;
	public function Awake(){
		 position_ = _panel.gameObject.transform.localPosition;
	} 
	public function reset(){
		 _panel.gameObject.transform.localPosition = position_;
	}
}