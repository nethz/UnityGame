#pragma strict

class EZWildStronghold extends EZStronghold{
	
	private var battle_:EZThePosition = new EZThePosition();
	private var bag1_:EZThePosition = new EZThePosition();
	
	private var bag2_:EZThePosition = new EZThePosition();
	
	public function get type():EZStronghold.Type{
		return EZStronghold.Type.Wild;
	}
	
	public function load(data:JsonData.Stronghold, doc:JsonData.WaveDoc){
		super.load(data, doc); 
		
		if(data.battle && data.battle.soul){ 
//			Debug.LogWarning(data.battle.soul);
			battle_.soul = EZBossSoul.Create(data.battle.soul);
			
			battle_.dropQuality = data.battle.dropQuality;
			if(doc != null){
				var battleDoc:JsonData.PositionDoc = doc.getBattle(data.battle.soul.type);
				if(battleDoc){
					battle_.info = battleDoc.info;
					if(battleDoc.pop && battleDoc.pop.Length != 0){
						battle_.pop = battleDoc.pop[Random.Range (0, battleDoc.pop.Length)];
					}
				}
			}
		}else{
			battle_.soul = EZNoneSoul.Create();
		}
		
		if(data.bag1 && data.bag1.soul){ 
			bag1_.soul = EZBossSoul.Create(data.bag1.soul);
			bag1_.dropQuality = data.bag1.dropQuality;
			
			if(doc != null){
				var bag1Doc:JsonData.PositionDoc = doc.getBag1(data.bag1.soul.type);
				if(bag1Doc){
					bag1_.info = bag1Doc.info;
					if(bag1Doc.pop && bag1Doc.pop.Length != 0){
						bag1_.pop = bag1Doc.pop[Random.Range (0, bag1Doc.pop.Length)];
					}
				}
			}
		}else{
			bag1_.soul = EZNoneSoul.Create();
		}
			
		if(data.bag2 && data.bag2.soul){ 
			bag2_.soul = EZBossSoul.Create(data.bag2.soul);
			bag2_.dropQuality = data.bag2.dropQuality;
			
			if(doc != null){
				var bag2Doc:JsonData.PositionDoc = doc.getBag2(data.bag2.soul.type);
				if(bag2Doc){
					bag2_.info = bag2Doc.info;
					if(bag2Doc.pop && bag2Doc.pop.Length != 0){
						bag2_.pop = bag2Doc.pop[Random.Range (0, bag2Doc.pop.Length)];
					}
				}
			}
//			Debug.LogWarning(bag2_.soul);
		}else{
			bag2_.soul = EZNoneSoul.Create();
		}
		
	}
	

	public function get battle():EZThePosition{
		return battle_;
	}
	//public function get battleMoney():int{
	//	return battleMoney_;
	//}
	//public function get battleDrop():int{
	//	return battleDrop_;
	//}
	public function get bag1():EZThePosition{
		return bag1_;
	}
	//public function get bag1Money():int{
	//	return bag1Money_;
	//}
//	public function get bag1Drop():int{
	//	return bag1Drop_;
	//}
	
	public function get bag2():EZThePosition{
		return bag2_;
	}

	
	
	
}