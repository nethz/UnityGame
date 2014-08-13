#pragma strict

class EZLoadingTask extends Task{
	private var time_:float = 0;
	private var alpha_:float = 0;
	private var text_:String = "";
	private var type_:Geek.MagicType = Geek.MagicType.Fire;
	private var quality_:int = 0;
	private var index_:int = 0;
	private var show_:float = 1;
	public function EZLoadingTask(){
		type_ = Random.Range(0, 5);
		var temp:float = Random.value;
		if(temp <= 0.011764706f){
			quality_ = 3;
		}else if(temp <= 0.011764706f +0.047058824f){
			quality_ = 2;
		}else if(temp <= 0.011764706f +0.047058824f +0.188235294f){
			quality_ = 1;
		}else{
			quality_ = 0;
		}
		
	}
	public function get time():float{
		return this.time_;
	}
	public function set time(value:float){
		this.time_ = value;
	}
	public function get alpha():float{
		return this.alpha_;
	}
	public function set alpha(value:float){
		this.alpha_ = value;
	}
	public function set text(value:String){
		this.text_ = value;
	}
	public function get text():String{
		return this.text_;
	}
	
	public function set type(value:Geek.MagicType){
		this.type_ = value;
	}
	public function get type():Geek.MagicType{
		return this.type_;
	}
	
	public function get quality():int{
		return this.quality_;
	}
	public function set quality(value:int){
		this.quality_ = value;
	}
	
	public function get index():int{
		return this.index_;
	}
	public function set index(value:int){
		this.index_ = value;
	}
	
	
	public function get show():float{
		return this.show_;
	}
	public function set show(value:float){
		this.show_ = value;
	}
	
}