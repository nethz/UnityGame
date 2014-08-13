#pragma strict


class EZHud extends MonoBehaviour{

	public enum EffectType{
		Dot,
		Blood,
		Attack,
		Medical,
		None,
	};
	public var _beatEffect:EZSufferBeatingEffect = null;
	public var _mpBar:EZHudBar;
	public var _time:EZHudTime;
	public var _hpBar:EZHudHp;
	public var _speedBar:EZHudBar;
	public var _bind:EZHudBindManager;
	public var _state:EZHudState;
	public var _arrow:EZHudArrow;
	public var _pop:EZHudPop;
	public var _text:EZHudTextManager = null;
	
	
	public var _ui:EZUI;
	private var visible_:boolean = false;
	public var _misses:EZHudMiss[] = null;
	private var loaded_:boolean = false;
	public var _panel:UIPanel;
	private var alpha_:float = 1.0f;
	
	public function get beatEffect():EZSufferBeatingEffect{
		return _beatEffect;
	}
	
	public function get arrow():EZHudArrow{
		return _arrow;
	}
	public function get pop():EZHudPop{
		return _pop;
	}
	//public function get miss():EZHudMiss{
	//	return _miss;
	//}
	
	public function get state():EZHudState{
		return _state;
	}
	
	
	public function get alpha():float{
		return alpha_;
	}
	
	public function get time():EZHudTime{
		return _time;
	}
	public function get hpBar():EZHudHp{
		return _hpBar;
	}
	public function get bind():EZHudBindManager{
		return _bind;
	}
	
	public function get speedBar():EZHudBar{
		return _speedBar;
	}
	
	public function get mpBar():EZHudBar{
		return _mpBar;
	}
	
	public function set alpha(value:float){
		this.alpha_ = value;
		_bind.alpha = value;
		_pop.alpha = value;
		_panel.alpha = this.alpha_;
	}
	
	
	public function Awake(){ 
		_panel.enabled = false;
	}

	public function miss():Task{
		for(var i:int = 0; i<_misses.Length; ++i){
			if(_misses[i].idle()){
				var task:Task = _misses[i].showTask();
				return task;
			}
		}
		return Task();
	}
	public function showText(text:String, color:Color){
		_text.popText(text, color);
		
	}
	
	public function showNumber(from:float, to:float, color:EZHudNumber.EzColor, size:EZHudNumber.Size){
		_text.popNumber(from, to, color, size);
		
	}
	public function effect(type:EZHud.EffectType){
		switch(type){
			case EZHud.EffectType.Attack:
				_beatEffect.showAttacked();
				break;
			case EZHud.EffectType.Blood:
				_beatEffect.showBlood();
				break;
			case EZHud.EffectType.Dot:
				_beatEffect.showDot();
				Debug.Log("<==========case EZHud.EffectType.Dot=============>");
				break;
			case EZHud.EffectType.Medical:
				_beatEffect.showMedical();
				break;
		
		}
		
	}
	
	public function setHp(hp:float, ad:float, max:float){
		_hpBar.setValue(hp, ad, max);
	}
	

	function load(){
		_ui.load();
		resetEffec();
		resetScale();
		loaded_ = true;
	}
	
	private function resetScale(){
		var r:float = _ui._skeletal.hudScale.y/_ui._skeletal.hudScale.x;
		_time.gameObject.transform.localScale.x *= r; 
		_bind.gameObject.transform.localScale.x *= r;
		_text.gameObject.transform.localScale.x *= r;
		_pop.resetScale(r, _ui._skeletal.hudIPhone4Offset); 
		_arrow.gameObject.transform.localScale.x *= r; 
		_beatEffect.gameObject.transform.localScale.x *= r; 
	}
	
	private function resetEffec(){
		var attackOffset:Vector3 = _ui._skeletal.attackOffset;
		var attackScale:Vector3 = _ui._skeletal.attackScale;
		_beatEffect.resetAttack(attackOffset,attackScale);
		
		var medicalOffset:Vector3 = _ui._skeletal.medicalOffset;
		var medicalScale:Vector3 = _ui._skeletal.medicalScale;
		_beatEffect.resetMedical(medicalOffset,medicalScale);
		
		var dotOffset:Vector3 = _ui._skeletal.dotOffset;
		var dotScale:Vector3 = _ui._skeletal.dotScale;
		_beatEffect.resetDot(dotOffset,dotScale);
	}
	
	function show(){
		visible_ = true;
		_panel.enabled = true;
		_bind.isEnabled = true;
		_pop.show();
		
	}
	function hide(){
		visible_ = false;
		_panel.enabled = false;
		_bind.isEnabled = false;
		_pop.hide();
	}
}