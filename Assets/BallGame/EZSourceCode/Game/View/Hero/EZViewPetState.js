#pragma strict
/*
class EZViewPetState extends MonoBehaviour{
	public var _state = "";
	private var data_:EZBindData;
	
	function setState(state:String, number:int, bind:EZHudBindManager){
		if(state != _state){
			_state = state;
			if(data_){
				bind.execute(data_, EZBindData.Action.Destroy);
				data_ = null;
			}
			
			data_ = EZBindTable.GetInstance().create(_state, Geek.MagicType.None);
			if(data_){
				data_.number = number;
				bind.execute(data_, EZBindData.Action.Create);
			}
	}
	}

}*/