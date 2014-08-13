#pragma strict

class EZRivalManager extends MonoBehaviour{
		

	//public var _calculator:EZCalculator = null;
	public var _battle:EZModelBattle;
	public var _bag1:EZModelBag;
	public var _bag2:EZModelBag;
	public var _crystal:EZModelCrystal;
	
	private var fighter_:EZFighter = null;
	
	public function get crystal():EZModelCrystal{
		
		return _crystal;
	}
	
	public function get battle():EZModelBattle{
		return _battle;
	}
	public function get bag1():EZModelBag{
		return _bag1;
	}
	public function get bag2():EZModelBag{
		return _bag2;
	}

	private function createFighter():EZFighter{
		return this._battle.fighter;
		
	}
	public function Awake(){
		ActionManager.registerAction("model.rival.loader", this.loadAction);
		ActionManager.registerFunction("model.rival.bag1", function(){
			_bag1.doMagic();
			Debug.Log("Model.rival.Bag");
		});
		
		
		ActionManager.registerFunction("model.rival.bag2", function(){
			_bag2.doMagic();
			Debug.Log("Model.rival.Bag2");
		});
		
		
		
		ActionManager.registerFunction("model.rival.crystal", function(){
			_battle.doCrystal();
		});
	}
	

	public function Start(){
	/*
		var action:EZAddFighterAction = ActionManager.Create("model.calc.addFoe");
		action.battle = this._battle.fighter;
		action.bag1 = this._bag1.fighter;
		action.bag2 = this._bag2.fighter;
		ActionManager.Run(action);
	*/	
		
	
		
	}
	
	public function OnDestroy(){
		ActionManager.unregisterAction("model.rival.loader");
		ActionManager.unregisterFunction("model.rival.crystal");
		ActionManager.unregisterFunction("model.rival.bag1");
		ActionManager.unregisterFunction("model.rival.bag2");
	}
	public function loadAction():ActionObj{
		var loader:EZHeroLoaderAction = new EZHeroLoaderAction();
		loader.execute = function(){
			var hero:JsonData.Hero = loader.hero; 
			
			LoadSoul(this._battle, hero.battle);
			LoadSoul(this._bag1, hero.bag1);
			LoadSoul(this._bag2, hero.bag2);
		};
		return loader;
	} 
	public static function LoadSoul(container:EZContainer, data:JsonData.Soul){
		if(data){
			var soul:EZPetSoul = EZPetSoul.Create(data);
			container.setSoul(soul);
		}else{
			container.setSoul(EZNoneSoul.Create());
		}
	}
/*
	
	public function getWeFighter() : EZFighter{
		if(fighter_ == null)
		{
			fighter_ = this.createFighter();
		}
		return this.fighter_;
	}
*/
	
}
