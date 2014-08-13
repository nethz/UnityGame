#pragma strict
class EZCryNormalView extends MonoBehaviour{
	public var _background:UISprite;
	public var _ballBar:EZMagicBallViewManager;
	public var _ballInfo:EZMagicBallInfoView;
	public var _buttons:EZCryButtons;
	public var _frags:EZCryFragViewManager;
	public var _spell:EZCrySpellViewManager;
	public var _spellInfo:EZCrySpellInfoView;
	private var isOpen_:boolean = false;
	public function setup(data:JsonData.MagicBall){
		_spellInfo.setup(data);
		
	}
	public function open(){
	
		if(!isOpen_){
			Debug.Log("!!Open");
			_background.enabled = true;
			_ballBar.open();
			_ballInfo.open();
			_buttons.open();		
			_frags.open();
			_spell.open();
			_spellInfo.open();		
			isOpen_ = true;
		}
	}
	public function close(){
		if(isOpen_){
			Debug.Log("!!Close");
			_background.enabled = false;
			_ballBar.close();
			_ballInfo.close();
			_buttons.close();
			_frags.close();
			_spell.close();
			_spellInfo.close();
			isOpen_ = false;
		}
		
	
	}
	


}
