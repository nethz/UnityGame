#pragma strict

class EZPetSellCtrl extends EZCardPartCtrl{

	private var view_:EZPetView = null;
	private var model_:EZPetModel = null;
	
	//private var enabler_:EZCardViewSellEnabler = null;
	public function EZPetSellCtrl(model:EZPetModel, view:EZPetView){
		view_= view;
		model_ = model;
		//enabler_ = new EZCardViewSellEnabler();
		//enabler_.model = model_.sell;
	}
	
	public function open(){
		view_.card.setEnabler(model_.sellEnabler);
		view_.sell.button.doDisable();// = false;
		view_.sell.show();
		this.refresh();
	}
	public function close(){
		model_.sell.clean();
		view_.sell.button.doEnable();// = true;
		view_.sell.hide();
	}
	
	
		
	public function addCard(data:EZCard){
		Debug.Log("sell add card");
		model_.sell.addCard(data);
		//compManager_.addCard(data);
	}
	public function removeCard(data:EZCard){
		//compManager_.removeCard(data);
		model_.sell.removeCard(data);
		
	}	
	public function clear(){
		model_.sell.clean();
	}
	public function refresh(){
		
		view_.card.selectedMain(null);  
		view_.sell.setCards(model_.sell.cards);
		view_.sell.setMoney(model_.card.money);
		view_.sell.setSell(model_.sell.sell);
		view_.sell.refresh();
		
		
		view_.card.selectedMaterials(model_.sell.cards);
		view_.card.refresh();
	}
	/*
	public function openWindow(){
		view_.sell.openWindow();
	}
	
	public function closeWindow(){
		view_.sell.closeWindow();
	}*/
	
	public function goodMaterial():boolean{
		return model_.sell.goodMaterial();
	}
	
	public function sellOnlyOne():boolean{
		return model_.sellOnlyOne();
	}
	
	
	
}