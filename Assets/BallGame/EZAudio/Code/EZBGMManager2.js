#pragma strict

class EZBGMManager2 extends MonoBehaviour
{
	public var _ubattleVolum:float = 1f;
	public var _battleVolum:float = 1f;
	public var _bossVolum:float = 1f;
	public var _audio:AudioSource;
	public var _callBack:EZBGMCallBack = null;
	//public var _maxVolume:float = 1f;
	private var maxVolume_:float = 1f;
	public var _fadeTime:float = 1f;
	public var _ubattleAudiosA:AudioClip[];
	public var _ubattleAudiosB:AudioClip[];
	public var _battleAudiosA:AudioClip[];
	public var _battleAudiosB:AudioClip[];
	public var _bossWarning:AudioClip;
	public var _bossAudiosA:AudioClip[];
	public var _bossAudiosB:AudioClip[];
	public var randomNum:int = 3;
	
	private var isPlay_:boolean = false;
	private var audioList_:ArrayList = new ArrayList ();
	private var currBGM_:AudioClip;
	private static var instance_:EZBGMManager2 = null;
	private var tv_:GeekTweenValue = null;
	//private var audioType_:AudioType = AudioType.none;
	
	public enum AudioType{
		battle,
		ubattle,
		boss,
		none,
	};
	
	public static function Instance():EZBGMManager2{
		return instance_;
	}
	
	public function set isPlay(value:boolean){
		isPlay_ = value;
	}
	
	public function Awake (){
		if (instance_ != null && instance_ != this) {
			Destroy (this.gameObject);
		} else {
			instance_ = this;
		}
		//audioType_ = AudioType.none;
	}
	
	public function Start (){
		//_audio.volume = _maxVolume;
		initPlay ();
	}
	
	/*public function get audioType():AudioType{
		 return this.audioType_;
	}
	
	public function set audioType(value:AudioType){
		audioType_ = value;
	}*/
	
	public function playBGM(type:AudioType){
		//if(audioType_ != type){
		//	audioType_ = type;
			initPlay();
			if(isPlay_){
				switch(type){
					case AudioType.battle:
						maxVolume_ = _battleVolum;
						_audio.volume = _battleVolum;
						initAudioList (_battleAudiosA, _battleAudiosB);
					break;
					case AudioType.ubattle:
						maxVolume_ = _ubattleVolum;
						_audio.volume = _ubattleVolum;
						initAudioList (_ubattleAudiosA, _ubattleAudiosB);
					break;
					case AudioType.boss:
						maxVolume_ = _bossVolum;
						_audio.volume = _bossVolum;
						initAudioList (_bossAudiosA, _bossAudiosB);
					break;
					case AudioType.none:
						stopBGM();
					break;
				}
				var tl:TaskList = new TaskList();
				var outTask:Task = fadeOut();
				TaskManager.PushBack(outTask,function(){
					if(audioList_ && audioList_.Count > 0){
						if(type == AudioType.boss){
							_callBack.PlaySoundWithCallback(_audio,_bossWarning,playBossAudio);
						}else{
							_callBack.PlaySoundWithCallback(_audio,audioList_[0],randomPlay);
						}
					}
				});
				tl.push(outTask);
				tl.push(fadeIn());
				TaskManager.Run(tl);
			}
		//}
	}

	public function stopBGM (){
		if(_audio){
			_audio.Stop ();
		}
		isPlay_ = false;
	}
	
	private function initPlay (){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		isPlay_ = data.music;
	}
	
	private function playBossAudio(){
		_callBack.PlaySoundWithCallback(_audio,audioList_[0],randomPlay);
	}
	
	private function randomPlay (){
		if(isPlay_){
			var temp:AudioClip = audioList_ [Random.Range (0, audioList_.Count)] as AudioClip;
			while (temp == currBGM_) {
				temp = audioList_ [Random.Range (0, audioList_.Count)] as AudioClip;
			}
			currBGM_ = temp;
			_callBack.PlaySoundWithCallback(_audio,currBGM_,randomPlay);
		}

	}

	private function initAudioList (a:AudioClip[],b:AudioClip[]){
		if (a.Length == 0 || b.Length < randomNum) {
			Debug.LogError ("AudioClip's num is less than randomNum!!!_by db");
		}
		audioList_.Clear ();
		var aLength:int = a.Length;
		var bLength:int = b.Length;
		var first:AudioClip = a [Random.Range (0, aLength)];
		audioList_.Add (first);
		var arrB:boolean[] = new boolean[bLength];
		var flag:int = 0;
		while (flag < randomNum) {
			var temp:int = Random.Range (0, bLength);
			if (!arrB [temp]) {
				audioList_.Add (b [temp]);
				arrB [temp] = true;
				flag++;
			}
		}
		for (var i:int = 0; i < audioList_.Count; ++i) {
		//	Debug.Log ("PlayList" + "[" + i + "]" + audioList_ [i].ToString ());
		}
	}
	
	private function fadeOut():Task{
		if(this){
			var task:Task = new Task();
			task.init = function(){
				tv_ = GeekTweenValue.Begin(this.gameObject,_fadeTime,_audio.volume,0f,this.gameObject,"setVolume");
			};
			task.isOver = function():boolean{
				if(tv_ && !tv_.enabled){
					return true;
				}
				return false;
			};
			return task;
		}
		return new Task();
	}
	
	private function fadeIn():Task{
		if(this){
			var task:Task = new Task();
			task.init = function(){
				tv_ = GeekTweenValue.Begin(this.gameObject,_fadeTime,_audio.volume,maxVolume_,this.gameObject,"setVolume");
			};
			task.isOver = function():boolean{
				if(tv_ && !tv_.enabled){
					return true;
				}
				return false;
			};
			return task;
		}
		return new Task();
	}
	
	private function setVolume(v:float){
		_audio.volume = v;
	}
}
