#pragma strict

class EZMonsterFactoriesTest extends MonoBehaviour{
	public var _pet:EZPet;
	public var _layout:EZTableLayout;
	public function Start(){
		var tl:TaskList = new TaskList();
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(0.1);
		TaskManager.PushBack(wait, function(){
			_pet = EZMonsterFactories.GetInstance().create(new Geek.SoulKey("goblin", Geek.MagicType.Wood), this.transform, "pet", true, true, true);
			var task:Task = _pet.layoutingTask(_layout, false, this.gameObject.layer);
			TaskManager.PushBack(task,  function(){
				_pet.show();
				EZPetTexture.GetInstance().setTexture(_pet.specially.texture);
			});
			TaskManager.Run(task);
		});
		tl.push(wait);
		TaskManager.Run(tl);
	}
}