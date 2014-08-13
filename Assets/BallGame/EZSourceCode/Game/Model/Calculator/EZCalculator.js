#pragma strict
class EZCalculator extends MonoBehaviour
{	
	private var list_:EZFighter[] = null;
	
	private var weFighters_:EZFighter[] = new EZFighter[3];
	private var foeFighters_:EZFighter[] = new EZFighter[3];
	
	private  function addWeAction():ActionObj{
		var action:EZAddFighterAction = new EZAddFighterAction();
		action.execute = function(){
			this.addWeFighter(0, action.battle);
			this.addWeFighter(1, action.bag1);
			this.addWeFighter(2, action.bag2);
		};
		return action;
		
	}
	
	private  function addFoeAction():ActionObj{
		var action:EZAddFighterAction = new EZAddFighterAction();
		action.execute = function(){
			this.addFoeFighter(0, action.battle);
			this.addFoeFighter(1, action.bag1);
			this.addFoeFighter(2, action.bag2);
		};
		return action;
	}
	private function addWeFighter(id:int, fighter:EZFighter){
		weFighters_[id] = fighter;
	}
	
	private function addFoeFighter(id:int, fighter:EZFighter){
		foeFighters_[id] = fighter;
	}
	private function matchTarget(){
	
		var foeTarget:EZFighter = null;
		for(var i:int=0; i< foeFighters_.Length; ++i){
			if(foeFighters_[i] !== null){
				foeFighters_[i].target = weFighters_[0];
			}
			if(foeFighters_[i].isTargeted() && foeFighters_[i].alive()){
				foeTarget = foeFighters_[i];
			}
		}
		if(foeTarget == null){
			for(var m:int=0; m< foeFighters_.Length; ++m){
				
				if(foeFighters_[m] && foeFighters_[m].alive() ){ 
				
					foeTarget = foeFighters_[m];
					break;
				}
			}
		}
		for(var n:int=0; n< weFighters_.Length; ++n){
			weFighters_[n].target = foeTarget;
		}
	}
	public function foeEmpty(){
		for(var i:int = 0; i<foeFighters_.length; ++i){
			foeFighters_[i] = null;
		}
	}
	
	
	
	public function Awake(){
		registerAction();
	}
	public function OnDestroy(){
		unregisterAction();
	}
	public function magicResult(fighter:EZFighter):EZTechniqueData{
		if(fighter.alive()){
			var magic:EZTechnique = fighter.getMagic(fighter.target.getSeat()) as EZTechnique;
			if(magic){
				var rst:EZTechniqueData = magic.execute() as EZTechniqueData;
				return rst;
			} 
			
		}
		return null;
	}
	
	public function crystalResult(fighter:EZFighter):EZTechniqueData{
		if(fighter.alive() && fighter.getCrystal){
			var crystal:EZTechnique = fighter.getCrystal(fighter.target.getSeat()) as EZTechnique;
			if(crystal){
				crystal.print();
				var rst:EZTechniqueData = crystal.execute() as EZTechniqueData;
				return rst;
			}
		}
		return null;
	}
	
	public function attackResult(fighter:EZFighter):EZTechniqueData{
		
		if(fighter.alive()){
			var attack:EZTechnique = fighter.getAttack(fighter.target.getSeat()) as EZTechnique;
			if(attack){
				var rst:EZTechniqueData = attack.execute() as EZTechniqueData;
				return rst;
			}
		}
		return null;
		
	}
	public function skillResult(fighter:EZFighter):EZTechniqueData{
	
		if(fighter.alive()){
			var skill:EZTechnique = fighter.getSkill(fighter.target.getSeat()) as EZTechnique;
			if(skill){
				var rst:EZTechniqueData = skill.execute() as EZTechniqueData;
				return rst;
			}
		}
		return null;
	}
		
