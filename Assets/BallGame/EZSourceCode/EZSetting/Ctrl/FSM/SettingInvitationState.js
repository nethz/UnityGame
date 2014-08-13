#pragma strict

class SettingInvitationState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	
	
	public function SettingInvitationState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		var window:EZWindowTask = ctrl_.invitationTask();
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				if(EZWeixin.GetInstance().has){
					var weixin:EZWeixinInvitationTask = ctrl_.send2Weixin();
					TaskManager.PushBack(weixin, function(){
						if(weixin.result == EZWeixin.Result.Ok ||weixin.result == EZWeixin.Result.LongTime){
							isOver_ = true;
						}else if(weixin.result == EZWeixin.Result.Fail){
							
							var fail:Task = ctrl_.send2WeixinFail(weixin.invitation);
							TaskManager.PushBack(fail, function(){
								isOver_ = true;
							});
							TaskManager.Run(fail);
						
						}
					
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
			return "setup.main";
		}
		return "";
	}
}