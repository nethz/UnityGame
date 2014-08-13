#pragma strict

class EZDebugWaveDoc extends MonoBehaviour{
	
    public var _battle:String[];
    public var _bag1:String[];
    public var _bag2:String[];
    
    
    
    
    public var _battleInfo:String;
    public var _bag1Info:String;
    public var _bag2Info:String;
    
	public function getData(data:JsonData.Stronghold):JsonData.WaveDoc{
		var wave:JsonData.WaveDoc = new JsonData.WaveDoc();
		if(data.battle && data.battle.soul){
			wave.battle = new JsonData.PositionDoc[1];
			wave.battle[0] = new JsonData.PositionDoc();
			
			wave.battle[0].type = data.battle.soul.type;
			wave.battle[0].pop = _battle;
			wave.battle[0].info = _battleInfo;
			
			
		}
		
		
		if(data.bag1 && data.bag1.soul){
			wave.bag1 = new JsonData.PositionDoc[1];
			wave.bag1[0] = new JsonData.PositionDoc();
			wave.bag1[0].type = data.bag1.soul.type;
			wave.bag1[0].pop = _bag1;
			wave.bag1[0].info = _bag1Info;
		}
		
		
		if(data.bag2 && data.bag2.soul){
			wave.bag2 = new JsonData.PositionDoc[1];
			wave.bag2[0] = new JsonData.PositionDoc();
			wave.bag2[0].type = data.bag2.soul.type;
			wave.bag2[0].pop = _bag2;
			wave.bag2[0].info = _bag2Info;
		}
		
		
		return wave;
		
	}

}
