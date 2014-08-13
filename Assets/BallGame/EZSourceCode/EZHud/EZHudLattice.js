#pragma strict


class EZHudLattice extends MonoBehaviour{
	public enum Type{
		Horizontal,
		Vertical,
	}
	public var _begin:GameObject;
	public var _end:GameObject;
	private var lattices_:GameObject[];
	private var count_:int = 1;
	public function Start(){
	}
	public function setCount(count:int){
		if(count_ == count)
			return;
		count_ = count;
		if(lattices_){
			for(var i:int =0 ; i<lattices_.length; ++i){
				GameObject.DestroyObject(lattices_[i]);
			}
		}
		var n = count -1;
		if(n > 0){
			var c:float = 1.0f/count;
			lattices_ = new GameObject[n];
			for(var j:int =0; j<n; ++j){
				lattices_[j] = GameObject.Instantiate(_begin);
				lattices_[j].transform.parent = this.gameObject.transform;
				lattices_[j].name = "Lattice" + j;
				lattices_[j].transform.localScale = _begin.transform.localScale;
				
				var r:float = (j+1.0f)*c;
				lattices_[j].transform.localPosition = _begin.transform.localPosition *(1.0f-r) + _end.transform.localPosition *r;
			}
		}
		
	}
	
}