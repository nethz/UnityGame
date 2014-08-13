#pragma strict
class EZBuffManager extends MonoBehaviour{
	private var buffs_:EZBuff[] = null;
	private static var instance_:EZBuffManager = null;
	
	public function Awake(){ 
		this.instance_ = this;
	}
	
	
	public function doClose():Array{
		var buffs:Array = new Array();
		if(buffs_){
			for(var i=0; i<buffs_.length; ++i){
				if(buffs_[i].enabled){
					buffs_[i].doClose();
					if(!buffs_[i].enabled){
						buffs.push(buffs_[i]);
					}
				}
			}
		}
		return buffs;
	}
	
	
	public function refresh():EZBuff[]{
		buffs_ = System.Array.ConvertAll(
				this.gameObject.GetComponentsInChildren(EZBuff), 
				function (component){component as EZBuff;}
				);
		
 		return buffs_;
	}

	public function doRound():Array{
		var array:Array = new Array();
		for(var i:int =0; i<buffs_.Length; ++i){
			if(buffs_[i].enabled){
				if(buffs_[i].doRound()){
					array.push(buffs_[i]);
				}
			}
		}
		return array;
	}
	
	
	public function doActioned():Array{
		for(var i:int =0; i<buffs_.Length; ++i){
			if(buffs_[i].enabled){
				buffs_[i].doActioned();
			}
		}
		
		return Array();
	}
	

	public static function GetInstance():EZBuffManager{
		return this.instance_;
	}
	public function OnDestroy(){
		this.instance_ = null;
	}
	


};