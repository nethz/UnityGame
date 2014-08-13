#pragma strict

class EZShopBarNormalState extends State{

	public function EZShopBarNormalState(){
	}
	
	public function start(){
		
		//loading_.reload();
		//bar_.open();
	
	}
	public function postEvent(evt:FSMEvent){
		if(evt.msg == "go_energy"){
		
			
			var player:JsonData.Player = EZPlayerTable.GetInstance().data; 	
			var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		
		
			if(player.diamond >=  setup.game.ap_diamond){
				return "shop.bar.energy.select";
			}else{
				return "shop.bar.nodiamond";
			}
			
		}
		return super.postEvent(evt);
	}
	
	
}