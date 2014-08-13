#pragma strict

class SettingMainState extends StateWithEventMap{
	private var ctrl_:EZSettingCtrl = null;
	private var isOver_:boolean = false;
	
	public function SettingMainState(ctrl:EZSettingCtrl){
		ctrl_ = ctrl;
		addEvent("id", "setup.id");
		addEvent("invitation", "setup.invitation");
		addEvent("fail", "setup.fail");
		addEvent("weixinInfo", "setup.weixin");
		addEvent("mark", "setup.mark");
	}
	public function start(){
		ctrl_.setup();
	}
	public function setupMusic(state:boolean){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		data.music = state;
		EZSoundManager.GetInstance().save(data);
		if(EZBGMManager.Instance()){
			EZBGMManager.Instance().isPlay = state;;
		
			if(state){
				EZBGMManager.Instance().playBGM(EZBGMManager.AudioType.ubattle);
			}else{
				EZBGMManager.Instance().stopBGM();
			}
		}
	}
	public function setupSound(state:boolean){
			
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		data.sound = state;
		EZSoundManager.GetInstance().save(data);
	}
	function postEvent(evt:FSMEvent){
		switch(evt.msg){
		case "sound_on":
			setupSound(true);
			break;
		case "sound_off":
			setupSound(false);
			break;
		case "music_on":
			setupMusic(true);
			break;
		case "music_off":
			setupMusic(false);
			break;
		}
		return super.postEvent(evt);
	}
	
}