#pragma strict
class EZFightRunAttackState extends StateWithEventMap{
	private var isOver_:boolean;
	private var context_:EZModelContext;
	function EZFightRunAttackState(context:EZModelContext){
		this.context_ = context;
	} 
	
	private function doTechnique(tl:TaskList, action:EZCalculatorAction){
		 action.technique.data.prepare();
		
		 if(!action.technique.data.block){
		 	 TaskManager.PushFront(tl, function(){
		 	 	doPop(action.technique);
		 	 
		 	 });
			 switch(action.type){
			 case EZCalculatorAction.Type.Crystal:
			 	doCrystal(tl, action.technique);
			 	break;
			 case EZCalculatorAction.Type.Magic: 
			 	doMagic(tl, action.technique);
			 	break;
			 case EZCalculatorAction.Type.Skill: 
			 	doSkill(tl, action.technique);
			 	break;
			 case EZCalculatorAction.Type.Attack: 
			 	doAttack(tl, action.technique);
			 	break;
			 }
		 }else{
		 	EZCtrl.CreateBindAction(action.technique.data.block);
		 	EZCtrl.ViewMagicBar(action.technique.from, 0);
		 }
		 
	} 
	private function doPop(technique:EZTechniqueData):Task{
	
		var affix:EZAffix[] = technique.affixes;
		if(affix){
		
			var action:EZIDTextAction = ActionManager.Create("view.hud.text") as EZIDTextAction;
			action.color = Color.yellow;
			
			action.id = technique.from; 
			
			var techTitle:String = EZAffixDB.GetInstance().getTitle(technique.mark);
			if(String.IsNullOrEmpty(techTitle)){
			
				for(var i:int = 0; i< affix.Length; ++i){
					if(affix[i].mold != EZAffixFactory.Mold.Original){
						var title:String = EZAffixDB.GetInstance().getTitle(affix[i].mark, affix[i].type);
						if(!String.IsNullOrEmpty(title)){
							action.text = title;
							ActionManager.Run(action);
						}
					}
					
				}
			
			}else{
				action.text = techTitle;
				ActionManager.Run(action);
			
			}
					
			
		}
	
	}
	private function doCrystal(tl:TaskList, technique:EZTechniqueData){
		var aTask:EZIDTask = null;
		aTask = TaskManager.Create("view.pet.crystal") as EZIDTask;
		aTask.id = EZToolkits.ModelSeatToViewID(technique.from);
		tl.push(aTask);
		Debug.LogWarning(technique);
		Debug.LogWarning(technique.data);
		EZTechniqueHandler.DoTechnique(tl, technique, EZTechniqueHandler.WildDie()); 
		
	}
	private function doAttack(tl:TaskList, technique:EZTechniqueData){
	
	 	var aTask:EZIDTask = null;
	 	
		aTask = TaskManager.Create("view.pet.attack") as EZIDTask;
	 
		aTask.id = EZToolkits.ModelSeatToViewID(technique.from);
		tl.push(aTask);
		EZTechniqueHandler.DoTechnique(tl, technique, EZTechniqueHandler.WildDie()); 
		var soul:EZSoul = EZContainerManager.GetSoul(technique.from);
		if(soul){
			soul.resetAttackPower();
			soul.resetSkillPower();
		}
		
	}
	
	private function doMagic(tl:TaskList, technique:EZTechniqueData){
	 	var from:EZSoul = EZContainerManager.GetSoul(technique.from) as EZSoul; 
		var task:EZIDTask = null;
		var mt:MultiTask = new MultiTask();
		task = TaskManager.Create("view.pet.magic") as EZIDTask;
		
		task.id = EZToolkits.ModelSeatToViewID(technique.from);
		
		mt.push(task);
		

		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.3);
		TaskManager.PushBack(wait, function(){
			var soul:EZSoul = EZContainerManager.GetSoul(technique.from);
			if(soul){
				soul.resetMagicPower();
				EZCtrl.ViewMagicBar(soul, 0);
			}
			
		});
		mt.push(wait);
		
		
			
		tl.push(mt);
		
		EZTechniqueHandler.DoTechnique(tl, technique, EZTechniqueHandler.WildDie());
		
					
		
		
		
	}
	
	private function doSkill(tl:TaskList, technique:EZTechniqueData){ 
	
		var task:EZIDTask = null;
		
		var mt:MultiTask = new MultiTask();
		task = TaskManager.Create("view.pet.attack") as EZIDTask;
		task.id = EZToolkits.ModelSeatToViewID(technique.from);
		
		mt.push(task);
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.3);
		TaskManager.PushBack(wait, function(){
			var soul:EZSoul = EZContainerManager.GetSoul(technique.from);
			if(soul){
				soul.resetAttackPower();
				soul.resetSkillPower();
				EZCtrl.ViewSkillBar(soul.seat, false);
			}
		});
		//TaskManager.Run(wait);
		mt.push(wait);
		tl.push(mt);
		EZTechniqueHandler.DoTechnique(tl, technique, EZTechniqueHandler.WildDie()); 
		
		
	}
	
	
	
	
	
	
	function start(){
		this.isOver_ = false;
		
		var action:EZCalculatorAction = ActionManager.Create("model.calc.attack") as EZCalculatorAction;
		action.id  = this.context_.attackId ;
		ActionManager.Run(action);
		if(action.technique && !action.technique.data){
		
			var soul:EZSoul = EZContainerManager.GetSoul(action.technique.from);
			if(soul){
				var handler:EZBuffHandler = soul.getBuffHandler();
				EZCtrl.BuffFlicker(handler.flickerIt());
			}
			
		}
		var run:TaskList = new TaskList();
		
		if(action.seat == EZSoul.Seat.WeBattle){
			var closeHit:EZWaitTask = new EZWaitTask();
			closeHit.setAllTime(1f);
			TaskManager.PushBack(closeHit, function(){
				EZUIHit.GetInstance().close();
				if(EZBallFailTalk.GetInstance()){
					EZBallFailTalk.GetInstance().close();
				}
			});
			TaskManager.Run(closeHit);
		
		}
		if(action.technique){
			if(action.technique.data){
				EZAttackHandler.Reset();
				var tl:TaskList = new TaskList();
				doTechnique(tl, action);
				
				TaskManager.PushFront(tl, function(){
					EZCtrl.ViewFoeBar(action.technique.from, 0);
				});
				
				TaskManager.PushBack(tl, function(){
					this.context_.attackId = this.context_.attackId + 1;
					this.isOver_= true;
				});
				
				
				run.push(tl);
			
			}else{
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime(0.3);
				TaskManager.PushBack(wait, function(){
					EZCtrl.ViewSkillBar(action.technique.from, false);
					
					soul.resetAttackPower();
					soul.resetSkillPower();
					this.context_.attackId = this.context_.attackId + 1;
					this.isOver_ = true;
				});
				
				run.push(wait);
				
			}
		}else{
	
			var wait2:EZWaitTask = new EZWaitTask();
			wait2.setAllTime(0.1);
			TaskManager.PushBack(wait2, function(){
				
				this.context_.attackId = this.context_.attackId + 1;
				this.isOver_ = true;
			});
			
		
			run.push(wait2);
			
		}
	
		
		TaskManager.Run(run);
		
		
	}
	
	function update(d:float){
		if(this.isOver_){
			if(this.context_.attackId < this.context_.count) {
				return "fight.run.attack";
			}else{
				if(EZContainerManager.FightOver()){
					return "fight.run.over";
				}else{
					return "fight.run.dot";
				}
			}
		}
		return "";
	}
}
