#pragma strict

class EZUIInfoBindList extends MonoBehaviour{
	private var lists_:EZUIInfoBindListItem[] = null;
	public var _table:GeekTable = null;
	public var _prototype:GameObject = null;
	public function Awake(){
		_table.comparer = new EZBindListComparer();
	}
	public function setup(list:List.<EZBindData>){
		if(lists_){
			destroyList();  
			lists_ = null;
		}
		if(list.Count != 0){
			lists_ = new EZUIInfoBindListItem[list.Count];
			for(var i:int =0 ; i < lists_.Length; ++i){
				lists_[i] = this.create(list[i]);
			}
		}
		
		_table.repositionNow = true;
	}
	public function destroyList(){
		if(lists_){
			for(var i:int = 0; i <lists_.length; ++i){
				GameObject.DestroyObject(lists_[i].gameObject);
			}
			
		}
	}
	
	public function create(data:EZBindData):EZUIInfoBindListItem{
		var obj:GameObject = GameObject.Instantiate(this._prototype);
		obj.SetActive(true);
		obj.transform.parent = _table.transform;
		obj.transform.localScale = _prototype.transform.localScale;
		obj.transform.localPosition = _prototype.transform.localPosition;
		var item:EZUIInfoBindListItem = obj.GetComponent(EZUIInfoBindListItem) as EZUIInfoBindListItem;
		if(data != null){
		
			Debug.LogWarning(data.val);
			Debug.LogWarning(data.number);
		
		}
		item.setup(data);
		return item;
	
	}
}