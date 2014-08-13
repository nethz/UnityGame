#pragma strict
class EZPetContainer extends EZViewContainer{
	
	public var _pet:EZPet;
	public var _vFlip:boolean = false;
	public var _layout:EZLayout;
	

	public function get pet():EZPet{
		return this._pet;
	}
	public function set pet(value:EZPet){
		this._pet = value;
	}
	private function destroyPet(){
		if(_pet){
			var obj = _pet.gameObject;
			GameObject.DestroyObject(obj);
			this._pet = null;
		}
	}
	public function loadTask(key:Geek.SoulKey):Task{
		this.destroyPet();
		_pet = EZMonsterFactories.GetInstance().create(key, this.transform, "pet", true, true, true);
		if(_pet == null){
			_pet = EZMonsterFactories.GetInstance().create(new Geek.SoulKey("none", Geek.MagicType.Wood),  this.transform, "pet", true, true, true);
		}
		var task:Task = _pet.layoutingTask(_layout, _vFlip, this.gameObject.layer);
		return task;
		
	}
}