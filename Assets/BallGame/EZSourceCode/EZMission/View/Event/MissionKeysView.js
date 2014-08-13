#pragma strict

class MissionKeysView extends MonoBehaviour{
	public var _bg:UISprite = null;
	public var _gold:UILabel = null;
	public var _ag:UILabel = null;
	public var _cu:UILabel = null;
	public var _goldMax:UILabel = null;
	public var _agMax:UILabel = null;
	public var _cuMax:UILabel = null;
	private var isOpen_:boolean = false;
	private var gold_:int =0;
	private var silver_:int =0;
	private var cuprum_:int =0;
	private var goldMax_:int =0;
	private var silverMax_:int =0;
	private var cuprumMax_:int =0;
	  
	public function Awake(){
		this.close();
	}
	public function setup(setup:EZMissionEvtMenuSetup){
		gold_ = setup.gold;
		silver_ = setup.silver;
		cuprum_ = setup.cuprum;
		goldMax_ = setup.goldMax;
		silverMax_ = setup.silverMax;
		cuprumMax_ = setup.cuprumMax;
		
		
		refresh();
	}
	public function setup(gold:int, silver:int, cuprum:int){
		Debug.LogWarning("gold" + gold);
		gold_ = gold;
		silver_ = silver;
		cuprum_ = cuprum;
		refresh();
	}
	public function refresh(){
		if(isOpen_){
			_gold.text = gold_.ToString();
			_ag.text = silver_.ToString();
			_cu.text = cuprum_.ToString();
			
			
			_goldMax.text = "/"+goldMax_.ToString();
			_agMax.text = "/"+silverMax_.ToString();
			_cuMax.text = "/"+cuprumMax_.ToString();
			
			
			_bg.enabled = true;
			_goldMax.enabled = true;
			_agMax.enabled = true;
			_cuMax.enabled = true;
			_gold.enabled = true;
			_ag.enabled = true;
			_cu.enabled = true;
		}else{
			_bg.enabled = false;
			_goldMax.enabled = false;
			_agMax.enabled = false;
			_cuMax.enabled = false;
			_gold.enabled = false;
			_ag.enabled = false;
			_cu.enabled = false;
		}
	}
	public function open(){
		this.isOpen_ = true;
		refresh();
	}
	
	public function close(){
		this.isOpen_ = false;
		refresh();
	}
	
	public function set gold(value:int){
		_gold.text = value.ToString();
	}
	
	public function set ag(value:int){
		_ag.text = value.ToString();
	}
	
	public function set cu(value:int){
		_cu.text = value.ToString();
	}
}