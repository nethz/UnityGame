#pragma strict
class EZFoeContainer extends EZViewContainer{
	
	private var pet_:EZPet[];
	public var _vFlip:boolean = false;
	public var _layout:EZLayout;
	private var _index:int = 0;
	
	public function doTouch(){
	
		if(pet && pet.specially && pet.specially.effect)
			pet.specially.effect.white(-1);
	}
	
	public function doOut(){
		if(pet && pet.specially && pet.specially.effect)
			pet.specially.effect.normal(-1);
	}
	
	
	public function Awake(){
		pet_ = new EZPet[13];
		_index = -1;
	}
	
	public function get pet():EZPet{
		return this.pet_[_index];
	}
	public function set pet(value:EZPet){
		this.pet_[_index] = value;
	}
	private function destroyPet(){;
		
		if(_index >= 0 && _index<pet_.Length && pet_[_index]){
			var obj = pet_[_index].gameObject;
			obj.SetActive(false);
			
		}
		_index++;
	}
	public function load(index:int, key:Geek.SoulKey):Task{
		var task:Task = new Task();
		
		var isOver:boolean = false;
		task.init = function(){
			pet_[index] = EZMonsterFactories.GetInstance().create(key, this.transform, "pet", true, true, true);
			if(pet_[index] == null){
				pet_[index] = EZMonsterFactories.GetInstance().create(new Geek.SoulKey("none", Geek.MagicType.Wood),  this.transform, "pet", true, true, true);
			}
			var task:Task = pet_[index].layoutingTask(_layout, _vFlip, this.gameObject.layer);
			TaskManager.PushBack(task,function(){
				isOver = true;
			});
			TaskManager.Run(task);
		};
		task.isOver = function(){
			return isOver;
		};
		
		return task;
	
	}
	public function preloadeTask(keys:List.<Geek.SoulKey>):Task{
		var mt:MultiTask = new MultiTask();
		pet_ = new EZPet[keys.Count];
		for(var i:int = 0; i< keys.Count; ++i){
			mt.push(this.load(i, keys[i]));
		}
		TaskManager.PushBack(mt, function(){
			for(var j:int = 0; j<pet_.Length; ++j){
				pet_[j].gameObject.SetActive(false);
			}
		});
		
		
		return mt;
	
	}
	public function loadTask(key:Geek.SoulKey):Task{
		this.destroyPet();
		if(pet_[_index]== null){
			pet_[_index] = EZMonsterFactories.GetInstance().create(key, this.transform, "pet", true, true, true);
			if(pet_[_index] == null){
				pet_[_index] = EZMonsterFactories.GetInstance().create(new Geek.SoulKey("none", Geek.MagicType.Wood),  this.transform, "pet", true, true, true);
			}
			var task:Task = pet_[_index].layoutingTask(_layout, _vFlip, this.gameObject.layer);
			return task;
		}else{
			var emtyp:Task = new Task();
			TaskManager.PushBack(emtyp, function(){
				pet_[_index].gameObject.SetActive(true);
			});
			return emtyp;
		
		}
		
		
	}

}