	public function calculatorAction():ActionObj{ 
		
		var action:EZCalculatorAction = new EZCalculatorAction();
		action.execute = function(){
			var fighter:EZFighter = this.list_[action.id];
			action.seat = fighter.getSeat();
			var soul:EZSoul = EZContainerManager.GetSoul(action.seat) as EZSoul;
			
			
			if(action.technique == null){
				action.technique = crystalResult(fighter);
				action.type = EZCalculatorAction.Type.Crystal;
			}
			if(action.technique == null){
				action.technique = magicResult(fighter);
				action.type = EZCalculatorAction.Type.Magic;
			}
			
			if(action.technique == null){
				action.technique = skillResult(fighter);
				action.type = EZCalculatorAction.Type.Skill;
			}
			if(action.technique == null){
				action.technique = attackResult(fighter);
				action.type = EZCalculatorAction.Type.Attack;
			}
			
			
		};
		
		return action;
		
	}
	public function shiftAction():ActionObj{
		var action:EZShiftAction = new EZShiftAction();
		action.execute = function(){
		
		
			var fighter:EZFighter = this.list_[action.id];
			
			action.seat = fighter.getSeat();
			var soul:EZSoul = EZContainerManager.GetSoul(action.seat) as EZSoul;
			if(soul.alive){
				var handler:EZShiftHandler = new EZShiftHandler();
				handler.refresh(soul);
				handler.shifted();
			}
			
			
		};
		
		return action;
	
	}
	public function unregisterAction(){
		ActionManager.unregisterAction("model.calc.sort");
		ActionManager.unregisterAction("model.calc.start");
		ActionManager.unregisterAction("model.calc.shift"); 
		ActionManager.unregisterAction("model.calc.attack"); 
		ActionManager.unregisterAction("model.calc.over"); 
		ActionManager.unregisterAction("model.calc.addWe"); 
		ActionManager.unregisterAction("model.calc.addFoe"); 
		
		
	
	}
	public function registerAction(){
		ActionManager.registerAction("model.calc.start", this.startAction);
		ActionManager.registerAction("model.calc.sort", this.sortAction);
		ActionManager.registerAction("model.calc.shift", this.shiftAction);
		ActionManager.registerAction("model.calc.attack", this.calculatorAction); 
		ActionManager.registerAction("model.calc.over", this.overAction); 
		ActionManager.registerAction("model.calc.addWe", this.addWeAction); 
		ActionManager.registerAction("model.calc.addFoe", this.addFoeAction); 
	}
	public function  getFighter(id:int){
		return this.list_[id];
	}

	private function startAction():ActionObj{

		var action:EZIDListAction = new EZIDListAction();
		action.execute = function(){
			
			this.matchTarget();
			this.start();
			
			
			var speedList:EZSoul.Seat[] = new EZSoul.Seat[list_.Length];
			for(var i:int =0; i<speedList.Length; ++i){
				speedList[i] = list_[i].getSeat();
			}
			action.list = speedList;
			
			
		};
		return action;
	}
	private function doInitiative(list:EZSoul.Seat[]){ 
		var we:boolean = false;
		var foe:boolean = false;
		for(var i:int = 0; i <list.Length; ++i){ 
			var container:EZContainer = EZContainerManager.GetContainer(list[i]);
			switch(list[i]){ 
			case EZSoul.Seat.WeBattle:
			case EZSoul.Seat.WeBag1:
			case EZSoul.Seat.WeBag2: 
				we = true;
				if(foe){
					container.initiative = false;
				}else{
					container.initiative = true;
				}
				break;
			case EZSoul.Seat.FoeBattle:
			case EZSoul.Seat.FoeBag1:
			case EZSoul.Seat.FoeBag2: 
				foe = true; 
				if(we){
					container.initiative = false;
				}else{
					container.initiative = true;
				}
				break;
			
			}
			 
		}
	
	}
	private function sortAction():ActionObj{

		var action:EZIDListAction = new EZIDListAction();
		action.execute = function(){
			this.sort();
			var speedList:EZSoul.Seat[] = new EZSoul.Seat[list_.Length];
			for(var i:int =0; i<speedList.Length; ++i){
				if(list_[i].thinking){
					list_[i].thinking();
				}
				var seat:EZSoul.Seat = list_[i].getSeat(); 
				
				speedList[i] = seat;
			}
			doInitiative(speedList);
			action.list = speedList;
		};
		return action;
	}
	

	private function start(){
		for(var i:int; i<list_.Length; ++i){
			list_[i].start();
		}
	
	}
	private function overAction():ActionObj{
		
		var action:ActionObj = new ActionObj();
		action.execute = function(){
			
			for(var i:int; i<list_.Length; ++i){
				list_[i].over();
			}
		};
		return action;
	}
	public function sort(){
		var count:int = 0; 
		var list:Array = new Array(); 
		for(var p:int; p < weFighters_.length; ++p){ 
			if(weFighters_[p] != null && weFighters_[p].alive()){
				list.push(weFighters_[p]); 
			}
		}
		
		for(var q:int; q < foeFighters_.length; ++q){
			if(foeFighters_[q] != null && foeFighters_[q].alive()){
				list.push(foeFighters_[q]); 
			}
		}
		
		
		
		list_ = new EZFighter[list.length]; 
		for(var i:int = 0; i< list.length; ++i){
			list_[i] = list[i] as EZFighter; 
		}
		System.Array.Sort(this.list_, 
   	 		function(a:EZFighter, b:EZFighter):int
   	 		{	
   	 			return (Random.Range(0, 100)%2 == 0) ? -1 : 1;
   	 			
   	 		}
 		);
		System.Array.Sort(this.list_, 
   	 		function(a:EZFighter, b:EZFighter):int
   	 		{	
   	 			var aSpeed:float = a.getSpeed();
   	 			var bSpeed:float = b.getSpeed();
   	 			if( aSpeed > bSpeed) return -1; 
   	 			return 1;
   	 		}
 		);
	}
	
	
}