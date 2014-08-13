#pragma strict


class EZFightRunOverState extends StateWithEventMap{
	private var switch_:boolean;
	private var weWin_:boolean;
	private var foeWin_:boolean;

	public function start(){
	
	
		weWin_ = EZContainerManager.WeWin();
		foeWin_ = EZContainerManager.FoeWin();
		switch_ = !EZContainerManager.Alive(EZSoul.Seat.WeBattle);
		
	
	}
	public function over(){
		
	}
	
	function update(d:float){
		if(foeWin_){
			return "fight.fail.title";
		}
		
		
		if(switch_){
			return "fight.run.select";
		}
		
		
		if(weWin_){
			return "fight.award";
		}
		ActionManager.Run("model.calc.over");
		
		return "fight.ready";
	}
}
