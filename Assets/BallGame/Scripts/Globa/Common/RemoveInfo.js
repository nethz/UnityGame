#pragma strict
class RemoveInfo{

	private var ballCount_:int[] = new int[Geek.MagicType.Length];

	public function summary(){
		return "Fire "+getCount(Geek.MagicType.Fire)+", Snow "+getCount(Geek.MagicType.Water)+", Sky "+getCount(Geek.MagicType.Crystal)+", Dark "+getCount(Geek.MagicType.Earth)+", Sun "+getCount(Geek.MagicType.Metal)+", Grass "+getCount(Geek.MagicType.Wood)+", All "+count();
	}
	public function getCount(type:int){
		return ballCount_[type];
	
	}	
	
	public function count(){
		var all:int = 0;
		for(var i:int=0; i<Geek.MagicType.Length; ++i ){
			all+=getCount(i);
		}
		return all;
	
	}
	public function addRemove(type:Geek.MagicType){
	
		ballCount_[type] += 1;
		//var task = TaskManager.instance().factories.createTask("ui.add.power") as AddPowerTask;
		
		//task.setType(type);
		//task.setPower(1);
		//TaskManager.Run(task);
		
	}
	public function clear(){
		this.ballCount_ = new int[Geek.MagicType.Length];
	
	}
	
	public function print(){
	
	}
}