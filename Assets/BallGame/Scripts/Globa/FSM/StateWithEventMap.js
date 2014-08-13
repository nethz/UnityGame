#pragma strict

class StateWithEventMap extends State{

	private var evtMap_:Hashtable = new Hashtable();
	public function addEvent(evt:String, state:String){
		evtMap_[evt] = state;
	}
	
	function postEvent(evt:FSMEvent){
		var ret:String = "";
		if(evtMap_.ContainsKey(evt.msg)){
			ret = evtMap_[evt.msg].ToString();
		}
		return ret;
	}

	
}