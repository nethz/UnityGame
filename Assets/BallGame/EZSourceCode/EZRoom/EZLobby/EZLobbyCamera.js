#pragma strict
class EZLobbyCamera extends MonoBehaviour{
	public var _tableName:String = "lobby_camera";
	public var _start:float = 162924.2f;
	public var _first:float = 162924.2f;
	public var _magicBall:float = 162924.2f;
	public var _cameInSize:float = 960;
	public var _firstSize:float = 600;
	public var _camera:Camera = null;
	public var _left:float = 0.0f;
	public var _magicBallStar:EZLobbyStar = null;
	function firstIn(){
		this.transform.localPosition.x  = _first;
		_camera.orthographicSize = _firstSize;
	}
	function comeIn(){
		
		var guide:EZGuideTable = EZGuideTable.GetInstance();
		if(guide.data && guide.data.canCrystal && _magicBallStar.hasStar){
			this.transform.localPosition.x  = _magicBall;
		}else if(PlayerPrefs.HasKey(_tableName)){
			try{
				var start:float = PlayerPrefs.GetFloat(_tableName);
				if(start < _start){
					this.transform.localPosition.x  = _left;
				}else{
					this.transform.localPosition.x  = start;
				}
			}catch(e:System.Exception)
			{	
				this.transform.localPosition.x  = _left;
				PlayerPrefs.DeleteKey(_tableName);
			}
			
		}else{
			this.transform.localPosition.x  = _left;
		}
		_camera.orthographicSize = _cameInSize;
	}
	
	function OnDestroy(){
		PlayerPrefs.SetFloat(_tableName, this.transform.localPosition.x);
		PlayerPrefs.Save();
	}
}