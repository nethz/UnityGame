#pragma strict

class EZCardCoreData{
	private var quality_:Geek.Quality = Geek.Quality.None;
	private var magicType_:Geek.MagicType = Geek.MagicType.None;
	private var style_:String = "";
	
	
	public function get quality():Geek.Quality {
		return quality_;
	}
	
	public function set quality(value:Geek.Quality){
		quality_ = value;
	}
	
	public function get magicType():Geek.MagicType {
		return magicType_;
	}
	
	public function set magicType(value:Geek.MagicType){
		magicType_ = value;
	}
		
	public function get style():String{
		return style_;
	}
	
	public function set style(value:String){
		style_ = value;
	}
}