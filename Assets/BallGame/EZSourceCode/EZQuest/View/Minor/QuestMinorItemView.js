#pragma strict

class QuestMinorItemView extends MonoBehaviour{

	public var _box:Collider;
	public var _title:UILabel = null;
	public var _progress:UILabel = null;
	public var _progressText:String = "";
	public var _weekText:String = "";
	public var _dayText:String = "";
	public var _text:UILabel = null;
	public var _bg:UISprite = null;
	public var _cardPrototype:QuestRewardCardView = null;
	public var _award:QuestRewardInfoView = null;
	public var _table:UITable = null;
	public var _autoItem:EZUIAutoItem;
	private var cards_:QuestRewardCardView[] = null;
	private var progress_:float =1.0f;
	public var _new:EZSub = null;
	public var _clear:UISprite = null;
	public var _isOpen:boolean = false;
	public function getSub():EZSub{
		return _new;
	}
	function unfold(){
		_award.showAward();
	};
	
	function fold(){
		_award.hideAward();
	
	};
	public function Awake(){
		_autoItem.unfold = this.unfold;
		_autoItem.fold = this.fold;
		
	}
	public function refresh(){
		if(_isOpen){
			if((!_new.isNew) && (progress_ >= 1.0f)){
				_clear.enabled = true;
			}else{ 
				_clear.enabled = false;
			}
			_bg.enabled = true;
			_box.enabled = true;
			_title.enabled = true;
			_text.enabled = true;
			_new.open();
			_progress.text = _progressText + Mathf.FloorToInt(progress_ * 100.0f).ToString() + "%";
			_progress.enabled = true;
			if(cards_){
				for(var i:int = 0;i<cards_.length;++i){
					cards_[i].open();
				}
			}
		}else{
			_clear.enabled = false;
			_bg.enabled = false;
			_box.enabled = false;
			_title.enabled = false;
			_progress.enabled = false;
			_text.enabled = false; 
			_new.close();
			if(cards_){
				for(var j:int = 0;j<cards_.length;++j){
					cards_[j].close();
				}
			}		
		}
	
	}
	public function open(){
		_isOpen = true;
		refresh();
	}
	
	public function close(){
		_isOpen = false;
		refresh();
	}
	
	public function set title(value:String){
		_title.text = value;
	}
	public function setProgress(progress:float){
		progress_ = progress;
		refresh();
	}
	public function setRefresh(refresh:String){
		switch(refresh){
			case "none":
				_text.text = "";
			break;
			case "day":
				_text.text = _dayText;
			break;
			case "week":
				_text.text = _weekText;
			break;
		
		}
		refresh();
	}


	public function setAward(award:JsonData.Award){
		if(award!=null && !award.empty()){
			_award.setup(award);
			var autoAward:EZUIAutoItemUnitInterface = _award.gameObject.GetComponent(EZUIAutoItemUnitInterface);
			_autoItem.addObj(autoAward);
			_table.Reposition();
		}else{
			_award.gameObject.SetActive(false);
		}
	}
	
	public function setCards(items:JsonData.QuestItem[]){
		createCards(items.length);
		for(var i:int = 0;i<cards_.length;++i){
			cards_[i].setup(items[i]);
			cards_[i].open();
		
		}
	}
	
	private function createCards(num:int){
		_autoItem.clearObj();
		destoryCards();
		cards_ = new QuestRewardCardView[num];
		for(var i:int = 0; i < num; ++i){
			cards_[i] = createCard();
			cards_[i].gameObject.name = "Card"+i.ToString("D3");
			var autoUnit:EZUIAutoItemUnitInterface = cards_[i].gameObject.GetComponent(EZUIAutoItemUnitInterface);
			_autoItem.addObj(autoUnit);
		}
		
		_table.Reposition();
	}
	
	private function destoryCards(){
		if(cards_){
			for(var i:int = 0; i< cards_.length; ++i){ 
				GameObject.DestroyObject(cards_[i].gameObject);
			} 
		}
		cards_ = null;
	}
	
	private function createCard():QuestRewardCardView{
		var obj:GameObject = GameObject.Instantiate(_cardPrototype.gameObject);
		var card:QuestRewardCardView = obj.GetComponent(QuestRewardCardView) as QuestRewardCardView;
		obj.transform.parent = _table.gameObject.transform;
		obj.transform.localPosition = _cardPrototype.gameObject.transform.localPosition;
		obj.transform.localScale = Vector3.one;
		obj.SetActive(false);
		return card;
	}

}