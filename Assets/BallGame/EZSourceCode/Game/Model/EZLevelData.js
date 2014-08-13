#pragma strict

class EZLevelData{


	private var strongholds_:EZStronghold[];
	private var wave_:int = 0;
	private var currStronghold_:EZStronghold = null;
	public function load(data:JsonData.Stronghold[], docs:JsonData.WaveDoc[]){
		strongholds_ = new EZStronghold[data.Length];
		for(var i:int; i < strongholds_.length; ++i){
			var wave:JsonData.WaveDoc = null;
			if(docs && docs.Length > i && docs[i]){
				wave = docs[i];
			}
			strongholds_[i] = EZStrongholdManager.Create(data[i], wave);
		}
	}
	public function get count():int{
		return strongholds_.Length;
	}
	public function reset(){
		wave_ = 0;
		if(strongholds_ != null && strongholds_.Length > wave_){
			currStronghold_ = strongholds_[wave_];
		}else{
			currStronghold_ = null;
		}
		
	}
	public function next(){
		++wave_;
		if(strongholds_ != null && strongholds_.Length > wave_){
			currStronghold_ = strongholds_[wave_];
		}else{
			currStronghold_ = null;
		}
	}
	public function get currStronghold():EZStronghold{
		return currStronghold_;
	}

}