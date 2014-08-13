#pragma strict

class EZAdaptationVector3{

	public var _iPhone4:Vector3 = Vector3.zero;
	public var _iPhone5:Vector3 = Vector3.zero;
	private var type_:EZScreen.ScreenType = EZScreen.ScreenType.Unknow;
	public function setup(type:EZScreen.ScreenType){
		type_ = type;
	}
	public function get vector3():Vector3{
		if(type_ == EZScreen.ScreenType.iPhone5){
			return _iPhone5;
		}
		return _iPhone4;
	
	}

}