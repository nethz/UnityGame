#pragma strict


class EZBuffHandler extends MonoBehaviour{
	private var soul_:EZSoul;
	private var buffs_:EZBuff[] = null;
	
	public function get buffs():EZBuff[]{
		return buffs_;
	}
	public function Awake(){
		soul_ = this.gameObject.GetComponent("EZSoul") as EZSoul;
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
	public function doShift():Array{
		 if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		buffs_[i].doShift();
		     	}
		     }
	     }
	     return  Array();
	}
	public function doSwap():Array{
		 if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		buffs_[i].doSwap();
		     		
		     	}
		     }
	     }
	     return Array();
	}
	
	
	
	
	public function refresh(){
		buffs_ = System.Array.ConvertAll(
			this.gameObject.GetComponentsInChildren(EZBuff), 
			function (component){component as EZBuff;}
			);

	}
	public function flickerIt():Array{
		var buffs:Array = new Array();
		 if(buffs_){
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].flicker && buffs_[i].enabled){
					buffs.push(buffs_[i]);
					buffs_[i].flicker = false;
				}
			}
	     }
		 return buffs; 
	}

	public function hurting(hurt:float):float{
		
		 var c:float = 0;
		 var ret = hurt;
		 if(buffs_){
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					c += buffs_[i].hurting(hurt);
				}
			}
				
			ret = hurt+c;
	     }
	     
		 return ret; 
		 
		 
	}

	public function ignore():boolean{
		if(buffs_){		
		     for(var i:int = 0; i<buffs_.length; ++i){ 
	
		     	if(buffs_[i].enabled){
		     		if(buffs_[i].ignore()){
		     			return true;
		     		}
		     	}
		     }
	     }
	     return false;
	}
	
	
	public function injury():float{
	
		
		 
		var injury:float = 1;
		if(buffs_){		
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		injury *= buffs_[i].injury();
		     	}
		     }
	     }
	     return injury;
	}
	
	
	
	public function deposit():boolean{
		if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		if(buffs_[i].deposit()){
		     			return true;
		     		}
		     	}
		     }
	     }
	     return false;
	}
	public function getTech(tech:Function):EZTechnique{
		if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		var ret:EZTechnique = buffs_[i].getTech(tech);
		     		if(ret){
		     			return ret;
		     		}
		     	}
		     }
	     }
	     return null;
	}
	/*
	public function hurtedIt():Array{
		 
		var buffs:Array = new Array();
		 if(buffs_){
			
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					if(buffs_[i].hurted != 0){
						buffs.push(buffs_[i]);
					}
				}
			}
	     }
		 return buffs; 
	}
	*/
	public function hurted(hurt:float):float{
		 var c:float = 0;
		 var ret = hurt;
		 if(buffs_){
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					c += buffs_[i].hurted;
				}
			}
				
			ret = hurt*(1+c);
	     }
	     
		 return ret; 
	}
	/*public function shieldingIt():Array{
		 
		var buffs:Array = new Array();
		 if(buffs_){
			
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					var ret = buffs_[i].shielding(100.0f);
					if(ret != 100.0f){
						buffs.push(buffs_[i]);
					}
				}
			}
	     }
		 return buffs; 
	}
	*/
		
	
	public function shielding(hurt:float):float{
		 var ret = hurt;
		 if(buffs_){
			
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					ret = buffs_[i].shielding(ret);
				}
			}
	     }
		 return ret; 
	}
	
			
	public function shielded(hurt:float){
		 var ret = hurt;
		 if(buffs_){
			
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					ret = buffs_[i].shielded(ret);
				}
			}
	     }
	     
		 return ret; 
	}
	
	
	
	public function get shieldValue():float{
		 var ret:float = 0;;
		 if(buffs_){
			for(var i:int = 0; i<buffs_.length; ++i){ 
				if(buffs_[i].enabled){
					ret = ret + buffs_[i].shieldValue;
				}
			}
	     }
	     
		 return ret; 
	}
	
	/*
	public function bloodIt():Array{
		var buffs:Array = new Array();
		 if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		if(buffs_[i].blood != 0){
		     			buffs.push(buffs_[i]);
		     		}
		     	}
		     }
	     }
	     
		 return buffs; 
	}*/
	public function blood():float{
		 var blood:float = 0;
		 if(buffs_){
		     for(var i:int = 0; i<buffs_.length; ++i){ 
		     	if(buffs_[i].enabled){
		     		blood += buffs_[i].blood;
		     	}
		     }
	     }
	     
		 return blood; 
	}
	
	public function reset(){
		for(var i=0; i<buffs_.length; ++i){
			if(buffs_[i].enabled){
				buffs_[i].enabled = false;
			}
		}
	}
	
	
	
}