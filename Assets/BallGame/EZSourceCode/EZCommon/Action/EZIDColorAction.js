#pragma strict

class EZIDColorAction extends EZIDAction{
	private var color_:Color = Color.white;
	
	public function set color(value:Color){
		color_ = value;
	}
	
	public function get color():Color{
		return color_;
	}
}