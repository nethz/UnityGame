#pragma strict
public var layout:EZTableLayout;
function Start () { 

	var pet:EZPet = EZMonsterFactories.GetInstance().create(new Geek.SoulKey("wood1", Geek.MagicType.Wood), this.transform, "bee", true, true, false);
			var task = pet.layoutingTask(layout, false, this.gameObject.layer);
			TaskManager.PushBack(task,function(){
				pet.show();
				var body:EZSkeletal = pet.body;
				
					
				var data0:EZBindData = EZBindTable.GetInstance().create("sleep", Geek.MagicType.None);
				var data1:EZBindData = EZBindTable.GetInstance().create("blood", Geek.MagicType.None);
				
				
				var wait:EZWaitTask = new EZWaitTask();
				wait.setAllTime(1);
				TaskManager.PushBack(wait, function(){
					pet.post("weakup");
					if(data0){
						pet.hud.bind.execute(data0, EZBindData.Action.Create);
					}
					if(data1){
						pet.hud.bind.execute(data1, EZBindData.Action.Create);
					}
				}); 
				var tl:TaskList = new TaskList(); 
				tl.push(wait);
				  
				var wait2:EZWaitTask = new EZWaitTask();
				 
				wait2.setAllTime(1); 
				tl.push(wait2); 
				
				TaskManager.PushBack(wait2, function(){
					pet.hud.bind.flickerMagic(Geek.MagicType.Water);
				}); 
				tl.push(pet.attackTask());  
				
				var wait3:EZWaitTask = new EZWaitTask();
				wait3.setAllTime(1); 
				
				TaskManager.PushBack(wait3, function(){
					
					pet.hud.bind.flickerBind(EZBindData.BindType.MedicalDot);
				}); 
				tl.push(wait3); 
				TaskManager.Run(tl);
			
			});
			TaskManager.Run(task);
		
//
	//Debug.LogWarning(obj.x);
}

function Update () {

}