#pragma strict

class EZLeadCtrl extends MonoBehaviour{
	public var _camera:Camera = null;
	public var _battle:EZViewContainer = null;
	public var _bag1:EZViewContainer = null;
	public var _foeBattle:EZViewContainer = null;
	public var _touchBattle:BoxCollider = null;
	public var _touchFoeBattle:BoxCollider = null;
	public var _touchBag1:BoxCollider = null;
	public var _touchBack:BoxCollider = null;
	public var _close:EZLeadRpg = null;	
	public var _downDialog:EZGameDialogView = null;
	public var _swapText:String = null;
	public var _swapPop:String = null;
	public var _swapPop2:String = null;
	public var _infoText:String = null;
	public var _infoShort:String = null;
	
	public var _infoPop:String = null;
	public var _infoPop2:String = null;
	public var _no:EZSound = null;
	
	public var _magicText:String = null;
	public var _magicPop:String = null;
	
	public var _overText:String = null;
	
	
	public var _lead:EZLead = null;
	public var _leadRpg:EZLeadRpg = null;
	
	
	public var _showTime:float = 0.3f;
	public var _hideTime:float = 0.3f;
		
	private var show_:boolean = false;
	public function show(alpha:float):Task{
	
		if(!show_){
			var mt:MultiTask = new MultiTask();
			
		
			mt.push(this._close.show(_showTime, alpha));
			mt.push(this._leadRpg.show(_showTime, alpha));
			TaskManager.PushBack(mt, function(){
				show_ = true;
			});
			return mt;
		}
		return new Task();
	
	}
	public function hide():Task{
		if(show_){
			var mt:MultiTask = new MultiTask();
			//if(!leadPuzzle()){
				
			//}
			mt.push(this._close.hide(_hideTime));
			mt.push(this._leadRpg.hide(_hideTime));
			TaskManager.PushBack(mt, function(){
				show_ = false;
			});
			return mt;
		}
		return new Task();
		
	}
	
	
}