#pragma strict

class EZFailCtrl extends MonoBehaviour{
	public var _default:String = "";
	private static var instance_:EZFailCtrl = null;
	public var _talks:EZFailTalk[] = null;
	function Awake(){
		this.instance_ = this;
	}
	
	
	public static function GetText(){
		for(var i:int = 0; i<instance_._talks.Length; ++i){
			var text:String = instance_._talks[i].getText();
			if(!String.IsNullOrEmpty(text)){
				return text;
			}
			
		}
		return this.instance_._default;
	}
	
}