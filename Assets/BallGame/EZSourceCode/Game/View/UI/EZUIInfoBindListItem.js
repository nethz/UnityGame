#pragma strict

class EZUIInfoBindListItem extends EZBindComparerItem{
	public var _name:UILabel;
	public var _text:UILabel;
	public var _icon:UISprite;
	
	public function setup(data:EZBindData){
		this.data = data;
		_icon.spriteName = data.style;
		_name.text = data.title;
		Debug.LogWarning(data.title);
		Debug.LogWarning(data.val);
		_text.text = EZBindTable.GetInstance().getInfo(data);
	}
}