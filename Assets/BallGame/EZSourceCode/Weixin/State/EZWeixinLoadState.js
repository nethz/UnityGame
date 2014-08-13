#pragma strict

class EZWeixinLoadState extends State{
	private var isOver_:boolean = false;
	public function start(){
		isOver_ = false;
		var table:EZWeixinTable = EZWeixinTable.GetInstance();
		var load:Task = table.load();
		TaskManager.PushBack(load, function(){
			isOver_ = true;
		});
		TaskManager.Run(load);
	}
	public function update(d:float):String{
		if(isOver_){
			return "check";
		}
		return "";
	}
	
}