#pragma strict
import System.Collections.Generic;

class EZQuestBagLoadTask extends TaskList{
	private var bag_:JsonData.QuestBag = null;
	private var list_:List.<JsonData.Quest> = new List.<JsonData.Quest>();
	public function addQuest(quest:JsonData.Quest){
		list_.Add(quest);
	}
	public function get list():List.<JsonData.Quest>{
		return list_;
	}
	public function get bag():JsonData.QuestBag{
		return this.bag_;
	}
	public function set bag(value:JsonData.QuestBag){
		bag_ = value;
	}
	
	
};