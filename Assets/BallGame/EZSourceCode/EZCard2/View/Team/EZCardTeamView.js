#pragma strict

class EZCardTeamView extends EZCardViewBase{
	public var _topTitle:UISprite = null;
	public var _guide:EZCardTeamGuide = null;
	public var _button:EZLockButton;
	public var _panel:UIPanel;
	public var _battle:EZCardViewSeat;
	public var _bag1:EZCardViewSeat;
	public var _bag2:EZCardViewSeat;
	public var _table:GeekTable;
	public function show(){ 
		setEnabled(true);
		_topTitle.spriteName = "teamTop";
	}
	public function hide(){
		_guide.post("enable");
		
		setEnabled(false);
	}
	public function initGuide(){
		_guide.init();
	}
	public function overGuide(){
		_guide.over();
	}
	public function refresh(){
		_battle.refresh();
		_bag1.refresh();
		_bag2.refresh();
		_table.repositionNow = true;
		if(_battle.isEmpty() || _bag1.isEmpty() ||_bag2.isEmpty() ){
			if(_battle.selected || _bag1.selected ||_bag2.selected ){
				_guide.post("main");
			}else if(!_battle.selected && _battle.isEmpty()){
				_guide.post("battle");
			}else if(!_bag1.selected && _bag1.isEmpty()){
				_guide.post("bag1");
			}else if(!_bag2.selected && _bag2.isEmpty()){
				_guide.post("bag2");
			}
			
		}else{
			_guide.over();
		}
	
	}
	public function get panel():UIPanel{
		return _panel;
	}
	
	
	public function get button():EZLockButton{
		return _button;
	}
	
	public function setCards(battle:EZCard, bag1:EZCard, bag2:EZCard){
		_battle.setCard(battle);
		_bag1.setCard(bag1);
		_bag2.setCard(bag2);
		this.refresh();
	}
	public function setSelected(seat:EZSoul.Seat){
		switch(seat){
			case EZSoul.Seat.WeBattle:
				_battle.selected = true;
				_bag1.selected = false;
				_bag2.selected = false;
			break;
			case EZSoul.Seat.WeBag1:
				_battle.selected = false;
				_bag1.selected = true;
				_bag2.selected = false;
			break;
			case EZSoul.Seat.WeBag2:
				_battle.selected = false;
				_bag1.selected = false;
				_bag2.selected = true;
				
			break;
			case EZSoul.Seat.None:
				_battle.selected = false;
				_bag1.selected = false;
				_bag2.selected = false;
				
			break;
		}
		this.refresh();
	}

	
}