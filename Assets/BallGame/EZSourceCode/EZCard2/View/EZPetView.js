#pragma strict

class EZPetView extends MonoBehaviour{
	public var _info:EZPetDetailsView;
	public var _team:EZCardTeamView;
	public var _card:EZCardViewManager;
	public var _comp:EZCardCompView;
	public var _sell:EZCardSellView;
	
	
	public function get sell():EZCardSellView{
		return _sell;
	}
	public function get comp():EZCardCompView{
		return _comp;
	}
	
	public function get info():EZPetDetailsView{
		return _info;
	}
	public function get team():EZCardTeamView{
		return _team;
	}
	
	public function get card():EZCardViewManager{
		return _card;
	}


	


	

}