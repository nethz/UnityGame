#pragma strict
import System.Collections.Generic;

class EZCardBagLoadTask extends TaskList{
	private var bag_:JsonData.Bag = null;
	private var list_:List.<EZCard> = new List.<EZCard>();
	public function addCard(soul:JsonData.Soul){
		var card:EZCard = new EZCard();
		card.load(soul);
		list_.Add(card);
	}
	public function get list():List.<EZCard>{
		return list_;
	}
	public function get soulList():JsonData.Soul[]{
		var souls:JsonData.Soul[] = new JsonData.Soul[list_.Count];
		for(var i:int = 0; i< list_.Count; ++i){
			souls[i]= list_[i].soul;
		}
		return souls;
	}
	public function get bag():JsonData.Bag{
		return this.bag_;
	}
	public function set bag(value:JsonData.Bag){
		bag_ = value;
	}
	
	
};