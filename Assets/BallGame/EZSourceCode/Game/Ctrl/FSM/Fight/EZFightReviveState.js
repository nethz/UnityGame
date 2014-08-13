#pragma strict
class EZFightReviveState extends StateWithEventMap{
	
	private var isOver_:boolean = false;
	public function  EZFightReviveState(){
		Debug.Log("EZFightReviveState");
	}
	
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		var battle:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle) as EZSoul;  
		battle.revive(1.0f);
		var battleTask:EZIDTask = TaskManager.Create("view.pet.revive") as EZIDTask;
		battleTask.id = EZSoul.Seat.WeBattle;
		tl.push(battleTask);
		EZCtrl.ViewSkillBar(EZSoul.Seat.WeBattle, false);
		
		
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1) as EZSoul;  
		bag1.revive(1.0f);
		var bag1Task:EZIDTask = TaskManager.Create("view.pet.revive") as EZIDTask;
		bag1Task.id = EZSoul.Seat.WeBag1;
		tl.push(bag1Task);
		EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag1, 0);
		
		
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2) as EZSoul;  
		bag2.revive(1.0f);
		var bag2Task:EZIDTask = TaskManager.Create("view.pet.revive") as EZIDTask;
		bag2Task.id = EZSoul.Seat.WeBag2;
		tl.push(bag2Task);
		EZCtrl.ViewMagicBar(EZSoul.Seat.WeBag2, 0);
		EZCtrl.ViewCrystal(true);
		TaskManager.PushBack(tl, function(){
			
			isOver_ = true;
		
		});
		TaskManager.Run(tl);
	}
	public function update(d:float):String{
		if(isOver_){
			return "fight.run.over";
		}
		return "";
	}
}
