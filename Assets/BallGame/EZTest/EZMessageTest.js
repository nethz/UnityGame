#pragma strict

class EZMessageTest extends MonoBehaviour{
	function Start(){
		var task:Task = EZMessageBagTable.GetInstance().reload();
		TaskManager.Run(task);
		
	/*
		var task:Task = EZMessageTable.GetInstance().reload();
		TaskManager.Run(task);
		var act:EZSetStringAction = ActionManager.Create("global.ui.news") as EZSetStringAction;
		act.setValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		ActionManager.Run(act);
		act.setValue("bbbbb");
		ActionManager.Run(act);
		act.setValue("你好我好大家好，怎么样？？");
		ActionManager.Run(act);*/
		
	}

}