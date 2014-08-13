#pragma strict

class EZCardViewManager extends MonoBehaviour{
	public var _prototype:EZCardView;
	public var _table:GeekTable;
	public var _bagText:UILabel;
	public var _bottomOffset:Vector3 = Vector3.zero;
	
	private var enabler_:EZCardViewEnabler = null;
	private var cards_:List.<EZCardView> = new List.<EZCardView>();;
	
	public function Start(){
	}
	
	public function load(subscript:EZSubscript, cards:List.<EZCard>){
		Debug.Log(cards.Count);
		this.create(cards.Count);
		for(var i:int; i<cards.Count; ++i){
			this.cards_[i].load(subscript, cards[i]);
		}
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5f);
		
		TaskManager.Run(wait);
	}
	
	public function get firstCard():EZCard{
		var t:Transform = _table.first();
		if(t){
			var card:EZCardView = t.GetComponent(EZCardView) as EZCardView;
			if(card){
				return card.data;
			}
		}
		return null;
	}
	public function setEnabler(enabler:EZCardViewEnabler){
		if(cards_){
			for(var i:int = 0; i<this.cards_.Count; ++i ){
				cards_[i].enabler = enabler;
			}
		}
		enabler_ = enabler;
	
	}
	public function selectedMaterials(datas:EZCard[]){
		
		if(cards_){
			for(var i:int = 0; i<this.cards_.Count; ++i){
				var jiao:boolean = false;
				if(datas){
					for(var j:int = 0; j < datas.length; ++j){
						if(datas[j] == this.cards_[i].data){ 
							jiao = true;
							break;
						}
					}
				}
				
				if(jiao && !cards_[i].mainSelected){
					cards_[i].selected = true;
				}else{
					cards_[i].selected = false;
				}
			}
		}
	}
	public function selectedMain(data:EZCard){
		if(cards_){
			for(var i:int = 0; i<this.cards_.Count; ++i ){
				if(data != null && !cards_[i].selected && cards_[i].data == data ){
					cards_[i].mainSelected = true;
				}else{
					cards_[i].mainSelected = false;
				}
			}
		
		}
	}
	
	
	
	public function getCard(id:int):EZCard{
		var data:EZCard = null;
		if(cards_){
			for(var i:int = 0; i<this.cards_.Count; ++i ){
				if(!cards_[i].selected && cards_[i].data.id == id ){
					data = cards_[i].data;
					break;
				}
			}
		}
		return data;
	}
	
	public function refresh(){
		if(cards_){
			for(var i:int = 0; i<this.cards_.Count; ++i ){
				cards_[i].refresh();
			}
		}
	}
	private function createCard():EZCardView{
		
		var obj:GameObject = GameObject.Instantiate(_prototype.gameObject);
		var card:EZCardView = obj.GetComponent(EZCardView) as EZCardView;
		card.enabler = this.enabler_;
		var drag:UIDragCamera = obj.GetComponent(UIDragCamera) as UIDragCamera;
		obj.transform.parent = _table.transform;
		obj.transform.localScale = Vector3.one;
		obj.transform.localPosition = Vector3.zero;
		obj.SetActive(true);
		return card;
	}
	public function destoryCard(){
		if(cards_){
			for(var i:int = 0; i< cards_.Count; ++i){ 
				GameObject.DestroyObject(cards_[i].gameObject);
			} 
		}
		cards_.Clear();
	}
	public function create(num:int){
		destoryCard();
		//cards_ = new EZCardView[num];
		for(var i:int = 0; i < num; ++i){
			var view:EZCardView = createCard();
			view.gameObject.name = "Card"+i;
			cards_.Add(view);
		}
		_table.repositionNow = true;
	}
	
	public function set bagText(value:String){
		_bagText.text = value;
	}

}