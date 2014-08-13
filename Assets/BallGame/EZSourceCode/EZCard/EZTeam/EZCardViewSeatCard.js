#pragma strict
class EZCardViewSeatCard extends MonoBehaviour{
	public var _core:EZCardCoreView = null;
	public var _selected:UISprite;
	private var data_:EZCard = null;
	
	public function empty(){
		_core.close();
	}
	public function setCard(data:EZCard){
		data_ = data;
	}
	public function set selected(value:boolean){
		_selected.enabled = value;
	}
	public function refresh(){
		if(data_){
			_core.setup(data_);	
			_core.open();
			
			
		}else{
			this.empty();
		}
	}
	

}