#pragma strict

class EZAward extends MonoBehaviour{


	public var _money:EZAwardMoneyItem;
	public var _diamond:EZAwardDiamondItem;
	public var _crystal:EZAwardCryItem;
	public var _ball:EZAwardBallItem;
	public var _magic:EZAwardMagicItem;
	public var _gKey:EZAwardGoodItem;
	public var _aKey:EZAwardGoodItem;
	public var _cKey:EZAwardGoodItem;
	public var _invitation:EZAwardGoodItem;
	public var _exp:EZAwardExpItem;
	public var _grid:UIGrid;
	public var _hidden:GameObject = null;
	private var award_:JsonData.Award;
	private var _isLoaded:boolean = false;
	function setup(award:JsonData.Award):int{
		award_ = award;
		if(award_ == null){
			award_ = new JsonData.Award();
		}
		var count = refresh();
		return count;
	} 
	public function open(){ 
		_money.open();
		_diamond.open();
		_crystal.open();
		_ball.open();
		_magic.open(); 
		_gKey.open();
		_aKey.open();
		_cKey.open();
		_invitation.open();
		_exp.open();
	} 
	public function close(){
	 
		_money.close();
		_diamond.close();
		_crystal.close();
		_ball.close();
		_magic.close();	
		_gKey.close();
		_aKey.close();
		_cKey.close();
		_invitation.close();
		_exp.close();
	
	}
	function clear(){
		_money.gameObject.transform.parent = _hidden.gameObject.transform;
		_diamond.gameObject.transform.parent = _hidden.gameObject.transform;
		_crystal.gameObject.transform.parent = _hidden.gameObject.transform;
		_ball.gameObject.transform.parent = _hidden.gameObject.transform;
		_magic.gameObject.transform.parent = _hidden.gameObject.transform;
		_gKey.gameObject.transform.parent = _hidden.gameObject.transform;
		_aKey.gameObject.transform.parent = _hidden.gameObject.transform;
		_cKey.gameObject.transform.parent = _hidden.gameObject.transform;
		_invitation.gameObject.transform.parent = _hidden.gameObject.transform;
		_exp.gameObject.transform.parent = _hidden.gameObject.transform;
	}
	function refresh():int{
		var count:int = 0;
		this.clear();
		if(award_ != null){
			if(award_.money != 0){
				Debug.Log("money");
				_money.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_money.setup(award_.money);
			}
			
			
			if(award_.diamond != 0){
				Debug.Log("diamond");
				_diamond.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_diamond.setup(award_.diamond);
			}
			
			var n:int = 0;
			if(award_.self){
				for(var i:int = 0; i<award_.self.Length; ++i){
					n += award_.self[i];
				}
			}
			
			if(award_.other){
				for(var j:int = 0; j<award_.other.Length; ++j){
					n += award_.other[j];
				}
			}
			if(n != 0){
				_crystal.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_crystal.setup(award_.self, award_.other);
			}
			if(award_.ball != -1 ){
				_ball.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_ball.setup(award_.ball);
			}
			
			if(award_.magic != -1 ){
				_magic.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_magic.setup(award_.magic);
			}
		
			if(award_.gold != 0){
				Debug.Log("gold");
				_gKey.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_gKey.setup(award_.gold);
			}
			
			if(award_.silver != 0){
				Debug.Log("silver");
				_aKey.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_aKey.setup(award_.silver);
			}
			
			if(award_.cuprum != 0){
				Debug.Log("cuprum");
				_cKey.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_cKey.setup(award_.cuprum);
			}
			if(award_.invitation != 0){
				Debug.Log("invitation");
				_invitation.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_invitation.setup(award_.invitation);
			}
			
			
			
			if(award_.exp != 0){
				_exp.gameObject.transform.parent = _grid.gameObject.transform;
				count++;
				_exp.setup(award_.exp);
			}
		
			
		}
		
		_grid.Reposition();
		return count;
	}
	

}