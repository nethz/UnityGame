#pragma strict


class EZFightRunDotState extends StateWithEventMap{
	private var isOver_:boolean;
	
	
	//private var techniqueHandler_:EZTechniqueHandler;
	function EZFightRunDotState(){
		//techniqueHandler_ = new EZTechniqueHandler();
	}
		
	function doDot(tl:TaskList, dot:EZDot){
		
		
		var context:EZDotContext = new EZDotContext();
		dot.execute(context);
		dot.doClose();
		var task:Task = new Task();
		TaskManager.PushBack(
			task,
			function(){
				if(dot.enabled){
					EZCtrl.FlickerNumberBindAction(dot.data, dot.to);
				}else{
					EZCtrl.CloseBindAction(dot.data, dot.to);
				}
			}
		);
		
		
		tl.push(task);
		EZTechniqueHandler.DoDot(tl, context.data, context.from, context.to);
		tl.push(EZTechniqueHandler.HeroDie());
		tl.push(EZTechniqueHandler.WildDie());
		
	}
	function start(){
		
		isOver_ = false;
		var manager:EZDotManager = EZDotManager.GetInstance();
		var dots:EZDot[] = manager.refresh();
		
	
		
		
		var tl:TaskList = new TaskList();
		
		EZAttackHandler.Reset();
		for(var i:int =0; i< dots.length; ++i){
			var dot:EZDot = dots[i];
			if(dot.enabled){
				var soul:EZSoul = dot.gameObject.GetComponent(EZSoul) as EZSoul;
				if(soul && soul.alive){
					doDot(tl, dot);
				}
				
			}
		}
	
		
		TaskManager.PushBack(tl, function(){this.isOver_ = true;});
		TaskManager.Run(tl);
		
		
	} 
	function update(d:float){
		if(isOver_){
			if(EZContainerManager.FightOver()){
				return "fight.run.over";
			}else{
				return "fight.run.shift";
			}
		
		}
		
		return "";
	}
}
