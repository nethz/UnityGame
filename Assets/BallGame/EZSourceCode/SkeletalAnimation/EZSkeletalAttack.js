#pragma strict

class EZSkeletalAttack extends MonoBehaviour{
	class Attacked{
		public var name:String;
		public var prototype:GameObject;
		public var offset:Vector3 = Vector3.zero;
		public var scale:Vector3 = Vector3.one;
	}
	public var _list:Attacked[];
	public var _skeletal:EZSkeletal;
	public function load(){
		for(var i:int = 0; i < _list.Length; ++i){
			var attacked:Attacked = _list[i];
			var obj:GameObject = GameObject.Instantiate(attacked.prototype); 
			obj.SetActive(true);
			var parent:GameObject = _skeletal.getJoint(attacked.name);
			if(parent){
				obj.transform.parent = parent.transform;
			}else{
				obj.transform.parent = this.transform;
			}
			obj.name = attacked.name + "_attacked";
			obj.transform.localPosition = attacked.offset;
			obj.transform.localScale = attacked.scale;
			
		}
	
	}
}