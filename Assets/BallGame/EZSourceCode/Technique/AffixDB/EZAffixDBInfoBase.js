#pragma strict
class EZAffixDBInfoBase extends MonoBehaviour{
	public var _type:String;
	public var _max:int = 5;
	
	private var soul_:JsonData.Soul = null;
	//private var magicType_:Geek.MagicType = Geek.MagicType.Fire;
	private var _strings:EZAffixDBString[] = null;
	
	public function Awake(){
		this._strings = System.Array.ConvertAll(
			this.GetComponentsInChildren(EZAffixDBString), 
			function (component){component as EZAffixDBString;}
			);
	}
	
	//public function setup(magicType:Geek.MagicType){
	//	magicType_ = magicType;
	//}
	public function setup(soul:JsonData.Soul){
		soul_ = soul;
	}
	
	public function get soul():JsonData.Soul{
		return soul_;
	}
	/*
	public function get magicType():Geek.MagicType{
		return magicType_;
	}
	*/
	public function get max():int{
		return _max;
	}
	public function getTitle():String{
		return "";
	}
	public function get type():String{
		return _type;
	}
	public function text():String{
		var ret:String = ""; 
		for(var i:int =0; i< _strings.length; ++i){
			ret += _strings[i].text(soul_);
		}
		return ret;
	}

}