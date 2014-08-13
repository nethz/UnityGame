#pragma strict

class EZPetCompWebState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl;
	private var isOver_:boolean = false;
	public function EZPetCompWebState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	}

	public function start(){
		Debug.Log("EZPetSellWebState start");
		ctrl_.inputClose();
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		guide.comp = true;
		EZGuideTable.GetInstance().save(guide);
		ctrl_.compGuideOver();
		var main:EZCard = ctrl_._model._comp.main;
		if(main){
			isOver_ = false;
			var tl:TaskList = new TaskList();
			var materials = ctrl_._model._comp.materials;
			var ids:Array = new Array();
			for(var i:int = 0; i < materials.length; ++i){
				if(materials[i] != null){
					ids.push(materials[i].id + "");
				}
			}
			var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
			loading.time = 0.3;
			loading.alpha = 0.5;
			loading.text = EZDictionary.LookUp("!loading");
			var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
			loaded.time = 0.3;
			var comp:Task = EZBagTable.GetInstance().quickComp(main.id, ids);
			TaskManager.PushBack(comp, function(){
				ctrl_.comp.compBegin();
			});
			var ud:Task = ctrl_.updateBag(false);
			TaskManager.PushBack(ud, function(){
				ctrl_.comp.compEnd();
			});
			tl.push(loading);
			tl.push(comp);
			tl.push(loaded);
			tl.push(ctrl_.comp.compEndTask(main));
			tl.push(ud);
			tl.push(ctrl_.compWarning(main));
			TaskManager.PushBack(tl, function(){
				isOver_ = true;
			});
			TaskManager.Run(tl);
		}else{
			isOver_ = true;
		}
	}
	
	public function over(){
//		Debug.LogError("open");
		ctrl_.inputOpen();
	}
	
	public function update(d:float){
		if(isOver_){
			return "comp.input";
		}
		return "";
	}
}