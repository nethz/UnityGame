#pragma strict

class UIVisible extends MonoBehaviour {
	var layouts:UITableLayout[];
	var widgets:UIWidget[];
	private var visible_:boolean = true;
	
	function set visible(value:boolean){
		this.visible_ = value;
		for(var i:int = 0; i< layouts.Length; ++i) {
			if(layouts[i] == null)
				Debug.Log(this.name);
				layouts[i].visible = value;
		}
		for(var n:int = 0; n< widgets.Length; ++n) {
				widgets[n].enabled = value;
		}
			
	}
	function get visible():boolean{
		return this.visible_;
	}
};