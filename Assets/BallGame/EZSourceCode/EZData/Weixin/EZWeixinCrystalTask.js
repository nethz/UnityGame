#pragma strict

class EZWeixinCrystalTask extends Task{
	private var result_:EZWeixin.Result = EZWeixin.Result.Ok;
	private var crystal_:JsonData.WeixinCrystal = null;
	
	
	public function set crystal(value:JsonData.WeixinCrystal){
		crystal_ = value;
	}
	public function get crystal():JsonData.WeixinCrystal{
		return crystal_;
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
	
	function EZWeixinCrystalTask(){
		this.isOver = function():boolean{
			return over_;
		};
	
	}

}