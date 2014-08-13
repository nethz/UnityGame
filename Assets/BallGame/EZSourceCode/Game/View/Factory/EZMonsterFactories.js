#pragma strict

class EZMonsterFactories extends MonoBehaviour{
	private static var instance_:EZMonsterFactories = null;
	public var _wood:EZMonsterFactory;
	public var _fire:EZMonsterFactory;
	public var _metal:EZMonsterFactory;
	public var _water:EZMonsterFactory;
	public var _earth:EZMonsterFactory;

	private var _shadowMode:float = 1.25f;
	public function set shadowMode(value:float){
		_shadowMode = value;
	}
	public function Awake(){
		instance_ = this;
		

	}
	public static function Release(){
	
		GameObject.DestroyObject(instance_._wood.gameObject);
		GameObject.DestroyObject(instance_._fire.gameObject);
		GameObject.DestroyObject(instance_._metal.gameObject);
		GameObject.DestroyObject(instance_._water.gameObject);
		GameObject.DestroyObject(instance_._earth.gameObject);
		
		Resources.UnloadUnusedAssets();
		System.GC.Collect();
	}
	public static function GetInstance():EZMonsterFactories{
		return instance_;
	}
	public function getFactory(magicType:Geek.MagicType):EZMonsterFactory{
		var factory:EZMonsterFactory = null;
		switch(magicType){
			case Geek.MagicType.Metal:
				factory = _metal;
				break;
			case Geek.MagicType.Wood:
				factory = _wood;
				break;
			case Geek.MagicType.Water:
				factory = _water;
				break;
			case Geek.MagicType.Fire:
				factory = _fire;
				break;
			case Geek.MagicType.Earth:
				factory = _earth;
			
		}
		return factory;
	
	}
	
	public function create(key:Geek.SoulKey, tf:Transform, name:String, hasHud:boolean, hasSpecially:boolean, hasGhost:boolean):EZPet{
	
		if(key == null){
			return null;
		}
		var factory:EZMonsterFactory = getFactory(key.type);
		if(factory){
			var pet:EZPet = factory.create(key, tf, name, hasHud, hasSpecially, hasGhost);
			if(pet && pet.specially){
				pet.specially.shadowMode = _shadowMode;
			}
			
			if(pet){
			
				pet.magicType = key.type;
				return pet;
			}
			return null;
		}
	
		return null;
	}

}