#pragma strict

class EZAffixInfo{
	private var title_:String = "none?";
	private var lv_:int = 0;
	private var maxLv_:int = 0;
	private var info_:String = "none";
	
	
	public function set title(value:String){
		this. title_ =  value;
	}
	public function get  title():String{
		return this.title_;
	}
	public function set lv(value:int){
		this.lv_ = value;
	}
	
	//public function get lv():int{
	//	return this.lv_ +1;
	//}
	public function get lv():int{
		return this.lv_;
	}
	public function set maxLv(value:int){
		this.maxLv_ = value;
	}
	public function get maxLv():int{
		return this.maxLv_;
	}
	public function get info():String{
		return info_;
	}
	public function set info(value:String){
		info_ = value;
	}
	

}