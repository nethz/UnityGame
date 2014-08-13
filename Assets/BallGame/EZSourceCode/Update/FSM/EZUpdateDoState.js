#pragma strict

class EZUpdateDoState extends State{


	private var ctrl_:EZUpdateCtrl = null;
	public function EZUpdateDoState(ctrl:EZUpdateCtrl){
		ctrl_ = ctrl;
	}
	
	public function start(){
		var data:JsonData.Update = EZUpdateTable.GetInstance().data;
		GeekWeixin.GoUrl(data.url);
	}
	function postEvent(evt:FSMEvent):String{
		if(evt.msg == "ok"){
			var data:JsonData.Update = EZUpdateTable.GetInstance().data;
			GeekWeixin.GoUrl(data.url);
		}else if(evt.msg == "cancel"){
			return "switch";
		}
		return "";
	}
	
}