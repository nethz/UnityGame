#pragma strict

class FailGiveupView extends EZGameFailBaseView{
	public var _table:GeekTable = null;
	public var _money:UILabel = null;
	public var _ghost:GameObject = null;
	
	
	private var ghosts_:MinGhostView[] = null;
	public function Start(){
		this.close();
	}
	public function setMoney(num:int){
		_money.text = num+"";
	}
		

	public function create(num:int){
		destoryGhosts(); 
		ghosts_ = new MinGhostView[num];
		for(var i:int = 0; i < num; ++i){
			ghosts_[i] = createGhost();
			ghosts_[i].gameObject.name = "Ghost"+i;
		}
		_table.repositionNow = true;
	}
	
	
	private function createGhost():MinGhostView{
		if(_ghost){
			var obj:GameObject = GameObject.Instantiate(_ghost);
			var ghost:MinGhostView = obj.GetComponent(MinGhostView) as MinGhostView;
			obj.transform.parent = _table.transform;
			obj.transform.localScale = obj.transform.localScale;
			obj.SetActive(true);
			return ghost;
		}
		
	}
	public function destoryGhosts(){
		if(ghosts_){
			for(var i:int = 0; i< ghosts_.length; ++i){ 
				GameObject.DestroyObject(ghosts_[i].gameObject);
			} 
		}
		ghosts_ = null;
	}
	
	
	
}