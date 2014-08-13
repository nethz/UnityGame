#pragma strict

class EZSoundManager extends MonoBehaviour{
	private static var instance_:EZSoundManager = null;	
	private var tableName_:String = "game_sound_setup";
	public var setup_:JsonData.SoundSetup = null;
	public class SoundInfo{
		public var _name:String;
		public var _sound:EZSound = null;
	};
	public function get setup():JsonData.SoundSetup{
		return setup_;
	}
	
	  
	function Awake(){
		this.instance_ = this;
		if(PlayerPrefs.HasKey(tableName_)){
			setup_ = JsonData.SoundSetup.Load(PlayerPrefs.GetString(tableName_));
		}
		
		if(setup_ == null){
			setup_ = new JsonData.SoundSetup();
		}
		this.save(setup_);
	}
	
	
	public function save(setup:JsonData.SoundSetup){
		setup_ = setup;
		var json:String = JsonData.SoundSetup.Save(setup);
		PlayerPrefs.SetString(tableName_, json);
		PlayerPrefs.Save();
		if(setup_.sound){
			NGUITools.soundVolume = 1;
		}else{
			NGUITools.soundVolume = 0;
		}

	}
	
	
	public static function GetInstance():EZSoundManager{
		return this.instance_;
	}


}