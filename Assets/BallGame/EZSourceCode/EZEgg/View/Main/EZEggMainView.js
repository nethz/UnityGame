#pragma strict

class EZEggMainView extends MonoBehaviour{
	public var _diamond:UILabel = null;
	public var _diamondBackground:UISprite = null;
	public var _moneyBackground:UISprite = null;
	public var _topBarCover:UISprite = null;
	public var _topBg:UISprite = null;
	public var _topBack:UISprite = null;
	public var _topSlider:UISprite = null;
	public var _topLabel:UILabel = null;
	public var _dmbBg:UISprite = null;
	public var _money:UILabel;
	public var _bag:UILabel;
	
	public var _backBox:BoxCollider;
	public var _moneyBox:BoxCollider;
	public var _diamondBox:BoxCollider;
	
	
	public var _btnMoney:UIButton = null;
	public var _btnDiamond:UIButton = null;
	private var isOpen_:boolean = false;
	private var closeMoney_:boolean = false;
	public function Awake(){
		isOpen_ = false;
		refresh();
	}
	
	public function setup(player:JsonData.Player, bag:JsonData.Bag, setup:JsonData.Setup){
		this.diamond = player.diamond.ToString();
		this.money = bag.money.ToString();
		
		if(bag.money < setup.game.draw_money){
			closeMoney_ = true;
		}else{
		
			closeMoney_ = false;
		}
		
		
		
		var bnum:int = 0;
		if(bag.list){
			bnum = bag.list.Length;
		}
		this.bag = bnum.ToString() + "/" +bag.max.ToString();
	}
	
	public function open(){
		isOpen_ = true;
		this.refresh();
	}
	
	public function close(){
		isOpen_ = false;
		this.refresh();
	}
	
	
	private function refresh(){
		if(isOpen_){
			_diamond.enabled = true;
			_diamondBackground.enabled = true;
			_moneyBackground.enabled = true;
			_topBarCover.enabled = true;
			_topBg.enabled = true;
			_topBack.enabled = true;
			_topSlider.enabled = true;
			_topLabel.enabled = true;
			_dmbBg.enabled = true;
			_money.enabled = true;
			_bag.enabled = true; 
			
			_backBox.enabled = true;
			_moneyBox.enabled = true;
			_diamondBox.enabled = true; 
				
				if(closeMoney_) {
					_moneyBox.enabled = false; 
					_btnMoney.UpdateColor(false, true);
				}else{
					_moneyBox.enabled = true; 
					_btnMoney.UpdateColor(true, true);
				}
				_btnDiamond.UpdateColor(true, true);

		
			
		}else{
		
		
			_diamond.enabled = false;
			_diamondBackground.enabled = false;
			_moneyBackground.enabled = false;
			_topBarCover.enabled = false;
			_topBg.enabled = false;
			_topBack.enabled = false;
			_topSlider.enabled = false;
			_topLabel.enabled = false;
			_dmbBg.enabled = false;
			_money.enabled = false;
			_bag.enabled = false;  
			
			_backBox.enabled = false;
			_moneyBox.enabled = false;
			_diamondBox.enabled = false;
		}
		
		
		
	}
	
	private function set diamond(value:String){
		_diamond.text = value;
	}
	
	private function set money(value:String){
		Debug.Log(value);
		_money.text = value;
	}
	
	private function set bag(value:String){
		_bag.text = value;
	}

}