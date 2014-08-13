#pragma strict


class EZHudHp extends MonoBehaviour{
	public var _addBar:EZHudSlipBar;
	public var _hpBar:EZHudSlipBar;
	private var hp_:float;
	private var add_:float;
	private var max_:float;
	public var _flicker:EZHudFlicker;
	public function setValue(hp:float, ad:float, max:float){
		hp_ = hp;
		add_ = ad;
		max_ = max;
		_hpBar.setValue(hp_/(max_ + add_));
		_addBar.setValue((hp_ + add_)/(max_ + add_));
	}
	public function flicker(){
		_flicker.flicker();
	}
	public function hide(){
		_hpBar.enabled = false;
		_addBar.enabled = false;
		
	}
	public function show(){
	
		_hpBar.enabled = true;
		_addBar.enabled = true;
	}	
	
	
	
	
}