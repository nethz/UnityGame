#pragma strict

class EZRestState extends State{
	private var isOver_:boolean;
	
	
	private var map_:EZGameMapView = null;
	public function EZRestState(map:EZGameMapView){
		map_ = map;
	}
	public function start(){
		isOver_ = false;
		EZCtrl.ViewCrystal(false);
		var mt:MultiTask = new MultiTask();
		var outc:Task = TaskManager.Create("rpg.camera.out") as Task;
		mt.push(outc);
		
		if(EZCrystalInGame.GetInstance()){
			mt.push(EZCrystalInGame.GetInstance().hideTask());
		}
		mt.push(map_.showMapTask());
		
		TaskManager.PushBack(mt, function(){isOver_ = true;});
		
		TaskManager.Run(mt);
		
	}
	public function update(d:float){
	
		if(isOver_){
			return "next";
		}
		return "";
	
	}
	public function over(){
		
	}

}