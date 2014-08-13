#pragma strict
class EZLayout5 extends EZLayout
{
	
	public var _screen:EZScreen = null;
	public var _layout4:EZLayout = null;
	public var _layout5:EZLayout = null;
	

	public function getRect(){
		if(_screen.iPhone5){
			return _layout5.getRect();
		}else{
			return _layout4.getRect();
		}
		
	}
}