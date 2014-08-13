#pragma strict

class EZSetSceneBGM extends MonoBehaviour{
	public var _audioType:EZBGMManager.AudioType = EZBGMManager.AudioType.ubattle;
	public var _isEZGame:boolean = false;
	
	public function Start(){
		if(_isEZGame){
			if(EZBGMManager.Instance()){
				EZBGMManager.Instance().playBGMNoJudge(_audioType);
			}
		}else{
			if(EZBGMManager.Instance()){
				EZBGMManager.Instance().playBGM(_audioType);
			}
		}
	}

}