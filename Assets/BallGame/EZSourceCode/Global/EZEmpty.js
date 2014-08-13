#pragma strict

class EZEmpty extends MonoBehaviour{
	public var _time:float = 0f;
	private var allTime_:float = 0.0f;
	public function Start(){
		Resources.UnloadUnusedAssets();
		allTime_ = 0.0f;
	}
	public function OnDestroy(){
		System.GC.Collect();
	}
	public function Update(){
		var time:float = 0;
		allTime_ += Time.deltaTime;
		if(allTime_ > _time){
			//Application.LoadLevel(EZGlobal.GetInstance().nextName);
		}
	
	}
}