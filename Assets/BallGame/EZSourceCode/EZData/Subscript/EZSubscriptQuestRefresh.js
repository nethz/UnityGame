#pragma strict

class EZSubscriptQuestRefresh extends EZSubscriptRefresh{
	public var _talbe:EZQuestBagTable = null;
	public function getList():List.<String>{
		var list:List.<String> = new List.<String>(); 
		var bag:JsonData.QuestBag = _talbe.bag;
		for(var i:int = 0; i<bag.list.Length; ++i){
			list.Add("q" + bag.list[i].id.ToString());
		}
		return list;
	}
}