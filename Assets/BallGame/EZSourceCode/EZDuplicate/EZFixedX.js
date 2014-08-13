#pragma strict
class EZFixedX  extends MonoBehaviour{
	public var _x:float = 0;
	public function Update(){
		if(this.transform.localPosition.x != _x){
			this.transform.localPosition.x = _x;
		}
	}
}