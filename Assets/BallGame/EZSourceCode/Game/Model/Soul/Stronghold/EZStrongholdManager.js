#pragma strict

class EZStrongholdManager{


	public static function Create(data:JsonData.Stronghold, doc:JsonData.WaveDoc):EZStronghold{
		var stronghold:EZStronghold = null;
		if(data.type == "Rival"){
			stronghold = new EZRivalStronghold();
		}else{
			
			stronghold = new EZWildStronghold();
		}
	
//		Debug.LogWarning(stronghold + "???");
		if(stronghold){
			stronghold.load(data, doc);
		}
		return stronghold;
	}

}