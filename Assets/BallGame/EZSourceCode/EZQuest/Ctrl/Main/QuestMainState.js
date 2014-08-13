#pragma strict

class QuestMainState extends StateWithEventMap{
	private var ctrl_:QuestCtrl = null;
	
	private var isOver_:boolean = false;
	public function QuestMainState(ctrl:QuestCtrl){
		this.ctrl_ = ctrl;
		addEvent("back", "go.home");
	}
	
	public function start(){
		isOver_ = false;
		var tl:TaskList = new TaskList();
		
		var open:Task = ctrl_.main.openTask();
		tl.push(open);
		
		TaskManager.PushBack(tl, function(){
			isOver_ = true;
		});
		
		TaskManager.Run(tl);
	}
	
	public function update(d:float){
		
	}
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "object"){
			var main:QuestMainItemView = evt.obj.GetComponent.<QuestMainItemView>();
			if(main){
				ctrl_.loadMinor(main.title);
				return "minorGo";
			}
		}
		
	
		return super.postEvent(evt);
	}
	
	public function over(){
		//ctrl_.main.close();
	}
}