#pragma strict

class EZEggCardManager extends MonoBehaviour{
	public var _prototype:GameObject;
	public var _parent:GameObject = null;
	public var _ok:GameObject;
	//public var _upOffset:GameObject = null;
	//public var _downOffset:GameObject = null;
	public var _upSize:Vector3 = Vector3.zero;
	public var _downSize:Vector3 = Vector3.zero;
	public var _draggablePanel:UIDraggablePanel;
	public var _effect:GameWinFly;
	public var _step:Vector3;
	public var _okStep:Vector3;
	public var _okOffset:Vector3;
	private var n_:int = 0;
	private var offset_:Vector3;
	public var _touchs:BoxCollider[];
	public var _suspendTime:float = 0.5f;
	
	private var touchs_:Array = new Array();
	private var cards_:List.<EZCard>;
	private var eggCards_:EZEggCardView[];
	

	public function Awake(){
		offset_ = _parent.transform.localPosition;
		for(var i:int =0; i<_touchs.Length; ++i){
			var box:BoxCollider = _touchs[i];
			if(box){
				box.enabled = false;
				touchs_.push(box);
			}
		}
	}
	
	public function setup(cards:List.<EZCard>){
		
		if(cards){
			cards_ = cards;
			eggCards_ = new EZEggCardView[cards_.Count];
		}
	}
	
	public function enableTouch(enabled:boolean){
		for(var i:int = 0; i<touchs_.length; ++i){
			var touch:BoxCollider = touchs_[i];
			if(touch){
				touch.enabled = enabled;
			}
		}
	}
	
	public function okTask():Task{
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.5f);
		tl.push(wait);
		var task:Task = _effect.effectTask();
		
		TaskManager.PushFront(task, function(){
			_ok.transform.parent = _parent.transform;
			_ok.transform.localPosition = -_step * (n_ -1) - _okStep;
			_ok.transform.localScale = Vector3.one;
			_ok.gameObject.SetActive(true);
			/*
			_upOffset.transform.parent = _parent.transform;
			_upOffset.transform.localPosition =offset_ + _effect.target + _upSize;
			_upOffset.transform.localScale = Vector3.one;
			_upOffset.gameObject.SetActive(true);
			_downOffset.transform.parent = _parent.transform;
			_downOffset.transform.localPosition = -_step * (n_ -1) - _okStep - _downSize;
			_downOffset.transform.localScale = Vector3.one;
			_downOffset.gameObject.SetActive(true);*/
			
			n_++;
			_effect.target = offset_ +(_step * (n_ -1) + _okOffset);
		});
		TaskManager.PushBack(task, function(){
			this.enableTouch(true);
		});
		tl.push(task);
		return tl;
	}

	public function createTask():Task{
		var tl:TaskList = new TaskList();
		var loadTask:Task = new Task();
		var isLoadOver:boolean = false;
		loadTask.init = function(){
			var card:EZEggCardView = createCard();
			card.transform.parent = _parent.transform;
			card.transform.localPosition = -_step * (n_+1);
			card.transform.localScale = Vector3.one;
			eggCards_[n_] = card;
			eggCards_[n_].setup(cards_[n_]);
			eggCards_[n_].showCard = true;
			card.gameObject.SetActive(true);
			n_++;
			_effect.target = offset_ + _step * n_;

			isLoadOver = true;
		};
		loadTask.isOver = function(){
			return isLoadOver;
		};
		tl.push(loadTask);
		tl.push(_effect.effectTask());
		
		return tl;
	}
	
	private function createCard():EZEggCardView{
		if(_prototype){
			var obj:GameObject = GameObject.Instantiate(_prototype);
			var card:EZEggCardView = obj.GetComponent(EZEggCardView) as EZEggCardView;
			//var drag:UIDragPanelContents = obj.GetComponent(UIDragPanelContents) as UIDragPanelContents;
			//var box:BoxCollider = obj.GetComponent(BoxCollider) as BoxCollider;
			//if(box){
			//	box.enabled = false;
			//	touchs_.push(box);
			//}
			//drag.draggablePanel = this._draggablePanel;
			return card;
		}
	}
	
	public function destoryCards(){
		if(eggCards_){
			for(var i:int = 0; i< eggCards_.length; ++i){ 
				GameObject.DestroyObject(eggCards_[i].gameObject);
			} 
		}
		eggCards_ = null;
		n_ = 0;
		_ok.gameObject.SetActive(false);
		_parent.transform.localPosition = offset_;
	}
	
	private function waitTask(time:float):Task{
		if(time <= 0){
			return new Task();
		}
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		return wait;
	}
}