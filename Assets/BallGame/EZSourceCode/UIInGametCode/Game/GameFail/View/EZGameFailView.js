#pragma strict

class EZGameFailView extends MonoBehaviour{
	public var _countdown:FailCountdownView;
	public var _revive:FailReviveView = null;
	public var _over:GameResultView = null;
	public var _title:GameTitleView = null;
	public var _back:UISprite = null;
	private static var instance_:EZGameFailView = null;
	public function Awake(){ 
		this.instance_ = this;
		_back.enabled = false;
	}
	public static function GetInstance():EZGameFailView{
	
		return this.instance_;
	}
	public function get countdown():FailCountdownView{
		return this._countdown;
	}
	public function get title():GameTitleView{
		return this._title;
	}
	
	public function open(){
		_back.enabled = true;
	}
	public function close(){
		_back.enabled = false;
	}
	public function setup(title:String){
		_title.setup(title);
	}

	public function Start(){
		this.hide();
	}
	
	public function get revive(){
		return this._revive;
	}
	
	public function get over(){
		return this._over;
	}
	
	
	public function show(){
		_revive.setEnabled(true);
	}
	public function hide(){
		_revive.setEnabled(false);
	}
	
}