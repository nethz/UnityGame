#pragma strict
class UIPanelLayout extends MonoBehaviour
{

	private var tables_:UITableLayout[] = null;
	public var adaptation:Adaptation = null; 
	function Awake(){
		if(tables_ == null){
			tables_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(UITableLayout), 
				function (component){component as UITableLayout;}
				);
		}
		
		this.doLayout(this.adaptation.getRect());
		
	
	}
	
	function getRect(){
		return  this.adaptation.getRect();
	
	}
	
	function doLayout(rect:Rect){
		for(var i:int = 0; i<tables_.Length; ++i){
			tables_[i].doLayout(new Rect(rect.x, rect.y, rect.width, rect.height));
		}
	}

}