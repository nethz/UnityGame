#pragma strict

#pragma strict



class EZBindMagicType extends EZBindString{
	
	public var _metal:String; 
	public var _wood:String; 
	public var _water:String; 
	public var _fire:String; 
	public var _earth:String; 
	public var _none:String; 
	public function text(data:EZBindData):String{
		var ret:String = _none;
		switch(data.magicType){
			case Geek.MagicType.Metal:
				ret = _metal;
			break;
			case Geek.MagicType.Wood:
				ret = _wood;
			break;
			case Geek.MagicType.Water:
				ret = _water;
			break;
			case Geek.MagicType.Fire:
				ret = _fire;
			break;
			case Geek.MagicType.Earth:
				ret = _earth;
			break;
		}
		return ret;
	}
}