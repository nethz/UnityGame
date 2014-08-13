#pragma strict

class EZHeroPerfabsFactory extends EZHeroFactory{
	public var _prefabs:EZHero[];
	
	public function create(type:String, tf:Transform, name:String):EZHero{
		var hero:EZHero = null;
		
		for(var i:int = 0; i< _prefabs.Length; ++i){
			if(type == _prefabs[i].name){
				hero = _prefabs[i];
				break;
			}
		}
		if(hero){
			var clone:GameObject = GameObject.Instantiate(hero.gameObject);
			clone.SetActive(true);
			clone.transform.parent = tf;
			clone.transform.localPosition = Vector3(0, 0, 0);
			clone.transform.localScale  = Vector3(1, 1, 1);
			clone.name = name;
			var ret:EZHero = clone.GetComponent(EZHero) as EZHero;
			return ret;
		}
		return null;
		
	}
	
};