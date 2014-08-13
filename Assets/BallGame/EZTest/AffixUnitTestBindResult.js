#pragma strict


class AffixUnitTestBindResult extends MonoBehaviour {
		
	public var type:String = "";
	public var target:EZTarget.Target = EZTarget.Target.Rival;
	public function push(data:EZTechDataBind, seat:EZSoul.Seat){
		 
		this.type = data.type;
		this.target = data.target;
		data.binding(seat);
		var next:EZTechData = data.next;
		if(next != null){
			AffixUnitTestResult.PushNext(this.gameObject, next, seat);
		}
		//EZDotManager.

	}

	
}
