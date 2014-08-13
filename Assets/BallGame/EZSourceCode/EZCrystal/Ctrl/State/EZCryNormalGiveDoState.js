#pragma strict

class EZCryNormalGiveDoState extends StateWithEventMap{
	private var normal_:EZCryNormalCtrl;
	private var isOver_:boolean = false;
	function EZCryNormalGiveDoState(normal:EZCryNormalCtrl){
		normal_ = normal;
	
	}
	public function start(){
		
		
		isOver_ = false;
		
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addText(EZDictionary.LookUp("!no_money"));
		TaskManager.PushBack(task, function(){
			isOver_ = true;
		});
		TaskManager.Run(task);
	
	
	}
	public function over(){
		/*var i0:int = normal_.getFragGive(0);
		var i1:int = normal_.getFragGive(1);
		var i2:int = normal_.getFragGive(2);
		var i3:int = normal_.getFragGive(3);
		var i4:int = normal_.getFragGive(4);
		var h0:int = normal_.getFragHas(0);
		var h1:int = normal_.getFragHas(1);
		var h2:int = normal_.getFragHas(2);
		var h3:int = normal_.getFragHas(3);
		var h4:int = normal_.getFragHas(4);
		Debug.Log(i0);
		Debug.Log(i1);
		Debug.Log(i2);
		Debug.Log(i3);
		Debug.Log(i4);*/
		//normal_.setFrag(0, h0 -i0, 10);
	//	normal_.setFrag(1, h1 -i1, 10);
		//normal_.setFrag(2, h2 -i2, 10);
		//normal_.setFrag(3, h3 -i3, 10);
		//normal_.setFrag(4, h4 -i4, 10);
	
	}
	public function update(d:float):String{
		if(isOver_){
			return "normal.select";
		}
		return "";
	}
}