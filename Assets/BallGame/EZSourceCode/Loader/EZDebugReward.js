#pragma strict

class EZDebugReward extends MonoBehaviour{

	var _money:int =0;
	var _exp:float =0;
	var _drops:EZDebugDrop[];
	
    var _player: String;
	public function getPlayer():JsonData.Player{
		var player:JsonData.Player = JsonData.Player.Load(_player);
		return player;
	}	
	
	/*
	public function getSetup():JsonData.Setup{
	
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		return setup;
	}*/	
	public function getHarvest():JsonData.Harvest{
		var harvest:JsonData.Harvest = new JsonData.Harvest();
	//	harvest.info = _info;  
		harvest.money = _money;
		harvest.exp = _exp;
		if(_drops){
			harvest.drops = new JsonData.Soul[_drops.Length];
			for(var i:int = 0; i<_drops.Length; ++i){
				harvest.drops[i] = _drops[i].getData();
			}
		}
		return harvest;
	}	
	
	
}