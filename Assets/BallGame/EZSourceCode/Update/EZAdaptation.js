#pragma strict
class EZAdaptation extends EZScreen{
	public var _root:UIRoot = null;
	
	public function Awake(){
		super.Awake();
		if(this.iPhone5){
			_root.manualHeight = 1136;
		}else if(this.iPhone4){
			
			_root.manualHeight = 960;
		}
	}
	
}