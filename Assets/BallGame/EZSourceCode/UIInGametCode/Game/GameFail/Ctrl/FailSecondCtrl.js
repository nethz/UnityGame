#pragma strict

class FailSecondCtrl{

	private var view_:FailGiveupView;
	private var model_:EZGameResultModel;
	
	public function FailSecondCtrl(view:FailGiveupView, model:EZGameResultModel){
		this.view_ = view;
		this.model_ = model;
	}
	
	
	public function setEnabled(enable:boolean){
		view_.setEnabled(enable);
		view_.destoryGhosts();
	}
	
	public function start(){
		view_.setMoney(model_._getMoney);
		view_.create(5);
	}
	
}