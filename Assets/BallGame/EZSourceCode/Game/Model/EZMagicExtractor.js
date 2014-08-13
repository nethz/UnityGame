#pragma strict
/*
class EZMagicExtractor extends MonoBehaviour {
	
	private var container_:EZModelBag = null;
	
	function Awake(){
		ActionManager.registerFunction("model.release.magic", this.releaseMagic);
	}
	function OnDestroy(){
		
		ActionManager.unregisterFunction("model.release.magic");
	}
	public function releaseMagic(){
		this.container = null;
	}
	public function get container(): EZContainer{
		return this.container_;
	}
	public function get soul():EZSoul{ 
		if(this.container_)
			return this.container_.soul; 
		return null;
	}
	public function set container(value:EZContainer){
		this.container_ = value;
		
	}

};
*/