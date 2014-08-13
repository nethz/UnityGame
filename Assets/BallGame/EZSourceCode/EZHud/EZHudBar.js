#pragma strict


class EZHudBar extends MonoBehaviour{
	public var _lattice:EZHudLattice;
	
	public var _color:UISprite;
	public var _flicker:EZHudFlicker;
	public function Awake(){
		if(_flicker){
			_flicker.color = _color.color;
		}
	}
	public function flicker(){
		if(_flicker){
			_flicker.flicker();
		}
	
	}
	public function get fulled():boolean{
	
		return (_color.fillAmount == 1.0f);
	}
	public function Start(){
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(3);
		TaskManager.PushBack(wait, function(){ 
			_flicker.flicker();
		});
		TaskManager.Run(wait);
	}
	public function set color(value:Color){
		_color.color = value;
		if(_flicker){
			_flicker.color = value;
		}
	}
	public function setValue(val:float, all:float){
		if(all <= 0 && val == 0){
			_color.fillAmount = 0;
			_color.color.a = 0;
			return;
		}
		
		
		if(_lattice){
			_lattice.setCount(all);
		}
		
		_color.fillAmount = val/all;
		
	
	}
	public function hide(){
		_color.color.a = 0;
	}
	public function show(){
		_color.color.a = 1;
	}
}