#pragma strict
class EZBallViewInterface extends MonoBehaviour{
	function refresh(data:EZBallViewData){
	}
	function nextTask(data:EZBallViewData):Task{
		return null;
		
	}
	function removeTask(data:EZBallViewData):Task{
		return null;
	
	}
	
	public function update(data:EZBallViewData, time:float){
	} 
}
