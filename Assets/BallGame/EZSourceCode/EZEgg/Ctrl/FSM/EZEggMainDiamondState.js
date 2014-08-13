#pragma strict

class EZEggMainDiamondState extends State{

	private var ctrl_:EZEggCtrl = null;
	private var goBack_:boolean = false;
	private var goWeb_:boolean = false;
	public function EZEggMainDiamondState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
		//addEvent("cancel", "egg.main.input");
		//addEvent("one", "egg.main.web");
	//	addEvent("ten", "egg.main.web");
	}
	
		
/*
	function postEvent(evt:FSMEvent){
		
		if(evt.msg == "one"){
			ctrl_.drawCount = 1;
		}else if(evt.msg == "ten"){
			ctrl_.drawCount = many_;
		}
		
		return super.postEvent(evt);
	}
	
	*/
	public function start(){
		Debug.Log("EZEggMainDiamondState start!!!!!");
		goBack_ = false;
		goWeb_ = false;
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		var many:int = 0;
		var diamondTen:boolean = (Mathf.FloorToInt(player.diamond/setup.game.draw_diamond) >= 10);
		if(diamondTen){
			many = 10;
		}else{
			many = 1;
		}
		
		var task:EZThiWindowTask = ctrl_.openThiWindowTask(EggWindow.Mode.Diamond, many) as EZThiWindowTask;
		TaskManager.PushBack(task, function(){
			switch(task.result){
				case EZThiWindowTask.Result.Left:
					Debug.Log("go.back");
					goBack_ = true;
				break;
			
				case EZThiWindowTask.Result.Mid:
					Debug.Log("go.Mid");
					ctrl_.drawCount = many;
					goWeb_ = true;
				break;
			
				case EZThiWindowTask.Result.Right:
					Debug.Log("go.Right");
					ctrl_.drawCount = 1;
					goWeb_ = true;
				break;
			
			}
		});
		TaskManager.Run(task);
		
		
	}
	public function update(d:float){
		if(goBack_){
			return "egg.main.input";
		}else if(goWeb_){
			return "egg.main.web";
		}
		return "";
	}
	
	public function over(){
		
		ctrl_.drawMode = EggWindow.Mode.Diamond;
	}

	
}