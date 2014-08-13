#pragma strict

class GameWinCardManager extends MonoBehaviour{
	public var _prototype:GameObject;
	public var _ok:GameObject;
	public var _draggablePanel:UIDraggablePanel;
	public var _effect:GameWinFly;
	public var _step:Vector3;
	public var _okStep:EZiPhone5Vector3;
	public var _okOffset:Vector3;
	private var n_:int = 0;
	private var offset_:Vector3;
	
	public var _touchs:BoxCollider[];
	private var touchs_:Array = new Array();
	
	
	private var souls_:JsonData.Soul[];
	
	public function setup(souls:JsonData.Soul[]){
		souls_ = souls;
	}
	
	
	
	public function Awake(){
		for(var i:int =0; i<_touchs.Length; ++i){
			var box:BoxCollider = _touchs[i];
			if(box){
			
				box.enabled = false;
				touchs_.push(box);
			}
		}
	}
	
	public function Start(){
		offset_ = _effect.transform.localPosition;
	}
	
	public function enableTouch(enabled:boolean){
		for(var i:int = 0; i<touchs_.length; ++i){
			var touch:BoxCollider = touchs_[i];
			touch.enabled = enabled;
		}
	}
	
	/*public function okTask():Task{
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5f);
		tl.push(wait);
		var task:Task = _effect.effectTask();
		
		TaskManager.PushFront(task, function(){
			_ok.transform.parent = this._effect.transform;
			_ok.transform.localPosition = -_step * (n_ -1) - _okOffset;//old code is "- _okStep"
			_ok.transform.localScale = Vector3.one;
			_ok.gameObject.SetActive(true);
			n_++;
			_effect.target = offset_ +(_step * (n_ -1) + _okStep.getValue());
		});
		TaskManager.PushBack(task, function(){
			this.enableTouch(true);
		});
		tl.push(task);
		return tl;
	}*/
	/*
	public function createTask(ezCard:EZCard):Task{
		
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(task, function(){
			var card:GameWinCardView = createCard(ezCard);
			card.transform.parent = this._effect.transform;
			card.transform.localPosition = -_step * n_;
			card.transform.localScale = Vector3.one;
			card.gameObject.SetActive(true);
			n_++;
			_effect.target = offset_ + _step * n_;
		
		});
		return task;
	}
	

	
	private function createCard(ezCard:EZCard):GameWinCardView{
		var obj:GameObject = GameObject.Instantiate(_prototype);
		var card:GameWinCardView = obj.GetComponent(GameWinCardView) as GameWinCardView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		var box:BoxCollider = obj.GetComponent(BoxCollider) as BoxCollider;
		if(box){
			box.enabled = false;
			touchs_.push(box);
		}
		drag.draggablePanel = this._draggablePanel;
		card.setCardInfo(ezCard);
		card.setTechInfo(ezCard);
		return card;
	}*/
	
	/////////
	/*public function createTask():Task{
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(task, function(){
			var card:GameWinCardView = createCard();
			card.transform.parent = this._effect.transform;
			card.transform.localPosition = -_step * n_;
			card.transform.localScale = Vector3.one;
			var ezCard:EZCard = new EZCard();
			ezCard.load(souls_[n_]);
			card.setCardInfo(ezCard);
			card.setTechInfo(ezCard);
			card.gameObject.SetActive(true);
			n_++;
			_effect.target = offset_ + _step * n_;
		});
		return task;
	}*/
	
	public function flyStepTask():Task{
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(task,function(){
			n_++;
			_effect.target = offset_ + _step * n_;
		});
		return task;
	}
	
	public function flyOKTask():Task{
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5f);
		tl.push(wait);
		var task:Task = _effect.effectTask();
		TaskManager.PushFront(task,function(){
			_effect.target = offset_ +(_step * (n_) + _okStep.getValue());
		});
		TaskManager.PushBack(task, function(){
			this.enableTouch(true);
		});
		tl.push(task);
		return tl;
	}
	
	public function createCardsOK(){
		var cardsLength:int = souls_.length;
		for(var i:int = 0;i<cardsLength;++i){
			var card:GameWinCardView = createCard();
			card.transform.parent = this._effect.transform;
			card.transform.localPosition = -_step * i;
			card.transform.localScale = Vector3.one;
			var ezCard:EZCard = new EZCard();
			ezCard.load(souls_[i]);
			card.setCardInfo(ezCard);
			card.setTechInfo(ezCard);
			card.gameObject.SetActive(true);
		}
		_ok.transform.parent = this._effect.transform;
		_ok.transform.localPosition = -_step * (cardsLength -1) - _okOffset;
		_ok.transform.localScale = Vector3.one;
		_ok.gameObject.SetActive(true);
	}
	
	private function createCard():GameWinCardView{
		var obj:GameObject = GameObject.Instantiate(_prototype);
		var card:GameWinCardView = obj.GetComponent(GameWinCardView) as GameWinCardView;
		var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
		var box:BoxCollider = obj.GetComponent(BoxCollider) as BoxCollider;
		if(box){
			box.enabled = false;
			touchs_.push(box);
		}
		drag.draggablePanel = this._draggablePanel;
		return card;
	}
	//////////
	
	
}

