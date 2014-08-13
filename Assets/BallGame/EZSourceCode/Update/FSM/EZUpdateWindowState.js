#pragma strict

class EZUpdateWindowState extends StateWithEventMap{


	private var ctrl_:EZUpdateCtrl = null;
	private var isOver_:boolean = false;
	public function EZUpdateWindowState(ctrl:EZUpdateCtrl){
		ctrl_ = ctrl;
		
		addEvent("ok", "do");
		addEvent("cancel", "switch");
	}
	public function start(){
		isOver_ = false;
		
		var tl:TaskList = new TaskList();
		
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		tl.push(ctrl_._window.setupTask(EZUpdateTable.GetInstance().data));
		tl.push(loaded);
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		
		TaskManager.Run(tl);
	}
}