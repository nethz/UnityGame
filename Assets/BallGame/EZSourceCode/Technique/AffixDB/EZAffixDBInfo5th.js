#pragma strict
class EZAffixDBInfo5th extends EZAffixDBInfoBase{
	public var _metal:String;
	public var _wood:String;
	public var _water:String;
	public var _fire:String;
	public var _earth:String;
	public var _other:String;
	
	public function getTitle():String{
		var ret:String = _other;
		if(this.soul == null){
			return _other;
		}
		switch(Geek.GetMagicType(this.soul.natureProp.type)){
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