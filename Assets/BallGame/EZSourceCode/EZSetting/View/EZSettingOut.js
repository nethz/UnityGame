#pragma strict

class EZSettingOut extends MonoBehaviour{
	public var _url:String = "";
	public function OnClick(){
		GeekWeixin.GoUrl(_url);
	}
}