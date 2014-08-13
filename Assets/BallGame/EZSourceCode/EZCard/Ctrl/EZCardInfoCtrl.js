#pragma strict

class EZCardInfoCtrl extends EZCardPartCtrl{

	private var view_:EZPetView = null;
	
	private var model_:EZPetModel = null;
	//private var info_:EZPetInfoModel = null;
	private var needUpdate_:boolean = false;
	//private var enabler_:EZCardViewInfoEnabler = null;
	//private var 
	public function get needUpdate():boolean{
		return needUpdate_;
	}
	
	public function set needUpdate(value:boolean){
		needUpdate_ = value;
	}
	public function EZCardInfoCtrl(model:EZPetModel, view:EZPetView){
	
		//enabler_
		//enabler_ = new EZCardViewInfoEnabler();
		view_= view;
		model_ = model;
	}
	public function open(){
		Debug.Log("EZCardInfoCtrl Open");
		view_.info.button.doDisable();
		view_.info.show();
		model_.info.setCard(view_.card.firstCard);
		view_.card.setEnabler(model_.infoEnabler);
		this.refresh();
	}
	public function close(){
		view_.info.button.doEnable();// = true;
		view_.info.hide();
		view_.card.selectedMain(null);
		view_.card.refresh();
	}
	public function setPetInfoTask(card:EZCard):Task{
		return view_.info.setPetInfoTask(card);
	}
	
	public function showAffixInfo(enable:boolean){
		view_.info.showAffixInfo(enable);
	}
	
	public function addCard(data:EZCard){
		model_.info.setCard(data);
	}
	
	public function get card():EZCard{
		return model_.info.getCard();
	}
	public function removeCard(data:EZCard){
		
	}
	
	public function mark(name:String){
		model_.info.mark(name);
	}
	
	public function get userLocked():EZCard.UserLocked{
		return model_.info.userLocked;
	}
	
	public function set userLocked(value:EZCard.UserLocked){
		model_.info.userLocked = value;
	}
	
	public function refresh(){
		view_.card.selectedMain(model_.info.getCard());  
		view_.card.selectedMaterials(null);  
		view_.card.refresh();
		needUpdate_ = true;
	}
	
	public function switchBtnAffix(name:String){
		view_.info.switchBtnAffix(name);
	}
}