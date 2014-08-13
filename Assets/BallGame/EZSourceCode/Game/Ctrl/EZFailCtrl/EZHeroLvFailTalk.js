#pragma strict


class EZHeroLvFailTalk extends EZFailTalk{
	public var _text:String = "";
	public function getText():String{
		var level:JsonData.LevelData = _loader.loadLevel();
		var hero:JsonData.Hero =  _loader.loadHero();
		
		if(hero.lv >= level.minHeroLv){
			return null;
		}
		
		return _text;
	}
}