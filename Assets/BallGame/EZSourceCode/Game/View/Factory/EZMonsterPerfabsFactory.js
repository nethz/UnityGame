#pragma strict

class EZMonsterPerfabsFactory extends EZMonsterFactory{
	public var _prefabs:EZPet[];
	public function Awake(){

		
	}
	public function create(key:Geek.SoulKey, tf:Transform, name:String, hasHud:boolean, hasSpecially:boolean, hasGhost:boolean):EZPet{
		var pet:EZPet = null;
		for(var i:int = 0; i< _prefabs.Length; ++i){
			if(key.style == _prefabs[i].name){
				pet = _prefabs[i];
				break;
			}
		}
		if(pet){
			if(pet._hudAndSpecially){
				pet._hudAndSpecially._hasHud = hasHud;
				pet._hudAndSpecially._hasSpecially = hasSpecially;
				pet._hudAndSpecially._hasGhost = hasGhost;
			}
			
			
			
			var clone:GameObject = GameObject.Instantiate(pet.gameObject);
			clone.SetActive(true);
			clone.transform.parent = tf;
			clone.transform.localPosition = Vector3(0,0,0);
			clone.transform.localScale  = Vector3(1, 1, 1);
			clone.name = name;
			var ret:EZPet =  clone.GetComponent(EZPet) as EZPet;
			return ret;
		}
		return null;
		
	}
	
};