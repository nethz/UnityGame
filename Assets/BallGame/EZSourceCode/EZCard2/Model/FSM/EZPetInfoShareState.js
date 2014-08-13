#pragma strict

class EZPetInfoShareState extends State{
	
	private var isOver_:boolean = false;
	
	private var ctrl_:EZCardCtrl;
	public function EZPetInfoShareState(ctrl:EZCardCtrl){
		ctrl_ = ctrl;
	} 
	public function start(){
		isOver_ = false;
		
		
			var window:EZWindowTask = ctrl_.shareTask();
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					if(EZWeixin.GetInstance().has){
						var weixin:Task =  ctrl_.send2Weixin();
							TaskManager.PushBack(weixin, function(){
							isOver_ = true;
						});
						TaskManager.Run(weixin);
					}else{
						
						var noWeixin:Task = EZWeixin.GetInstance().noWeixin();
						TaskManager.PushBack(noWeixin, function(){
							isOver_ = true;
						});
						TaskManager.Run(noWeixin);
					}
				}else{
					isOver_ = true;
				}
				
			});
			TaskManager.Run(window);
		
	}
	public function update(d:float){
		if(isOver_){
			return "info.input";
		}
		return "";
	
	}
	
}