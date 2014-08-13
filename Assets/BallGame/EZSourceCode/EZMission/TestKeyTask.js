#pragma strict
class TestKeyTask extends Task{
	private var succeed_:boolean = false;
	private var getAp_:boolean = false;
	private var getTeam_:boolean = false;
	private var key_:int = 0;
	public function get succeed():boolean{
		return succeed_;
	}
	public function set succeed(value:boolean){
		succeed_ = value;
	}
	public function get key():int{
		return key_;
	}
	public function set key(value:int){
		key_ = value;
	}

	public function get getAp():boolean{
		return getAp_;
	}
	public function set getAp(value:boolean){
		getAp_ = value;
	}
	
		
	public function get getTeam():boolean{
		return getTeam_;
	}
	public function set getTeam(value:boolean){
		getTeam_ = value;
	}
}