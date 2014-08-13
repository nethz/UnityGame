#pragma strict


class EZCheckerInfo{
	var result:boolean = false;
	var message:String = "";
	public function EZCheckerInfo(msg:String){
		result = false;
		message = msg;
	
	}
	public function EZCheckerInfo(){
		result = true;
	}
}