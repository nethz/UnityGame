#pragma strict

class SetShowView extends MonoBehaviour{
	public var _widgets:UIWidget[];
	public var _boxs:Collider[];
	
	public function set show(value:boolean){
		for(var i:int = 0;i<_widgets.length;++i){
			_widgets[i].enabled = value;
		}
		for(var j:int = 0;j<_boxs.length;++j){
			_boxs[j].enabled = value;
		}
	}

}