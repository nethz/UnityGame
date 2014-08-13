#pragma strict

class EZWeixinCheckState extends State{
	private var error_:boolean = false;
	private var bind_:boolean = false;
	private var change_:boolean = false;
	public function start(){
		error_ = false;
		bind_ = false;
		change_ = false;
		
		var table:EZWeixinTable = EZWeixinTable.GetInstance();
		var data:JsonData.Weixin  = table.data;
		if(String.IsNullOrEmpty(data.id)){
			error_ = true;
		}else if(String.IsNullOrEmpty(data.uuid)){
			bind_ = true;
		}else{
			change_ = true;
		}
	}
	public function update(d:float):String{
		if(error_){
			Debug.Log("error");
			return "error";
		}
		if(bind_){
			Debug.Log("bind");
			return "bind";
		}
		if(change_){
			Debug.Log("change");
			return "change";
		}
		return "";
	}
	
}