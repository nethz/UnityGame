#pragma strict

class EZMagicTypeFailTalk extends EZFailTalk{
	public var _battleBegin:String = "";
	public var _battleEnd:String = "";
	public var _bagBegin:String = "";
	public var _bagEnd:String = "";
	public var _magicType:String[];
	
	private function hasMagicType(magicType:int):boolean{
		
		var hero:JsonData.Hero =  _loader.loadHero();
		if(hero.battle != null && hero.battle.natureProp.type == magicType){
			return true;
		}
		if(hero.bag1 != null && hero.bag1.natureProp.type == magicType){
			return true;
		}
		if(hero.bag2 != null && hero.bag2.natureProp.type == magicType){
			return true;
		}
		return false;
	}
	public function getText():String{
		
		var level:JsonData.LevelData = _loader.loadLevel();
		if(level.magicType == null){
			return null;
		}
		if(level.magicType.Length >= 1){
			if(!this.hasMagicType(level.magicType[0])){
				return _battleBegin+ _magicType[level.magicType[0]] +_battleEnd;
			}
		}
		
		
		if(level.magicType.Length >= 2){
			if(!this.hasMagicType(level.magicType[1])){
				return _bagBegin+ _magicType[level.magicType[1]] +_bagEnd;
			}
		}
		
		
		if(level.magicType.Length >= 3){
			if(!this.hasMagicType(level.magicType[2])){
				return _bagBegin+ _magicType[level.magicType[2]] +_bagEnd;
			}
		}
		
		return null;
	}
	
	
}