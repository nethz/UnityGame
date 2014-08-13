#pragma strict

class FailThirdCtrl{

	private var view_:GameResultView;
	private var model_:EZGameResultModel;
	
	public function FailThirdCtrl(view:GameResultView,model:EZGameResultModel){
		this.view_ = view;
		this.model_ = model;
	}
	
	public function setEnabled(enable:boolean){
	//	view_.setEnabled(enable);
	}
	
	public function start(){
		view_.seal();
	}
	
}