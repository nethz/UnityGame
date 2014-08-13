#pragma strict

class EZIDTextAction extends ActionObj{
	
	private var text_:String = "none";
	//private var size_:EZHudNumber.Size = EZHudNumber.Size.Small;
	private var id_:int = 0;
	private var color_:Color = Color.red;

	public function set id(value:int){
		this.id_ = value;
	}
	public function get id():int{
		return this.id_;
	}
	/*public function set number(value:float){
		
		var round:int = Mathf.RoundToInt(value);
		if(round >= 0){
			text_ = "+" + round.ToString();
		}else{
			text_ = (-round).ToString();
		}
	}*/
	public function set text(value:String){
		this.text_ = value;
	}
	public function get text():String{
		return this.text_;
	}
	

	public function set color(value:Color){
		this.color_ = value;
	}
	public function get color():Color{
		return this.color_;
	}
	
	
}