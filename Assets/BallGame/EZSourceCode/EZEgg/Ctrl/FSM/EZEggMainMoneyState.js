#pragma strict

class EZEggMainMoneyState extends State{

	private var ctrl_:EZEggCtrl = null;
	private var goBack_:boolean = false;
	private var goWeb_:boolean = false;
	//private var many_:int = 10;
	public function EZEggMainMoneyState(ctrl:EZEggCtrl){
		ctrl_ = ctrl;
		//addEvent("cancel", "egg.main.input");
	//	addEvent("one", "egg.main.web");
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
		goBack_ = false;
		goWeb_ = false;
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var bag:JsonData.Bag = EZBagTable.GetInstance().bag;
		var many:int = Mathf.FloorToInt(bag.money/setup.game.draw_money);
		if(many > 10){
			many = 10;	
		}
		Debug.Log("EZEggMainMoneyState start!!!!!");
		if(many == 1){
			var task2:EZWindowTask = ctrl_.openWindowTask() as EZWindowTask;
			TaskManager.PushBack(task2, function(){
				if(task2.okOrCancel){
					ctrl_.drawCount = 1;
					goWeb_ = true;
				}else{
					goBack_ = true;
					
				}
			});
			TaskManager.Run(task2);
		}else{
		
			var task3:EZThiWindowTask = ctrl_.openThiWindowTask(EggWindow.Mode.Money, many) as EZThiWindowTask;
			TaskManager.PushBack(task3, function(){
				switch(task3.result){
					case EZThiWindowTask.Result.Left:
						goBack_ = true;
					break;
				
					case EZThiWindowTask.Result.Mid:
						ctrl_.drawCount = many;
						goWeb_ = true;
					break;
				
					case EZThiWindowTask.Result.Right:
						ctrl_.drawCount = 1;
						goWeb_ = true;
					break;
				
				}
			});
			TaskManager.Run(task3);
		}
	
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
	
		ctrl_.drawMode = EggWindow.Mode.Money;
	}

	
}