#pragma strict

class EZAffixDetails extends MonoBehaviour{
	public var _widgets:UIWidget[] = null;
	public var _boxs:BoxCollider[] = null;
	public var _dragPanel:UIDraggablePanel = null;
	public var _attackBall:EZUIInfoMagicType2 = null;
	//public var _medicalBall:EZUIInfoMagicType = null;
	public var _hpGrowth:UILabel = null;
	public var _attackGrowth:UILabel = null;
	public var _speedGrowth:UILabel = null;
	
	public var _baseAttack:UILabel = null;
	public var _didAffix:UILabel = null;
	public var _doAffix:UILabel = null;
	public var _table:UITable = null;
	public var _affixTable:UITable = null;
	
	private var data_:EZCard = null;
	private var isOpen_:boolean = false;
	private var card_:EZCard = null; 
	private var cardAffix:EZCardAffix = null; 
	
	public function Awake(){
		this.close();
	}
	
	public function rePosition(){
		_dragPanel.ResetPosition();
	}
	
	public function setup(card:EZCard){
		card_ = card;
		var soul:JsonData.Soul = card_.soul;
		_attackBall.setup(Geek.GetMagicType(soul.natureProp.type));
		_hpGrowth.text = ((card.maxHealth - 400)/(card.lv + 1)).ToString("0.00");
		_attackGrowth.text = ((card.attack - 40)/(card.lv + 1)).ToString("0.00");
		_speedGrowth.text = ((card.speed - 40)/(card.lv + 1)).ToString("0.00");
		cardAffix = new EZCardAffix(card_); 
		_baseAttack.text = "";
		_baseAttack.text = cardAffix.getBaseAttack();
		_didAffix.text = "";
		_didAffix.text = cardAffix.getSkillAllInfo();
		_doAffix.text = "";
		_doAffix.text = cardAffix.getMagicAllInfo();
		
		_affixTable.repositionNow = true;
		_table.repositionNow = true;
	}
	
	public function open(){
		isOpen_ = true;
		refresh();
	}
	
	public function close(){
		isOpen_ = false;
		refresh();
	}
	
	public function refresh(){
		_affixTable.repositionNow = true;
		_table.Reposition();
		setEnabled(isOpen_);
	}
	
	private function setEnabled(enable:boolean){
		for(var i:int = 0;i<_widgets.length;++i){
			_widgets[i].enabled = enable;
		}
		for(var j:int = 0;j<_boxs.length;++j){
			_boxs[j].enabled = enable;
		}
	}
	
}