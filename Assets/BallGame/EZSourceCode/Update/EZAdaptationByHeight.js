#pragma strict

class EZAdaptationByHeight extends MonoBehaviour{
	public var _root:UIRoot = null;
	
	public function Awake(){
		_root.scalingStyle = UIRoot.Scaling.FixedSize;
		_root.manualHeight = Screen.height;
	}
}