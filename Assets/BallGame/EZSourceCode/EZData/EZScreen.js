#pragma strict
//UnityScript
import System.Text.RegularExpressions;

class EZScreen extends MonoBehaviour{

	enum ScreenType{
		iPhone5,
		iPhone4,
		Unknow,
	
	}
	protected var type_:ScreenType = ScreenType.Unknow;
	
	public function get type():EZScreen.ScreenType{
		return type_;
	}
	
	function Awake(){
		var width:float = Screen.width;
		var height:float = Screen.height;
		var radio:float = width/height;
		if(radio < 0.6f){
			type_ = ScreenType.iPhone5;
		}else{
			type_ = ScreenType.iPhone4;
		}
			
		
	}
	
	public function get iPhone5():boolean{
		return type_ == ScreenType.iPhone5;
	}
	public function get iPhone4():boolean{
		return type_ == ScreenType.iPhone4;
	}
	public function get Unknow():boolean{
		return type_ == ScreenType.Unknow;
	}
	
	

}