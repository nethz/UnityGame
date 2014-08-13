#pragma strict

class EZDebugHero extends MonoBehaviour{

	var _webAvatar:boolean = true;
    var _battle : String;
    var _bag1 : String;
    var _bag2 : String;

    var _avatar : String = "boy";
	
    private function getSoul(json:String):JsonData.Soul{
		 var soul:JsonData.Soul = new JsonData.Soul.Load(json);
		 return soul; 
    }
    
	public function getData():JsonData.Hero{
		var table:EZUserTable = EZUserTable.GetInstance();
		if(_webAvatar && table && !String.IsNullOrEmpty(table.avatar)){
			_avatar = table.avatar;
		}
		var hero:JsonData.Hero = new JsonData.Hero();
		hero.avatar = _avatar;  
		hero.battle = getSoul(_battle);
		hero.bag1 = getSoul(_bag1);
		hero.bag2 = getSoul(_bag2);
		return hero;
	}

}