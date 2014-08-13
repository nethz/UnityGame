#pragma strict

class EZWeixinInvitationTask extends Task{
	private var result_:EZWeixin.Result = EZWeixin.Result.Ok;
	private var invitation_:JsonData.Invitation = null;
	
	
	public function set invitation(value:JsonData.Invitation){
		invitation_ = value;
	}
	public function get invitation():JsonData.Invitation{
		return invitation_;
	}
	
	
	public function set result(value:EZWeixin.Result){
		result_ = value;
	}
	public function get result():EZWeixin.Result{
		return result_;
	}
	private var over_:boolean = false;
	
	public function set over(value:boolean){
		over_ = value;
	}
	
	function EZWeixinInvitationTask(){
		this.isOver = function():boolean{
			return over_;
		};
	
	}

}