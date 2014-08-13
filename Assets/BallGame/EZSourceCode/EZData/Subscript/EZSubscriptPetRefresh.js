#pragma strict

class EZSubscriptPetRefresh extends EZSubscriptRefresh{
	public var _talbe:EZBagTable = null;
	public function getList():List.<String>{
		var list:List.<String> = new List.<String>(); 
		var bag:JsonData.Bag = _talbe.bag;
		for(var i:int = 0; i<bag.list.Length; ++i){
			list.Add("p" + bag.list[i].id.ToString());
		}
		return list;
	}
}