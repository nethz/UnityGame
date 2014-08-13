#pragma strict
import System.Collections.Generic;
class EZBallCtrlGuide extends EZBallCtrl{

	public var _balls:EZBallsManagerImpl = null;
	public var _text:EZBallCtrlGuideText; 
	public var _dialogueCtrl:EZPuzzleDialogueCtrl;
	private var fsm_:FSM = null;
	private var magicTypes_:List.<Geek.MagicType> = new List.<Geek.MagicType>();
	
	public function Awake(){
		super.Awake();
		fsm_ = new FSM();
		fsm_.addState("ready", new EZBCGReadyState(_dialogueCtrl), "");
		fsm_.addState("first", new EZBCGStartState(_dialogueCtrl), "");
		fsm_.addState("second", new EZBCGSecondState(_dialogueCtrl, _balls), "");
		fsm_.addState("diamond", new EZBCGDiamondState(_dialogueCtrl, _balls), "");
		fsm_.addState("over", new EZBCGOverState(_dialogueCtrl, _balls), "");
		fsm_.init("ready");
	}
	/*public function OnClick(){
		if(_text.next == false){
			_text.next = true;
			fsm_.post("over");
		}
		if(_dialogueCtrl.ready){
			if(_dialogueCtrl.typer.textsOver){
				fsm_.post("over");
			}else{
				Debug.Log("<--------readyNext--------->");
				fsm_.post("readyNext");
			}
		}
	}*/
	
	public function OnBallAction(act:String){
		this.fsm_.post(act);
	}
	
	public function curtainTask():Task{
		var tl:TaskList = new TaskList();
		var task:Task = _balls.nextState(magicTypes_);
		TaskManager.PushBack(task, function(){
			fsm_.post("next");
			var ballState:EZBallViewData.State[] = _balls.ballState;
			magicTypes_.Clear();
		});
		tl.push(task);
		var next:Task = new Task();
		next.isOver	= function():boolean{
			return _text.next;
		};
		tl.push(next);
		return tl;
	}
	public function disableInput(){
		//ActionManager.Run("view.input.disable");
	}
	public function addPower(position:Vector3, ballType:Geek.MagicType, count:int){
		for(var i:int = 0; i<magicTypes_.Count; ++i){
			if(magicTypes_[i] == ballType){
				return;
			}
		}
		magicTypes_.Add(ballType);
	}
	public function groupOver(){
	
	}
}
