#pragma strict


class EZWalkState extends StateWithEventMap{

	private var isOver_:boolean;
	
	private var map_:EZGameMapView = null;
	public function EZWalkState(map:EZGameMapView){
		map_ = map;
	}
	public function start(){
	
		isOver_ = false;
		var tl:TaskList = new TaskList();
	
		var mt:MultiTask = new MultiTask();
		var wait:Task = TaskManager.instance().factories.createTask("rpg.camera.right") as Task;
		
		mt.push(wait);
		if(EZCrystalInGame.GetInstance()){
			mt.push(EZCrystalInGame.GetInstance().showTask());
		}
		mt.push(map_.hideMapTask());
		tl.push(mt);
		
		var fighting:EZFighterTask = TaskManager.Create("view.player.fighting") as EZFighterTask;
				

		var battle:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle) as EZSoul;
		fighting.battle = battle.appear(EZCtrl.index);
		
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1) as EZSoul;
		fighting.bag1 = bag1.appear(EZCtrl.index);
		
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2) as EZSoul;
		fighting.bag2 = bag2.appear(EZCtrl.index);

		tl.push(fighting);

		
		TaskManager.PushBack(tl, function(){this.isOver_ = true;});
		TaskManager.Run(tl);
	}
	public function update(d:float){
		if(isOver_){
			return "fight.begin.ready";
		}
		return "";
	}
	public function over(){
	
	}
}