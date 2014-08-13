#pragma strict


class EZPVPFightRunBuffState extends StateWithEventMap{
	
	public function start(){
		Debug.Log("EZPVPFightRunBuffState");
		var manager:EZBuffManager = EZBuffManager.GetInstance();
		manager.refresh();
		var round:Array = manager.doRound();
		EZCtrl.BuffFlickerNumber(round);
		EZCtrl.BuffClose(manager.doClose());
		
	}
	
	function update(d:float){
		return "fight.run.over";
		
	}
}
