#pragma strict

class EZShiftTest extends MonoBehaviour{                     
	public function Start(){
		var tl:TaskList = new TaskList();
		
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5);
		
		TaskManager.PushBack(wait, function(){
			var handler:EZShiftHandler = new EZShiftHandler();
			var soul:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.FoeBattle) as EZSoul;
			handler.refresh(soul);
			handler.shifted();
		});
		tl.push(wait);
		
		
		
		TaskManager.Run(tl);
		
	}
}