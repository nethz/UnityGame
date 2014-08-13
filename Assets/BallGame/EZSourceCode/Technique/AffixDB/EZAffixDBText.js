#pragma strict

class EZAffixDBText extends EZAffixDBString{
	
	public var _text:String; 
	public function text(soul:JsonData.Soul):String{
		
		return _text;
	}
}