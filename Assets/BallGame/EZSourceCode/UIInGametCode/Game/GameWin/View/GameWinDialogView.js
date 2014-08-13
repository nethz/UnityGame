#pragma strict

class GameWinDialogView extends GameBaseView{

	public var _bg:UISprite;
	public var _info:UILabel;
	public var _triangle:GameObject;
	
	
	
	public function set info(value:String){
		_info.text = value;
	}
	
	public function get triangel(){
		return _triangle;
	}
}