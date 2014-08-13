#pragma strict
import System.Collections.Generic;

class EZCardDrawLoad{
	private var tl_:TaskList = new TaskList();
	public function get taskList():TaskList{
		return tl_;
	}
	
	
	
	private var bag_:JsonData.Bag = null;
	private var draw_:JsonData.Draw = null;
	private var cards_:List.<EZCard> = null;
	public function get cards():List.<EZCard>{
		return cards_;
	
	}
//	private var list_:List.<JsonData.Soul> = new List.<JsonData.Soul>();
	
	
	/*
	public function addSoul(soul:JsonData.Soul){
		if(draw_.has(soul.id)){
			var card:EZCard = new EZCard();
			card.load(soul);
			cards_.Add(card);
		}
		list_.Add(soul);
	}
	
	*/
	public function get draw():JsonData.Draw{
		return draw_;
	}
	
	public function get bag():JsonData.Bag{
		return this.bag_;
	}
	public function set bag(value:JsonData.Bag){
		bag_ = value;
	}
	/*
	public function get draw():JsonData.Draw{
		return this.draw_;
	}*/
	public function set draw(value:JsonData.Draw){
		draw_ = value; 
		cards_= new  List.<EZCard>(); 
		for(var i:int= 0; i<draw_.list.Length; ++i){
			var card:EZCard = new EZCard(); 
			card.load(draw_.list[i]);
			cards_.Add(card);
		}
	}
	
	
};