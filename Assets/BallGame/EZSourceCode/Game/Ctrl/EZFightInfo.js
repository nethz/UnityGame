#pragma strict

class EZFightInfo extends MonoBehaviour{
	private static var instance_:EZFightInfo = null;
	public function Awake(){
		this.instance_ = this;
	}
	
	public static function GetInstance():EZFightInfo{
		return this.instance_;
	}
	public function setSeat(seat:EZSoul.Seat){
		Debug.Log(seat);
		var soul:EZSoul = EZContainerManager.GetSoul(seat) as EZSoul;
		if(soul){
			EZUIInfo.GetInstance().setup(soul);
		}
	}
}