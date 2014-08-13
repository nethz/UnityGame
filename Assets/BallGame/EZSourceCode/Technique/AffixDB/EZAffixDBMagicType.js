#pragma strict

		
class EZAffixDBMagicType extends EZAffixDBString{
	public var _metal:String;
	public var _wood:String;
	public var _water:String;
	public var _fire:String;
	public var _earth:String;
	public var _other:String;
	public function text(soul:JsonData.Soul):String{
		var ret:String = _other;
		switch(Geek.GetMagicType(soul.natureProp.type)){
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