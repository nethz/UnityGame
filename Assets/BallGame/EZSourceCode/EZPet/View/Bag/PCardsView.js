#pragma strict

class PCardsView extends MonoBehaviour{
	public var _manager:PCardManager = null;
	//public var _sortWindow:PSortWindow = null;
	
	public var _bagNum:UILabel = null;
	public var _boxs:BoxCollider[] = null;
	public var _widgets:UIWidget[] = null;
	
	private var isShow_:boolean = true;
	private var isShowWindow_:boolean = false;
	
	public function get manager():PCardManager{
		return this._manager;
	}
	
	public function set bagNum(value:String){
		_bagNum.text = value;
	}
	
	public function set show(value:boolean){
		isShow_ = value;
		refresh();
	}
	
	public function set showSort(value:boolean){
		isShowWindow_ = value;
		refresh();
	}
	
	public function refresh(){
		for(var i:int = 0;i<_boxs.length;++i){
			_boxs[i].enabled = isShow_;
		}
		for(var j:int = 0;j<_widgets.length;++j){
			_widgets[j].enabled = isShow_;
		}
		//_sortWindow.show = isShowWindow_;
	}
}