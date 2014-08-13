#pragma strict

class EZMissionEventSetup{
	
	private var missions_:List.<JsonData.EvtMission> = null;
	private var gold_:int =0;
	private var silver_:int =0;
	private var cuprum_:int =0;
	public function EZMissionEventSetup(missions:List.<JsonData.EvtMission>, gold:int, silver:int, cuprum:int){
		missions_ = missions;
		gold_ = gold;
		silver_ = silver;
		cuprum_ = cuprum;
	}
	public function get gold():int{
		return gold_;
	}
	public function get silver():int{
		return silver_;
	}
	public function get cuprum():int{
		return cuprum_;
	}
	public function get list():List.<JsonData.EvtMission>{
		return missions_;
	}
}