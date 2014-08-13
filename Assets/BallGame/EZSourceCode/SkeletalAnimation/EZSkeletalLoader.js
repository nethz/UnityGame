#pragma strict

class EZSkeletalLoader extends MonoBehaviour{
	public var _skeletal:EZSkeletal;
	public var _attack:EZSkeletalAttack;
	public var _flame:EZFlameManager;
	public function Start(){
		var load:Task = _skeletal.loadTask(this.gameObject.layer);
		TaskManager.PushBack(
		load,
		function(){
			_attack.load();
			_flame.refresh(this.gameObject);
			_flame.setMagicType(Geek.MagicType.Metal);
		}
		);
		TaskManager.Run(load);
	}
}