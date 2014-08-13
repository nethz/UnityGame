#pragma strict

class GameBridge extends MonoBehaviour{
	private var global_:GameObject = null; 
	private var common_:GameObject = null; 
	public function get global():GameObject{
		if(this.global_ == null){
			global_ =  GameObject.FindGameObjectWithTag("Global");
		} 
		return global_;
	}  
	
	public function get common():GameObject{
		if(this.common_ == null){
			common_ =  GameObject.FindGameObjectWithTag("Common");
		} 
		return common_;
	} 
	
	
}