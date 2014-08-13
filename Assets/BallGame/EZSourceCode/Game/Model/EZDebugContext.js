#pragma strict

class EZDebugContext extends MonoBehaviour{
	
	public function Awake(){
		PlayerPrefs.SetInt("card_userLocked_0", EZCard.UserLocked.locked);
		PlayerPrefs.Save();
		n_ = 0;
	}
	class Talk{
		public var _seat:EZSoul.Seat = EZSoul.Seat.None;
		public var _first:String = null;
		public var _weBattle:String = null;
	};
	public var _talks:Talk[] = null;
	public var _box:EZClickBox = null;
	private var n_:int = 0;
	public function next(){
		++n_;
	}
	public function get talk():EZDebugContext.Talk{
		var talk:EZDebugContext.Talk = null;
		if(_talks && n_>=0 && n_< _talks.Length){
			talk = _talks[n_];
			Debug.LogWarning(talk._weBattle);
			Debug.LogWarning(talk._first);
		}
		return talk;
	}
	
	
	
};