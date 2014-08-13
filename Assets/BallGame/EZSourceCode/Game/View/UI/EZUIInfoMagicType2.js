#pragma strict

class EZUIInfoMagicType2 extends MonoBehaviour{
	public var _metalText:UILabel = null;
	public var _woodText:UILabel = null;
	public var _waterText:UILabel = null;
	public var _fireText:UILabel = null;
	public var _earthText:UILabel = null;
	
	public var _metalString:String = "";
	public var _woodString:String = "";
	public var _waterString:String = "";
	public var _fireString:String = "";
	public var _earthString:String = "";
	
	private var addition_:String = "+30%";
	private var attenuation_:String = "-50%";
	private var normal_:String = "    0";

	public function Awake(){
		
	}

	public function setup(magicType:Geek.MagicType){
		_metalText.text = _metalString + normal_;
		_woodText.text = _woodString + normal_;
		_waterText.text = _waterString + normal_;
		_fireText.text = _fireString + normal_;
		_earthText.text = _earthString + normal_;
		switch(magicType){
			case Geek.MagicType.Metal:
				_earthText.text = _earthString + addition_;
				_fireText.text = _fireString + attenuation_;
				break;
			case Geek.MagicType.Wood:
				_waterText.text = _waterString + addition_;
				_metalText.text = _metalString + attenuation_;
				break;
			case Geek.MagicType.Water:
				_metalText.text = _metalString + addition_;
				_woodText.text = _woodString + attenuation_;
				break;
			case Geek.MagicType.Fire:
				_woodText.text = _woodString + addition_;
				_waterText.text = _waterString + attenuation_;
				break;
			case Geek.MagicType.Earth:
				_fireText.text = _fireString + addition_;
				_woodText.text = _woodString + attenuation_;
				break;
		}
	}
	
	
}