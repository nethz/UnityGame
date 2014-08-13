#pragma strict

class EZMessageButton extends MonoBehaviour{
	public var _button:UIImageButton = null;
	public var _text:UILabel = null;
	public var _one:String = "";
	public var _more:String = "";
	public function setup(number:int){
		if(number == 0){
			this.gameObject.SetActive(false);
		}else{
			this.gameObject.SetActive(true);
			if(number == 1){
				_text.text = "";
				
				_button.normalSprite = _one;
				_button.hoverSprite = _one;
				_button.pressedSprite = _one;
				_button.disabledSprite = _one;
				_button.isEnabled = false;
				_button.isEnabled = true;
				
			}else{
			
				_button.normalSprite = _more;
				_button.hoverSprite = _more;
				_button.pressedSprite = _more;
				_button.disabledSprite = _more;
				_button.isEnabled = false;
				_button.isEnabled = true;
				if(number < 10){
					_text.text = number.ToString();
				}else{
					_text.text = "+";
				}
			}
		}
		
	}
}