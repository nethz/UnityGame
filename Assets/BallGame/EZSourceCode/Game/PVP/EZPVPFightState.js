#pragma strict
class EZPVPFightState extends StateWithEventMap{
	//private var isOver_:boolean;
	
	public function EZPVPFightState(){
		 
	}
	public function start(){
		
		var post:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
		for(var i:int = 0; i<6; ++i){
			var soul:EZSoul = EZContainerManager.GetSoul(i) as EZSoul;  
			if(soul.appear(EZCtrl.index)){
				post.id = i;
				post.msg = "weakup";
				ActionManager.Run(post);
			}
		}
			
	}
	public function over(){
	
		ActionManager.Run("view.close.touch");
		var action:EZIDPostEventAction = ActionManager.Create("view.pet.postEvent") as EZIDPostEventAction;
		for(var i:int = 0; i<6; ++i){
		
			var soul:EZSoul = EZContainerManager.GetSoul(i) as EZSoul;  
			if(soul.appear(EZCtrl.index)){
				action.id = i;
				action.msg = "sleep";
				ActionManager.Run(action);
			}
			
		
		}
			
			
	}
}
