#pragma strict

class Common extends MonoBehaviour{
	public var _prototype:GameObject = null;
	private var common_:GameObject = null;
	
	function Awake(){
		if(common_ == null){
			this.common_ = GameObject.FindGameObjectWithTag("Common");
		}
		
		if(!this.common_){
			this.common_ = Instantiate(_prototype, Vector3(0,0,0), transform.rotation);
			this.common_.name = "GameCommon";
		}
		DontDestroyOnLoad(this.common_);
	}
}