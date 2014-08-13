#pragma strict

class EZLeadDownDialogState extends State{
	private var isOver_:boolean = false;
	private var downDialog_:EZGameDialogView = null;
	private var impl_:EZBallsManagerImpl = null;
	private var index_:int = 0;
	public function EZLeadDownDialogState(downDialog:EZGameDialogView, impl:EZBallsManagerImpl){
		downDialog_ = downDialog;
		impl_ = impl;
	}
	function start(){
		Debug.Log("<=========EZLeadDownDialogState===========>");
		isOver_ = false;
		var text:String = impl_.lead.broadText();
		if(!String.IsNullOrEmpty(text)){
			var tl:TaskList = new TaskList();
			tl.push(impl_._close.show(0.3f, 0.5f));
			tl.push(downDialog_.showTextTask(text));
			tl.push(impl_._close.hide(0.3f));
		
			TaskManager.PushBack(tl, function(){
				isOver_ = true;
			});
			TaskManager.Run(tl);
		}else{
			isOver_ = true;
		}
		
	}
	function update(d:float){
		if(isOver_){
			return "lead_in_user";
		}
		return "";
	}
}