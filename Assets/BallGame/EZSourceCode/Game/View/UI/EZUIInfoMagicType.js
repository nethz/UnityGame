#pragma strict

class EZUIInfoMagicType extends MonoBehaviour{

	public var _metal:String;
	public var _wood:String;
	public var _water:String;
	public var _fire:String;
	public var _earth:String;
	public var _main:UISprite[];
	public var _reinforced:UISprite;
	public var _reinforce:UISprite;
	public var _neutralized:UISprite;
	public var _neutralize:UISprite;
	public function Awake(){
		//setup(Geek.MagicType.Fire);
	}
	private function getSpriteName(magicType:Geek.MagicType):String{
		var ret:String = "";
		switch(magicType){
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

	public function setup(magicType:Geek.MagicType){
		for(var i:int =0; i<_main.length; ++i){
			_main[i].spriteName = this.getSpriteName(magicType);
		}
		_reinforced.spriteName = getSpriteName(Geek.GetReinforced(magicType));
		_reinforce.spriteName = getSpriteName(Geek.GetReinforce(magicType));
		_neutralized.spriteName = getSpriteName(Geek.GetNeutralized(magicType));
		_neutralize.spriteName = getSpriteName(Geek.GetNeutralize(magicType));
	
	
	
		
	}
	
}