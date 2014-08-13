#pragma strict

class EZPetSellInputState extends StateWithEventMap{
	
	private var ctrl_:EZCardCtrl = null;
	//private var goWeb_:boolean = false;
	private var isGoodPass:boolean = false;
	private var isOnePass:boolean = false;
	
	public function EZPetSellInputState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	
	public function start(){
		//goWeb_ = false;
		isGoodPass = false;
		isOnePass = false;
	}
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "sell"){
			if(ctrl_.sell.goodMaterial()){
				var goodWindow:EZWindowTask = ctrl_.sellWindow();
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
	
	public function update(d:float):String{
		if(isGoodPass && isOnePass){
			return "sell.web";
		}
		return "";
	}
	
	private function runOneWindowTask(){
		if(ctrl_.sell.sellOnlyOne()){
			var oneWindow:EZWindowTask = ctrl_.sellOnlyOneWindow();
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

