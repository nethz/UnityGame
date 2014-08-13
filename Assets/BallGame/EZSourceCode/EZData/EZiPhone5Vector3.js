#pragma strict
class EZiPhone5Vector3 extends EZScreen{
	public var _iphone5:Vector3 = Vector3.zero;
	public var _other:Vector3 = Vector3.zero;
	
	private var _v3:Vector3 = Vector3.zero;
	
	public function Awake(){
		super.Awake();
		if(this.iPhone5){
			_v3 =  _iphone5;
		}else{
			_v3 =  _other;
		}
	}
	
	public function getValue():Vector3{
		return _v3;
	}
}