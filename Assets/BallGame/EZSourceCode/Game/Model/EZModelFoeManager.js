#pragma strict
class EZModelFoeManager extends MonoBehaviour{

	private var data_:EZStronghold = null;
	public var _wildManager:EZWildManager = null;
	private var levelData_:EZLevelData = null;

	
	public function Awake(){ 
		ActionManager.registerAction("model.foe.next", nextFoeAction);
		ActionManager.registerAction("model.foe.select", selectAction);  
		ActionManager.registerAction("model.foe.drop", dropAction);
	} 
	public function OnDestroy(){
		ActionManager.unregisterAction("model.foe.drop");
		ActionManager.unregisterAction("model.foe.next");
		ActionManager.unregisterAction("model.foe.select");
	
	}
	public function load(data:JsonData.Stronghold[], docs:JsonData.WaveDoc[]){
		levelData_ = new EZLevelData();
		levelData_.load(data, docs);
		levelData_.reset();
	}
	
	private function addWildFighters()
	{
		var action:EZAddFighterAction = ActionManager.Create("model.calc.addFoe");
		action.battle = this._wildManager.bag1.fighter;
		action.bag1 = this._wildManager.bag2.fighter;
		action.bag2 = this._wildManager.battle.fighter;
		ActionManager.Run(action);
		//_calculator.addFoeFighter(0, this._wildManager.bag1.fighter);
		//_calculator.addFoeFighter(1, this._wildManager.bag2.fighter);
		//_calculator.addFoeFighter(2, this._wildManager.battle.fighter);
	}
	
	public function nextFoe():EZStronghold{
		var  stronghold = levelData_.currStronghold;
		levelData_.next();
		if(stronghold!= null){
			this._wildManager.comeIn(stronghold);
			this.addWildFighters();
		}else{
			stronghold = new EZGameOverStronghold();
			stronghold.position = levelData_.count;
		}
		return stronghold;
	}
	public function nextFoeAction():ActionObj{
		 var action:EZFoeNextAction = new EZFoeNextAction();
		 action.execute = function(){
		 	data_ = this.nextFoe();
		 	action.setData(data_);
		 };
		 return action;
	
	}
	public function getData(){
		
	}
	public function selectAction():ActionObj{
		 var action:EZIDRetAction = new EZIDRetAction();
		 action.execute = function(){
		 	action.ret = _wildManager.select(action.id);
		 };
		 return action;
	}
	public function getFoe(id:EZSoul.Seat):EZModelFoe{
		var ret:EZModelFoe = null;
		switch(id){
		case EZSoul.Seat.FoeBattle:
			ret = this._wildManager.battle;
			break;
		case EZSoul.Seat.FoeBag1:
			ret = this._wildManager.bag1;
			break;
		case EZSoul.Seat.FoeBag2:
			ret = this._wildManager.bag2;
			break;
			
		}
		return ret;
	
	}
	public function dropAction():ActionObj{
		 var action:EZIDDropDataAction = new EZIDDropDataAction();
		 action.execute = function(){
		 	var foe:EZModelFoe = this.getFoe(action.id);
		 	if(foe){
		 		var info:EZFoeInfo = foe.getInfo();
		 		if(info){
		 		
		 			action.dropQuality = info.dropQuality;
		 		}
		 	}
		 };
		 
		 
		 return action;
	
	}
	
	

	

}