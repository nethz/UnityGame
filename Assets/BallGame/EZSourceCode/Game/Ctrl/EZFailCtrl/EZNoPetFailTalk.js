#pragma strict



class EZNoPetFailTalk extends EZFailTalk{
	public var _text:String = "";
	public function getText():String{
	
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		
		
		
		var hero:JsonData.Hero =  _loader.loadHero();
		
		var n:int = 0;
		
		if(hero.battle != null){
			n += 1;
		}
		if(hero.bag1 != null){
			n += 1;
		}
		if(hero.bag2 != null){
			n += 1;
		}
		
		
		if(n == 0){
			return _text;
		}
		
		if(guide.twoTeam && n == 1){
			return _text;
		}
		if(guide.twoTeam && n == 2){
			return _text;
		}
		
		
		return _text;
	}
}