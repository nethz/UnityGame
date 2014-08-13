#pragma strict


class EZHeroFactories extends MonoBehaviour{
	private static var instance_:EZHeroFactories = null;
	public var _factories:EZHeroFactory[];
	
	private var _shadowMode:float = 1.25f;
	public function set shadowMode(value:float){
		_shadowMode = value;
	}
	public function Awake(){
		instance_ = this;
		/*
		for(var i:int = 0; i<_proload.length; ++i){
			
			
			var hero:EZHero = EZMonsterFactories.GetInstance().create(_proload[i], this.transform, _proload[i], false, false);
			pet.layouting(null, false, this.gameObject.layer, function(){
				pet.hide();
			});
		}*/

	}
	
	public static function GetInstance():EZHeroFactories{
		return instance_;
	}
	public static function Release(){
		GameObject.DestroyObject(instance_.gameObject);
		
		Resources.UnloadUnusedAssets();
		System.GC.Collect();
	
	}
	
	public function create(type:String, tf:Transform, name:String):EZHero{
		for(var i:int=0; i<_factories.Length; ++i){
			var factory:EZHeroFactory = _factories[i];
			var hero:EZHero = factory.create(type, tf, name);
			if(hero){
				if(hero.specially){
					hero.specially.shadowMode = _shadowMode;
				}
				return hero;
			}
		
		}
			Debug.Log("????"+ _factories.Length);
		return null;
	}

}