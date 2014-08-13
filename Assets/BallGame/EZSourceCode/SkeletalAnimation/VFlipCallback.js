#pragma strict
class VFlipCallback extends MonoBehaviour{

	public function enableFlip(flip:boolean){
		if(flip){
			this.transform.localRotation = Quaternion.AngleAxis(180, Vector3.down);
		}
		Debug.Log("------------------");
		Debug.Log(flip);
		
		
	}
}
