#pragma strict

class MagicPetEffect extends MonoBehaviour{

	public var _circle:MagicCircleEffect = null;
	public var _bigCard:EZEggBigCardView = null;
	public var _parameters:DrawPetPar = null;
	public var _cardManager:EZEggCardManager = null;
	public var _bgEffect:EZEggListBgEffect = null;
	public var _p2c:EZEggP2CTask = null;
	private var isShow_:boolean = false;
	
	public function Awake(){
		
	}
	
	public function show(isShow:boolean){
		isShow_ = isShow;
		refresh();
	}
	
	public function refresh(){
		if(isShow_){
			_circle.show(true);
		}else{
			_bgEffect.reSet();
			_cardManager.destoryCards();
			_circle.show(false);
			
		}
	}
	
	public function drawEgg(cards:List.<EZCard>){
		//_p2c = new EZEggP2CTask(_bigCard,_parameters, _card1, _card2);
		var tl:TaskList = new TaskList();
		tl.push(_circle.speedUp());
		tl.push(_bgEffect.listBgOneTask());
		for(var i:int = 0;i<cards.Count;++i){
			tl.push(_circle.shake());
			tl.push(_p2c.createTask(cards[i]));
			if(i == (cards.Count - 1)){
				var mt:MultiTask = new MultiTask();
				mt.push(_cardManager.createTask());
				mt.push(_cardManager.okTask());
				tl.push(mt);
			}else{
				tl.push(_cardManager.createTask());
			}
		}
		if(cards.Count > 0){
			tl.push(_bgEffect.listBgTenTask());
		}
		tl.push(_circle.speedDown());
		TaskManager.PushFront(tl,function (){
			_cardManager.setup(cards);
		});
		TaskManager.Run(tl);
	}
	/*
	public function drawOne(card:EZCard){
		var tl:TaskList = new TaskList();
		tl.push(_circle.speedUp());
		tl.push(_bgEffect.listBgOneTask());
		tl.push(_circle.shake());
		tl.push(p2c_.createTask(null));
		var mt:MultiTask = new MultiTask();
		mt.push(_cardManager.createTask());
		mt.push(_cardManager.okTask());
		tl.push(mt);
		tl.push(_circle.speedDown());
		
		TaskManager.Run(tl);
	}*/
}