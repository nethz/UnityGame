#pragma strict

class PCardManager extends MonoBehaviour{
	public var _prototype:GameObject = null;
	public var _table:GeekTable = null;
	public var _itemName:String = "card";
	
	private var items_:PCardView[];
	
	public function Start(){
		//create(31);
	}
	
	public function repositionNow(){
		_table.repositionNow = true;
	}
	
	public function load(cards:EZCard[]){
		Debug.Log("Card number is : "  + items_.length);
		this.create(items_.length);
		for(var i:int; i<items_.length; ++i){
			this.items_[i].load(cards[i]);
		}
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
	
	public function create(num:int){
		destoryItem();
		this.items_ = new PCardView[num];
		for(var i:int = 0; i < num; ++i){
			this.items_[i] = createItem();
			this.items_[i].gameObject.name = _itemName+i;
		}
		repositionNow();
	}
		
	private function createItem():PCardView{
		var obj:GameObject = GameObject.Instantiate(_prototype);
		var item:PCardView = obj.GetComponent(PCardView) as PCardView;
		//var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		//drag.draggablePanel = _draggablePanel;
		obj.transform.parent = _table.gameObject.transform;
		obj.transform.localPosition = _prototype.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(true);
		return item;
	}
	
	public function destoryItem(){
		if(this.items_){
			for(var i:int = 0; i< this.items_.length; ++i){ 
				GameObject.DestroyObject(this.items_[i].gameObject);
			} 
		}
		this.items_ = null;
	}
}