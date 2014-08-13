#pragma strict

class EZAwardBallItem extends EZAwardItem{
	public var _texts:String[];
	public var _scriptName:String[];
	public function setup(num:int){
		if(num >=0 && num < _texts.Length){
			_label.text = _texts[num];
		}
		if(num >=0 && num < _scriptName.Length){
			_icon.spriteName = _scriptName[num];
		}
		
	}
	
}