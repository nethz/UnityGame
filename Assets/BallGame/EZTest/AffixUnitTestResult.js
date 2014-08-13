#pragma strict


class AffixUnitTestResult extends MonoBehaviour {
		
	public var type:String = "";
	public var original:float = 0;
	public var times:int = 1;
	public var target:EZTarget.Target = EZTarget.Target.Rival;
	public var magic:float = 0;
	public var physics:float = 0;
	public function push(data:EZTechDataRoot, seat:EZSoul.Seat){
		data.prepare();
		this.type = data.type;
		this.original = data.original;
		this.times = data.times();
		this.target = data.target;
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
	public static function PushNext(obj:GameObject,next:EZTechData, seat:EZSoul.Seat){
		switch(next.type){
		case "bind":
			var result:AffixUnitTestBindResult =  obj.AddComponent(AffixUnitTestBindResult);
			result.push(next as EZTechDataBind, seat);
			break;
		case "attack":
			var re2:AffixUnitTestValResult =  obj.AddComponent(AffixUnitTestValResult);
			re2.push(next as EZTechDataValue, seat);
			break;
		case "medical":
			var re3:AffixUnitTestValResult =  obj.AddComponent(AffixUnitTestValResult);
			re3.push(next as EZTechDataValue, seat);
			break;
		}
	}
	
}
