#pragma strict

class EZApCtrl extends MonoBehaviour{
	
	public var _view:EZApView;
	private var ap_:float = -1.0f;
	public var _base:EZApBase = null;
	
	
	public function refresh(){
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		var ap:float = EZApData.GetAp(player.ap, player.apTime, player.maxAp, player.apPerTime);
		
		if(ap!= this.ap_){
			 this.ap_ = ap;
			_view.text = Mathf.FloorToInt(ap_).ToString() + "/" + Mathf.FloorToInt(player.maxAp).ToString();
			if(player.maxAp <=0 ){
				_view.val = 1;
			}else {
				var apValue:float = ap_/player.maxAp;
				if(apValue > 1){
					apValue = 1;
				}
				_view.val = apValue;
			}
			if(_base != null){
				if(this.fulled){
					_base.onFulled();
				}else{
					_base.onEmpty();
				
				}
			}
		
		}
	}
	public function get ap():float{
		return ap_;
	}
	public function Update(){
		if(EZPlayerTable.GetInstance().isLoaded && this.ap_ != -1.0f){
			refresh();
		}
	}
	public function get maxAp():float{
		
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		return player.maxAp;
	
	}
	public function get fulled():boolean{
		
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		var ap:float = EZApData.GetAp(player.ap, player.apTime, player.maxAp, player.apPerTime);
		return (ap >=player.maxAp);
		
	}

	
}