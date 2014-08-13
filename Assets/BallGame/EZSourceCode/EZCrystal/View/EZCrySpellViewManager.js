#pragma strict
class EZCrySpellViewManager extends MonoBehaviour{
	public var _list:EZCrySpellView[];
	private var selected_:int = -1;
	public var _ballInfo:EZMagicBallInfoView;
	public var _spellInfo:EZCrySpellInfoView;
	public function getSelected():EZCrySpellView{
		if(selected_ >= 0 && selected_ <_list.Length){
			return _list[selected_];
		}
		return null;
	}
	
	
	public function Start(){
		for(var i:int =0; i<_list.Length; ++i){
			_list[i].close();
		}
	}
	
	public function open(){
		for(var i:int = 0;i < _list.length;++i){
		   _list[i].open();
	    }
	}
	public function close(){
	    for(var i:int = 0;i < _list.length;++i){
	       _list[i].close();
	     }
	}
	public function reset(){
		for(var i:int=0; i< _list.length; ++i){
			_list[i].reset();
		}
	}
	public function setup(subscript:EZSubscript, id:int, lv:int){
		_list[id].setup(subscript,true);
		_spellInfo.id = id;
		_spellInfo.lv = lv;
	}
	
	private function refreshSelected(){
		Debug.Log(selected_);
		for(var i:int = 0; i<_list.Length; ++i){
			if( i!= selected_){
				_list[i].selected = false;
			}else{
				_list[i].selected = true; 
			}
		}
		_ballInfo.spell = selected_;
		_spellInfo.id = selected_;
		_spellInfo.icon = _list[selected_].icon;
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