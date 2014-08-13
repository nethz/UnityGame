#pragma strict

class EZPetCompCtrl extends EZCardPartCtrl{
	private var model_:EZPetModel = null;
	private var view_:EZPetView =null;
	private var die_:boolean = false;
	
	private	var addLv_:int = 0;
	private	var expVal_:float = 0f;

	//private var enabler_:EZCardViewCompEnabler = null;
	public function EZPetCompCtrl(model:EZPetModel, view:EZPetView){
		//enabler_ = new EZCardViewCompEnabler();
		model_ = model;
		view_ = view;
	}
	private var task_:Task = null;
	public function actionMain(){
		die_ = true;
		model_.comp.clearMain();
		refresh();
	}
	public function open(){
	
		view_.card.setEnabler(model_.compEnabler);
		view_.comp.button.doDisable();
		view_.comp.show();
		
		this.refresh();
		
	}
	public function close(){
	
		model_.comp.cleanMain();
		model_.comp.cleanMaterial();
		refresh();
		view_.comp.button.doEnable();// = true;
		view_.comp.hide();
		
	
	}
	/*
	public function openWindow(){
		view_.comp.openWindow();
	}
	
	public function closeWindow(){
		view_.comp.closeWindow();
	}
	*/
	public function goodMaterial():boolean{
		return model_.comp.goodMaterial(); 
	}
	
	public function compOnlyOne():boolean{
		return model_.compOnlyOne();
	}
	
	private function compExpInit(from:EZCard){
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var to:EZCard = EZBagTable.GetInstance().getCard(from.id);
		var flv = setup.soul.getLv(from.exp);
		var tlv = setup.soul.getLv(to.exp);
		addLv_ = tlv - flv;
		expVal_ = setup.soul.getExpBar(to.soul.baseProp.exp);
	}
	
	public function compEndTask(from:EZCard):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		var greenBarValue:float = view_.comp._green.sliderValue;
		task.init = function(){
			var tl:TaskList = new TaskList();
			Debug.Log("<----------addLv :-------------->" + addLv_);
			Debug.Log("<----------val:-------------->" + expVal_);
			var flv:int = from.lv + 1;
			for(var i:int = 0;i < addLv_;++i){
				if(i == 0){
					tl.push(view_.comp.greeBarTask(greenBarValue,1f));
				}else{
					tl.push(view_.comp.greeBarTask(0f,1f));
				}
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime(view_.comp._fulledTime);
				TaskManager.PushFront(wait,function(){
					view_.comp.playLvUpSound();
				});
				TaskManager.PushBack(wait,function(){
					view_.comp.setGreen(0f);
				});
				tl.push(wait);
				tl.push(view_.comp.setMainLvTask(flv,i));
			}
			tl.push(view_.comp.greeBarTask(0f,expVal_));
			TaskManager.PushFront(tl,function(){
				view_.comp._main.setMainLv(flv,view_.comp._normalLvColor);
			});
			TaskManager.PushBack(tl,function(){
				isOver = true;
			});
			TaskManager.Run(tl);
		};
		task.isOver = function(){
			return isOver;
		};
		TaskManager.PushFront(task,function(){
			compExpInit(from);
		});
		return task;
	}
	
	public function compEnd(){
		var id:int = model_.comp.main.id;
		model_.comp.cleanMain();
		die_ = false;
		var card:EZCard = view_.card.getCard(id);
		model_.comp.addCard(card);
		this.refresh();
	}
	
	public function compBegin(){
		model_.comp.cleanMaterial();
		//this.refresh();//this time must not refresh,it can greenbar's value show wrong,because GeekTweenValue will watit 0.2s,so show value wrong!!!!!!!!!!!!!!  
	}
	
	
	public function clear(){
		model_.comp.cleanMaterial();
	}	
	
	public function addCard(data:EZCard){
		model_.comp.addCard(data);
	}
	public function removeCard(data:EZCard){
		die_ = false;
		model_.comp.removeCard(data);
		
	}	
	public function refresh(){
		view_.comp.setMain(model_.comp.main, die_);
		view_.comp.setMaterials(model_.comp.materials);
		view_.comp.setMaterialMoney(model_.comp.materialMoney);
		view_.comp.setMoney(model_.card.money);
		view_.comp.refresh(); 
		
		view_.card.selectedMain(model_.comp.main);  
		view_.card.selectedMaterials(model_.comp.materials); 
		view_.card.refresh();
	}
	
	
}