#pragma strict

class EZCardUpdateBtn extends MonoBehaviour{
	public var _shouldBeEnabled:boolean = true;
	public var _btns:UIButton[] = null;
	
	public function Awake(){
		if(_btns == null){
			_btns = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UIButton), 
				function (component){component as UIButton;}
				);
		}
	}
	
	public function updateColor(){
		for(var i:int = 0;i<_btns.Length;++i){
			_btns[i].UpdateColor(_shouldBeEnabled,true);
		}
	}
}