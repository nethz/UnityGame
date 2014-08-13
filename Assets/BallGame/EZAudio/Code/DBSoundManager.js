#pragma strict
//UnityScript
import System.Text.RegularExpressions;

class DBSoundManager extends MonoBehaviour {
	
	public var _musicSource1:AudioSource = null;
	public var _musicSource2:AudioSource = null;
	public var _musics:MAudioClip[];
	
	private var musicSourcePlay_:AudioSource = null;
  	private static var instance_:DBSoundManager = null;
	private var isMusic_:boolean = true;
	private var musicTable_:Hashtable = new Hashtable();
	private var currMusic_:String = "";
	private var isFadeIn_:boolean = false;
	private var isFadeOutOver_:boolean = false;
	private var tvOut_:GeekTweenValue = null;
	private var maxVolume_:float = 1f;

   public static function Instance():DBSoundManager{
    	return instance_;
    }
	
	public function Awake(){
		//DontDestroyOnLoad(this.gameObject);
		//isMusic_ = Int2Bool(PlayerPrefs.GetInt("isMusic", 1));
		musicSourcePlay_ = _musicSource1;
        if (instance_ != null && instance_ != this) {
            Destroy(this.gameObject);
        }
        else{
            instance_ = this;
        }
		
		for(var i:int=0;i<_musics.Length;++i){
			musicTable_[_musics[i].name] = _musics[i].clip;
		}
	}
	
	public function Start(){
		var data:JsonData.SoundSetup = EZSoundManager.GetInstance().setup;
		 isMusic_ = data.music;
	}

	 public function Update(){
		if(isFadeIn_ && isFadeOutOver_){
			MusicFadeIn();
			isFadeIn_ = false;
			isFadeOutOver_ = false;
		}
	}

	public function get music():boolean{
		return isMusic_;
	}
	
	public function set music(value:boolean){
		isMusic_ = value;	
	}

	public function get currMusic():String{
		return this.currMusic_;
	}
	
	public function get maxVolume():float{
		return this.maxVolume_;
	}

	/*public function PlayMusic(name:String){
		if(currMusic_ != name){
			currMusic_ = name;
			switcSource();
			PlayMusic(GetMusicByName(name),true);
			isFadeIn_ = true;
			Debug.LogError("name is not  not same!!!!!");
		}else{
			isFadeIn_ = false;
			Debug.LogError("name is same!!!!!");
		}
		if(isMusic_){
			MusicFadeIn();
		}
		Debug.Log("Game current music name is :" + currMusic_);
	}
	
	public function PlayMusic(name:String,volume:float){
		maxVolume_ = volume;
		PlayMusic(name);
	}
	
	public function PlayMusic(clip:AudioClip,volume:float,loop:boolean){
		if(isMusic_){
			musicSourcePlay_.volume = volume;
			PlayMusic(clip,loop);
		}
	}
	
	public function PlayMusic(clip:AudioClip,loop:boolean){
		if(isMusic_){
	        musicSourcePlay_.clip = clip;
	        musicSourcePlay_.loop = loop;
			musicSourcePlay_.Play();
		}
	}*/
	
	public function PlayMusic(name:String,volume:float){
		maxVolume_ = volume;
		if(currMusic_ != name){
			currMusic_ = name;
			PlayNoSameMusic(currMusic_);
		}else{
			PlaySameMusic(currMusic_);
		}
	}
	
	private function PlaySameMusic(name:String){
		if(isMusic_){
			isFadeIn_ = true;
		}
	}
	
	private function PlayNoSameMusic(name:String){
		switcSource();
		musicSourcePlay_.clip = GetMusicByName(currMusic_);
		musicSourcePlay_.loop = true;
		musicSourcePlay_.volume = 0f;
		musicSourcePlay_.Play();
		if(isMusic_){
			MusicFadeIn();
		}
	}
	
	private function switcSource(){
		if(_musicSource1 == musicSourcePlay_){
			musicSourcePlay_ = _musicSource2;
		}else if(_musicSource2 == musicSourcePlay_){
			musicSourcePlay_ = _musicSource1;
		}
	}
	
	public function Stop(){
		if(_musicSource1 && _musicSource1.isPlaying){
			_musicSource1.volume = 0f;	
		}
		if(_musicSource2 && _musicSource2.isPlaying){
			_musicSource2.volume = 0f;
		}
		Debug.LogWarning("Background music is Stop!!!");
	}
	
	public function Play(){
		musicSourcePlay_.volume = maxVolume_;
		musicSourcePlay_.clip = GetMusicByName(currMusic_);
		musicSourcePlay_.Play();	
	}
	

	public function MusicFadeIn(){
		if(musicSourcePlay_){
			var fio:FadeInOut = musicSourcePlay_.gameObject.GetComponent(FadeInOut);
			fio.MusicFadeIn();
		}
	}
	
	public function MusicFadeOut(){
		if(musicSourcePlay_){
			var fio:FadeInOut = musicSourcePlay_.gameObject.GetComponent(FadeInOut);
			tvOut_ = fio.MusicFadeOut();
			tvOut_.eventReceiver = this.gameObject;
			tvOut_.callWhenFinished = "setFadeOutFlag";
		}
	}
	
	public function setFadeOutFlag(){
		isFadeOutOver_ = true;
	}
	
	private function GetMusicByName(name:String):AudioClip{
		if (musicTable_.ContainsKey(name)){
			return musicTable_[name];
		}
		Debug.LogWarning("Can not find audioclip by name!!!!");
		return null;
	}
	
	private function Int2Bool(i:int):boolean{
		if(i>0){
			return true;
		}else{
			return false;
		}
	}
	
	private function Bool2Int(b:boolean):int{
		if(b){
			return 1;
		}else{
			return 0;
		}
	}
	
}


public class MAudioClip{
	public var name:String = "";
	public var clip:AudioClip = null;
}




