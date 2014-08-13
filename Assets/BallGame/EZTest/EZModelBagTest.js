#pragma strict
class EZModelBagTest extends EZContainer{

	//public var _seat:EZSoul.Seat = EZSoul.Seat.WeBag1;
	public var _json:String;
	public var _result:EZModelBagTestData;
	//private var store_:EZMagicStore = null;
	
	public function Awake(){ 
		super.Awake();
		//store_ = this.gameObject.AddComponent(EZMagicStore) as EZMagicStore;
		//store_.getTechnique = function():EZTechnique{
	//		return soul.magic;
	//	};
		
	}
	
	
	public function Start(){
		var data:JsonData.Soul = JsonData.Soul.Load(_json);
		var s:EZSoul = EZPetSoul.Create(data);
		
		_result.setSoul(s);
		this.setSoul(s); 
		
	}
	

		
	function changeTo(to:EZContainer):boolean{
		if(!this.isDie()){
			this.swap(to);
			return true;
		}
		return false;
	}

	
}
