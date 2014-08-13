#pragma strict

class EZPetLvFailTalk extends EZFailTalk{
	public var _text:String = "";
	public function getText():String{
		var level:JsonData.LevelData = _loader.loadLevel();
		var hero:JsonData.Hero =  _loader.loadHero();
		
		if(hero.battle != null && hero.battle.baseProp.lv >= level.minLv){
			return null;
		}
		
		
		
		if(hero.bag1 != null && hero.bag1.baseProp.lv >= level.minLv){
			return null;
		}
		if(hero.bag2 != null && hero.bag2.baseProp.lv >= level.minLv){
			return null;
		}
		
		return _text;
	}
}