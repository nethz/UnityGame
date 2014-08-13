#pragma strict


class AffixUnitTestValResult extends MonoBehaviour {
		
	public var type:String = "";
	public var times:int = 1;
	public var target:EZTarget.Target = EZTarget.Target.Rival;
	public var magic:float = 0;
	public var physics:float = 0;
	public function push(data:EZTechDataValue, seat:EZSoul.Seat){
//		data.prepare();
		this.type = data.type;
		this.times = data.times;
		this.target = data.target;
		Debug.Log(data.physics);
		this.physics = data.physics(seat); 
		this.magic = data.magic(seat); 
		
		var previous:EZTechData = data.previous;
		if(previous != null){
			AffixUnitTestResult.PushNext(this.gameObject, previous, seat);
		}
		
		
		var next:EZTechData = data.next;
		if(next != null){
			AffixUnitTestResult.PushNext(this.gameObject, next, seat);
		}
		
	}

	
}
