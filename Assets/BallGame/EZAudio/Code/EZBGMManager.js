#pragma strict

class EZBGMManager extends MonoBehaviour
{
	public var _audio:AudioSource;
	public var _callBack:EZBGMCallBack = null;
	public var _bossWarning:AudioClip;
	public var randomNum:int = 3;
	
	private var playList_:String[] = null;
	private var playListTemp_:List.<String>  = new List.<String>();
	private var battle1_:String[] = null;
	private var battle2_:String[] = null;
	private var ubattle1_:String[] = null;
	private var ubattle2_:String[] = null;
	private var boss1_:String[] = null;
	private var boss2_:String[] = null;
	private var isPlay_:boolean = false;
	private static var instance_:EZBGMManager = null;
	private var currentType_:AudioType = AudioType.none;
	
	public enum AudioType{
		battle,
		ubattle,
		boss,
		none,
	};
	
	public static function Instance():EZBGMManager{
		return instance_;
	}
	
	public function Awake (){
	
		initAudioArray ();
		if (instance_ != null && instance_ != this) {
			Destroy (this.gameObject);
		} 
		instance_ = this;
		/**/
	}
	
	public function Start(){
		initPlay();
	}
	
	public function set isPlay(value:boolean){
		isPlay_ = value;
	}
	
	public function playBGMNoJudge(type:AudioType){
		initPlay();
		if(isPlay_){
			currentType_ = type;
			switch(currentType_){
				case AudioType.battle:
					initplayList(battle1_,battle2_);	
				break;
				case AudioType.ubattle:
					initplayList(ubattle1_,ubattle2_);	
				break;
				case AudioType.boss:
					initplayList(boss1_,boss2_);	
				break;
				case AudioType.none:
					stopBGM();
				break;
			}
			if(type == AudioType.boss){
				_callBack.PlaySoundWithCallback(_audio,_bossWarning,playAudioList);
			}else{
				playAudioList();
			}
		}else{
			stopBGM();
		}
	}
	
	public function playBGM(type:AudioType){
		initPlay();
		if(isPlay_){
			if(currentType_ != type){
				currentType_ = type;
				switch(currentType_){
					case AudioType.battle:
						initplayList(battle1_,battle2_);	
					break;
					case AudioType.ubattle:
						initplayList(ubattle1_,ubattle2_);	
					break;
					case AudioType.boss:
						initplayList(boss1_,boss2_);	
					break;
					case AudioType.none:
						stopBGM();
					break;
				}
				if(type == AudioType.boss){
					_callBack.PlaySoundWithCallback(_audio,_bossWarning,playAudioList);
				}else{
					playAudioList();
				}
			}
		}else{
			Debug.LogWarning("<------stopBGM---------->");
			stopBGM();
		}
	}
	
	private function playAudioList(){
		AudioController.SetMusicPlaylist(playList_);
		AudioController.PlayMusicPlaylist();
	}

	private function initplayList(a:String[],b:String[]){
		if (a.Length == 0 || b.Length < randomNum) {
			Debug.LogError ("AudioClip's num is less than randomNum!!!_by db");
		}
		playListTemp_.Clear ();
		var aLength:int = a.Length;
		var bLength:int = b.Length;
		var first:String = a [Random.Range (0, aLength)];
		playListTemp_.Add (first);
		var arrB:boolean[] = new boolean[bLength];
		var temp:int = 0;
		var index:int = 0;
		while(index < randomNum){
			temp = Random.Range(0,bLength);
			if(!arrB[temp]){
				arrB[temp] = true;
				playListTemp_.Add(b[temp]);
				index++;
			}
		}
		playList_ = playListTemp_.ToArray();
	}

	private function initAudioArray(){
		battle1_ = initStrArrayByCategory("battle1");
		battle2_ = initStrArrayByCategory("battle2");
		ubattle1_ = initStrArrayByCategory("ubattle1");
		ubattle2_ = initStrArrayByCategory("ubattle2");
		boss1_ = initStrArrayByCategory("boss1");
		boss2_ = initStrArrayByCategory("boss2");
	}

	private function initStrArrayByCategory(str:String):String[]{
		var items:AudioItem[] = AudioController.GetCategory(str).AudioItems;
		var itemsLength:int = items.Length;
		if(itemsLength <= 0){
			Debug.LogError("AudioController.GetCategory is Error!!!!");
			return null;
		}
		var ret:String[] = new String[itemsLength];
		for(var i:int = 0;i < itemsLength;++i){
			ret[i] = items[i].Name;
		}
		return ret;
	}

	public function stopBGM (){
		AudioController.StopMusic();
		currentType_ = AudioType.none;
		isPlay_ = false;
	}
	
	private function initPlay (){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		isPlay_ = data.music;
	}
}
