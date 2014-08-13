#pragma strict
class EZDotManager extends MonoBehaviour{
	private var dots_:EZDot[] = null;
	
	private static var instance_:EZDotManager = null;
	
	public function Awake(){ 
		this.instance_ = this;
	}
	public function doClose():Array{
		var dots:Array = new Array();
		if(dots_){
			for(var i=0; i<dots_.length; ++i){
				if(dots_[i].enabled){
					dots_[i].doClose();
					if(!dots_[i].enabled){
						dots.push(dots_[i]);
					}
				}
			}
		}
		return dots;
	}
	
	public function refresh():EZDot[]{
		dots_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(EZDot), 
				function (component){component as EZDot;}
				);
		System.Array.Sort(this.dots_, 
   	 		function(a:EZDot, b:EZDot):int{	
   	 			if( a.number < b.number) return -1;
   	 			return 0;
   	 		}
 		);
 		return dots_;
	}

	public static function GetInstance():EZDotManager{
		return this.instance_;
	}
	public function OnDestroy(){
		this.instance_ = null;
	}
	


};