#pragma strict

class EZCardTeamCtrl extends EZCardPartCtrl{
	private var model_:EZPetModel = null;
	private var view_:EZPetView = null;
	private var fsmPost_:String = "";
	
	//private var enabler_:EZCardViewTeamEnabler = null;
	public function get fsmPost():String{
		return fsmPost_;
	}
	public function set fsmPost(value:String){
		this.fsmPost_ = value;
	}
	

	public function EZCardTeamCtrl(model:EZPetModel, view:EZPetView){
		//enabler_ = new EZCardViewTeamEnabler();
		model_ = model;
		view_ = view;
		//enabler_.model = model_.team;
	}
	
	public function open(){
		view_.team.show();
		view_.team.button.doDisable();// = false;
		view_.card.setEnabler(model_.teamEnabler);
		
		var cards:List.<EZCard> = model_.card.cards;
		for(var i:int = 0; i<cards.Count; ++i){
			model_.team.initCard(cards[i]);
		}
		model_.team.check();
		view_.card.refresh();
	}

	public function close(){
		view_.team.hide();
		view_.team.button.doEnable();// = true;
	}
	
	public function select(seat:EZSoul.Seat){
		model_.team.selected = seat;
	}
	public function refresh(){
		view_.team.setSelected(model_.team.selected);
		view_.team.setCards(model_.team.battle, model_.team.bag1, model_.team.bag2);
		view_.card.selectedMaterials(null);  
		view_.card.refresh();
		model_.team.save();
	}
	
	public function addCard(data:EZCard){
		model_.team.addCard(data);
		model_.team.check();
	}
	
}