#pragma strict
class EZMagicBallInfoView extends MonoBehaviour{

	public var _ball:EZCryInfoBall;
	public var _exp:EZCryInfoExp;
	public var _spell:UISprite;
	private var spell_:int = -1;
	private var ball_:EZMagicBallView = null;
	public var _spellIcon:String[];
	public function close(){
		_ball.close();
		_exp.close();
	}
	public function open(){
		
		_ball.open();
		_exp.open();
	}
	public function set spell(value:int){
		spell_ = value;
		refresh();
	}
	
	public function set ball(value:EZMagicBallView){
		ball_ = value;
		refresh();
	}
	public function refresh(){
		if(ball_ == null){
			_ball.setup(-1, -1);
			_exp.setup(-1, -1, 0.0f, 0.0f);
			_spell.enabled = false;
		}else{
			_ball.setup(ball_.id, ball_.lv);
			_exp.setup(ball_.id, ball_.lv, ball_.exp, ball_.maxExp);
			if(spell_ >= 0 && spell_ <_spellIcon.Length){
				_spell.spriteName = _spellIcon[spell_];
				_spell.enabled = true;
			}else{
				_spell.enabled = false;
			}
		}
	
	}
}