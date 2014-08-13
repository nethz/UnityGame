#pragma strict

class EZPetCompInputState extends StateWithEventMap{
	private var ctrl_:EZCardCtrl = null;
	//private var goComp_:boolean = false;
	private var isGoodPass:boolean = false;
	private var isOnePass:boolean = false;
	public function EZPetCompInputState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
		addEvent("back", "go.home");
	} 
	function start(){
		//goComp_ = false;
		isGoodPass = false;
		isOnePass = false;
	}
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "comp"){
			var good:boolean = ctrl_.comp.goodMaterial();
			var lvLimit:boolean = ctrl_.lvLimit;
			if(good||lvLimit){
				var goodWindow = ctrl_.openCompWindow(good, lvLimit);
				TaskManager.PushBack(goodWindow, function(){
					if(goodWindow.okOrCancel){
						isGoodPass = true;
						runOneWindowTask();
					}else{
						isGoodPass = false;
					}
				});
				TaskManager.Run(goodWindow);
			}else{
				isGoodPass = true;
				runOneWindowTask();
			}
		}
		return super.postEvent(evt);
	}
	function update(d:float):String{
		if(isGoodPass && isOnePass){
			return "comp.web";
		}
		return "";
	
	}
	
	private function runOneWindowTask(){
		if(ctrl_.comp.compOnlyOne()){
			var oneWindow:EZWindowTask = ctrl_.compOnlyOneWindow();
			TaskManager.PushBack(oneWindow, function(){
				if(oneWindow.okOrCancel){
					isOnePass = true;
				}else{
					isOnePass = false;
				}
			});
			TaskManager.Run(oneWindow);
		}else{
			isOnePass = true;
		}
	}
	
}