#pragma strict

class EZCardTeamModel extends MonoBehaviour{
	public enum Level{
		Level0 = 0,
		Level1 = 1,
		Level2 = 2,
	}
	private var cards_:EZCard[] = new EZCard[3];
	public var selected_:EZSoul.Seat = EZSoul.Seat.None;
	private function getIndex(seat:EZSoul.Seat):int{
		var ret:int = -1;
		switch(seat){
			case EZSoul.Seat.WeBattle:
				ret = 0;
				break;
			case EZSoul.Seat.WeBag1:
				ret = 1;
				break;
			case EZSoul.Seat.WeBag2:
				ret = 2;
				break;
		}
		return ret;
	}
	
	public function setCard(seat:EZSoul.Seat, data:EZCard){
		var index:int = getIndex(seat);
		if(index != -1){
		
			if(!cards_[index] || !cards_[index].locked){
				if(cards_[index]){
					cards_[index].seat = EZSoul.Seat.None;
				}
				cards_[index] = data;
				if(data)
					data.seat = seat;
				return;
			}
		}
		if(data){
			data.seat = EZSoul.Seat.None;
		}
		return;
	}
	public function getCard(seat:EZSoul.Seat):EZCard{
		var ret:EZCard = null;
		
		var index:int = getIndex(seat);
		if(index != -1){
			ret = cards_[index];
		}
		
		return ret;
		
	}
	
	
	public function set battle(value:EZCard){
		setCard(EZSoul.Seat.WeBattle,value);
	}
	
	
	public function set bag1(value:EZCard){
		setCard(EZSoul.Seat.WeBag1,value);
	}
	
	
	public function set bag2(value:EZCard){
		setCard(EZSoul.Seat.WeBag2,value);
	}

	
	
	public function get battle():EZCard{
		return getCard(EZSoul.Seat.WeBattle);
	}
	
	
	public function get bag1():EZCard{
		return getCard(EZSoul.Seat.WeBag1);
	}
	
	
	public function get bag2():EZCard{
		return getCard(EZSoul.Seat.WeBag2);
	}
	
	
	public function initCard(data:EZCard){
		setCard(data.seat, data);
	}
	
	
	public function unset(data:EZCard){
		setCard(data.seat, null);
	}
	
	public function addCard(data:EZCard){
		
		if(selected_ != EZSoul.Seat.None && data.seat != EZSoul.Seat.None && EZSoul.Seat.None != data.seat){
			if(testSwap(this.selected_, data.seat)){
				data.seat = this.selected_;
			}
		}else{
			setCard(selected_, data);
		}
		
		this.selected_ = EZSoul.Seat.None;
	}
	
	public function setLevel(value:EZCardTeamModel.Level){
		
		var level:EZCardTeamModel.Level =  value;
		if(level == EZCardTeamModel.Level.Level0){
			
			battle = null;
			bag1 = new EZCard();
			bag2 = new EZCard();
		}else if(level == EZCardTeamModel.Level.Level1){
			battle = null;
			bag1 = null;
			bag2 = new EZCard();
		}else{
			battle = null;
			bag1 = null;
			bag2 = null;
		}
	}
	
	public function check(){
		this.selected_ = EZSoul.Seat.None;
		if(battle == null){
			selected = EZSoul.Seat.WeBattle;
		}else if(bag1 == null){
			selected = EZSoul.Seat.WeBag1;
		}else if(bag2 == null){
			selected = EZSoul.Seat.WeBag2;
		}
		
	}
	public function set selected(value:EZSoul.Seat){
		var select:EZSoul.Seat = value;
		var card:EZCard = getCard(select);
		if(card && card.locked){
			return;
		}
		
		
		if(this.selected_ == select){
			this.selected_ = EZSoul.Seat.None;
				
		}else{
			this.selected_ = select;
		
		}
		
	}
	
		
	private function testSwap(from:EZSoul.Seat, to:EZSoul.Seat):boolean{
		if(from == to){
			return false;
		}
		
		var fCard:EZCard = getCard(from);
		var tCard:EZCard = getCard(to);
	
		if(fCard && tCard && !fCard.locked && !tCard.locked){
			setCard(from, tCard);
			setCard(to, fCard);
			return true;
		}
		return false;
		
	}
	public function getSelectedCard():EZCard{
		if(this.selected_ == EZSoul.Seat.None){
			return null;
		}
		
		var card:EZCard = getCard(selected_);
		return card;
	}
	public function save(){
	
		
		var team:JsonData.Team = new JsonData.Team();
		if(battle && !battle.locked){
			team.battle = battle.id;
		}else{
			team.battle = -1;
		}
		
		
		if(bag1 && !bag1.locked){
			team.bag1 = bag1.id;
		}else{
			team.bag1 = -1;
		}
		
		
		
		if(bag2 && !bag2.locked){
			team.bag2 = bag2.id;
		}else{
			team.bag2 = -1;
		}
		
		EZTeamTable.GetInstance().save(team);
	}
	

	


	public function get selected():EZSoul.Seat{
		return this.selected_;
	}
	
	
	
	
	
	
	
}
