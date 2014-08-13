#pragma strict

class EZCryNormalGiveState extends StateWithEventMap{
	private var normal_:EZCryNormalCtrl;
	function EZCryNormalGiveState(normal:EZCryNormalCtrl){
		normal_ = normal;
	}
	public function start(){
		normal_.setMode(EZCryNormalCtrl.Mode.Give);
		
	}
				
					
	function postEvent(evt:FSMEvent){
		if(evt.msg == "object"){
			var obj:EZCryFragButton = evt.obj.GetComponent(EZCryFragButton) as EZCryFragButton;
			if(obj != null){
			
					var window:EZWindowTask = normal_.weixinTask(obj.magicType);
					TaskManager.PushBack(window,function(){
						
						if(window.okOrCancel){
						
							if(EZWeixin.GetInstance().has){
								var weixin:EZWeixinCrystalTask = normal_.send2Weixin(obj.magicType);
								TaskManager.PushBack(weixin, function(){
										if(weixin.result == EZWeixin.Result.Ok ||weixin.result == EZWeixin.Result.LongTime){
											
										}else{
											var fail:Task = normal_.send2WeixinFail(weixin.crystal);
											TaskManager.Run(fail);
										}
								});
								TaskManager.Run(weixin);
							
							}else{
								var noWeixin:Task = EZWeixin.GetInstance().noWeixin();
								TaskManager.PushBack(noWeixin, function(){
									//isOver_ = true;
								});
								TaskManager.Run(noWeixin);
							
							}
						}
					});
					TaskManager.Run(window);
				
			}
		}
		return super.postEvent(evt);
	}
	

}