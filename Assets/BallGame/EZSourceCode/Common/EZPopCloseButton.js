#pragma strict

class EZPopCloseButton extends MonoBehaviour{
	public function OnClick(){
		TaskManager.Run(EZPopInstance.GetInstance().hideTask());
	
	}
}
