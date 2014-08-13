#pragma strict

class EZCardSellView extends EZCardViewBase{
	public var _topTitle:UISprite = null;
	public var _button:EZLockButton;
	public var _panel:UIPanel;
	public var _sell:UILabel;
	public var _money:UILabel;
	public var _execute:UIImageButton;
	public var _cards:EZCardWareView[];
	private var money_:int = 0;
	private var sell_:int = 0;
	
	public function show(){
		_topTitle.spriteName = "saleTop";
		setEnabled(true);
	}
	public function hide(){
		setEnabled(false);
	}
	public function refresh(){
		_sell.text = this.sell_+ "";
		_money.text = this.money_  + "";
		var empty:boolean = true;
		for(var i:int =0; i<_cards.length; ++i){
			if(_cards[i].data != null){
				empty = false;
			}
		}
		if(empty){
			_execute.isEnabled = false;
		}else{
			
			_execute.isEnabled = true;
		}
	}
	public function setMoney(money:int){
		this.money_ = money;
	}
	public function setSell(sell:int){
		this.sell_ = sell;
	}
	
	public function get button():EZLockButton{
		return _button;
	}
	
	public function setCards(datas:EZCard[]){
		for(var i:int = 0; i< _cards.length; ++i){
			if(i < datas.length){
				_cards[i].load(datas[i]);
			}else{
				_cards[i].load(null);
			}
		}
	}
	/*
	public function openWindow(){
		_window.open();
	}
	
	public function closeWindow(){
		_window.close();
	}
	*/
	
}