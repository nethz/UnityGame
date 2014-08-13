#pragma strict


class EZNormalAttack extends EZAttack{ 
	public function EZNormalAttack(){
		super(EZSoul.Seat.None);
	}
	public function EZNormalAttack(from:EZSoul.Seat){
		super(from);
	}
	public function clone(from:EZSoul.Seat):EZAttack{
	
		var attack:EZNormalAttack = new EZNormalAttack(from);
		return attack;
	}
	
	
	public function getHurt():float{ 
		var fsc:EZContainer = EZContainerManager.GetContainer(from_) as EZContainer; 
		
		if(fsc && fsc.soul)
		{
			var soul:EZSoul = fsc.soul; 
			var hurt = Mathf.Floor(soul.baseAttack * soul.attackPower); 
			return hurt;
		}
		return 0;
	} 
	public function getRevise(hurt:float):float{
	 	var fsc:EZContainer = EZContainerManager.GetContainer(from_) as EZContainer; 
		var tsc:EZContainer = EZContainerManager.GetContainer(target_) as EZContainer;
		
		
		if(fsc && fsc.soul && tsc && tsc.soul)
		{
			//var hurting:float = fsc.soul.hurting(hurt);
			//var hurted:float = tsc.soul.hurted(hurting);
			return hurt;
		} 
		return hurt;
	}
	
	
	public function execute(target:EZSoul.Seat):EZAttackResult{
	
		if(!EZContainerManager.Alive(target)){
			return null;
		}
		
		this.target_ = target;
		
		var result:EZAttackResult = new EZAttackResult();
		result.from = from_;
		result.to = target_;
		
		
		var hurt:float = this.getHurt(); 
		
		result.original = hurt;
		result.alter = getRevise(hurt);
		return result;
	}
	/*
	public function execute(target:EZSoul.Seat):Task{
		if(!EZContainerManager.alive(target)){
			return new Task();
		}
		this.target_ = target;
		var mtask:MultiTask = new MultiTask();
		
		var hurt:float = this.getHurt();  
		if(hurt != 0)
		{	 	
			hurt = getRevise(hurt);
			var cpt:ChangePropertyTask = TaskManager.instance().factories.createTask("ui.hurt") as ChangePropertyTask;
			cpt.setup(target,-hurt);
			cpt.setAllTime(1);
			var rnt:RPGNumberTask = TaskManager.instance().factories.createTask("rpg.text") as RPGNumberTask;
			rnt.setup(target, "-" +hurt);
			 
			rnt.setAllTime(1);
			mtask.push(cpt);
			mtask.push(rnt);
		}
		return mtask;
	}*/
};