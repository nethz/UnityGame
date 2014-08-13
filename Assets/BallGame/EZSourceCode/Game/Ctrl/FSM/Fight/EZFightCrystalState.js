#pragma strict
class EZFightCrystalState extends State{
	private var isOver_:boolean;
	//private var isPass_:boolean;
	public function  EZFightCrystalState(){
	
	
	}
	
	
	public function start(){
	
		isOver_ = false;
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.3);
		TaskManager.PushFront(wait, function(){
			if(EZCrystalInGame.GetInstance()){
				EZCrystalInGame.GetInstance().web();
			}
		});
		TaskManager.PushBack(wait, function(){
			isOver_ = true;
			EZModel.HeroUseCrystal();
			if(EZCrystalInGame.GetInstance()){
				EZCrystalInGame.GetInstance().reset(EZModel.GetInstance()._hero.crystal.power, EZModel.GetInstance()._hero.crystal.maxPower);
			}
			ActionManager.Run("puzzle.ignore");
			ActionManager.Run("model.hero.crystal");
		
		});
		TaskManager.Run(wait);
		
	}
	public function update(d:float):String{
		if(isOver_){
			
			return "fight.crystal.start";
			
		}
		return "";
	}
	public function over(){
	
	
	}
}
