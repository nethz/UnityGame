#pragma strict

class FailFirstCtrl{

	private var view_:FailReviveView;
	private var model_:EZGameResultModel;
	
	public function FailFirstCtrl(view:FailReviveView, model:EZGameResultModel){
		this.view_ = view;
		this.model_ = model;		
	}
	
	public function start(){
		//view_.setNeedDia(model_._diaHaveNum + "");
		//view_.setHaveDia(model_._diaNeedNum + "/" + model_._diaHaveNum);
	}
	
	public function setEnabled(enable:boolean){
		view_.setEnabled(enable);
	}
}