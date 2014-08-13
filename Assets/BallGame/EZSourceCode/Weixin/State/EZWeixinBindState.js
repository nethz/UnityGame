#pragma strict

class EZWeixinBindState extends State{
	private var ctrl_:EZWeixinCtrl = null;
	private var isOver_:boolean = false;
	public function EZWeixinBindState(ctrl:EZWeixinCtrl){
		ctrl_ = ctrl;
	}
	public function start(){
		isOver_ = false;
//		var task:EZWindowTask = ctrl_.bindTask() as EZWindowTask;
//		TaskManager.PushBack(task, function(){
//			if(task.okOrCancel){
				bind();
//			}else{
//				isOver_ =  true;
//			}
			
//		});
		
//		TaskManager.Run(task);
	}
	public function bind(){
		var weixin:EZWeixinTable = EZWeixinTable.GetInstance();
		var user:EZUserTable = EZUserTable.GetInstance();
		if(user.first){
			isOver_ =  true;
		}else{
			var bind:WebLoaderTask = weixin.bindTask(user.data);
			TaskManager.PushBack(bind, function(){
				var info:JsonData.BindInfo = bind.data as JsonData.BindInfo;
				user.save(info.user); 
				user.clear();
				isOver_ =  true;
			});
			TaskManager.Run(bind);
		}
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "go.logo";
		}
		return "";
		
	}
	
}