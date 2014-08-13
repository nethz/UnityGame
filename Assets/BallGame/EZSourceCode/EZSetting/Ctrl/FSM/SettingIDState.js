#pragma strict

class SettingIDState extends State{
	private var ctrl_:EZSettingCtrl = null;
	private var oldName_:String = "";
	public function SettingIDState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
	}
	
	
	function postEvent(evt:FSMEvent){
		if(evt.msg == "cancel"){
			return "setup.main";
		}else if(evt.msg == "ok"){
			var name:String = ctrl_.idView.newName;
			if(String.IsNullOrEmpty(name)){
				 TaskManager.Run(ctrl_.whiteSpace());
			}else if(name == oldName_){
				return "setup.main";
			}else{
				ctrl_.changeName = name;
				return "setup.web";
			}
		}
		return "";
	}
	public function start(){
	
		var player:EZPlayerTable = EZPlayerTable.GetInstance(); 
		oldName_ =  player.data.name;
		ctrl_.idView.setup(oldName_);
		ctrl_.idView.open();
	}
	public function over(){
		ctrl_.idView.close();
	}
	
	
	
}