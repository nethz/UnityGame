#pragma strict

class EZGuideText{
	public var text:String = "";
	public var style:Style = Style.LINE;
	public var clear:boolean = true;
	
	public function EZGuideText(){
		this.text = "";
		this.style = Style.LINE;
		this.clear = true;
	}
	
	public function EZGuideText(text:String,style:EZGuideText.Style,clear:boolean){
		this.text = text;
		this.style = style;
		this.clear = clear;
	}
	
	enum Style{
		WORD,
		LINE,
		NONE,
	}
}