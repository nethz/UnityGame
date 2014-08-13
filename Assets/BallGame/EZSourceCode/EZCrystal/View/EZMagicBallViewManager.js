#pragma strict
class EZMagicBallViewManager extends MonoBehaviour{
	public var _info:EZMagicBallInfoView;
	public var _spell:EZCrySpellInfoView;
	public var _list:EZMagicBallView[];
	private var selected_:int = -1;
	public function Awake(){
	
		for(var i:int=0; i< _list.length; ++i){
			_list[i].close();
		}
	}
	
	public function open(){
		for(var i:int=0; i< _list.length; ++i){
			_list[i].open();
		}
	}
	public function close(){
		for(var i:int=0; i< _list.length; ++i){
			_list[i].close();
		}
	}
	public function reset(){
		for(var i:int=0; i< _list.length; ++i){
			_list[i].reset();
		}
	}
	public function getSelected():EZMagicBallView{
		if(selected_ >= 0 && selected_ <_list.Length){
			return _list[selected_];
		}
		return null;
	}
	public function setup(subscript:EZSubscript, id:int, lv:int, exp:float, max:float){
		_list[id].setup(subscript, lv, exp, max);
	}
	
	private function refreshSelected(){
		for(var i:int = 0; i<_list.Length; ++i){
			if( i!= selected_){
				_list[i].selected = false;
			}else{
				_list[i].selected = true; 
			}
		}
		var ball:EZMagicBallView = this.getSelected();
		_info.ball = ball;
		if(ball){
			_spell.lv = ball.lv;
		}
	}
	public function set selected(value:int){
	
		selected_ = value;
		Debug.Log(selected_);
	}
	public function resetSelected(){
		if(selected_ < 0 || selected_ >= _list.Length || !_list[selected_].illume){
			selected_ = -1;
		}
	
		if(selected_ == -1){
			for(var i:int = 0; i<_list.Length; ++i){
				if(_list[i].illume){
					selected_ = i;
					break;
				}
			}
		}
		refreshSelected();
	}

}