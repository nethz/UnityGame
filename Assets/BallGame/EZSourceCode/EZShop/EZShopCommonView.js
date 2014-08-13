#pragma strict

public class EZShopCommonView extends GameBaseView{
	public var _diamond:UILabel;
	public var _money:UILabel;
	public var _bag:UILabel;
	public var _apCtrl:EZApCtrl;
	//public var _apNumber:UILabel;
	//public var _ap:UISlider;
	
	public function setup(player:JsonData.Player){
		_apCtrl.refresh();
	}
	

	
	public function setup(player:JsonData.Player, bag:JsonData.Bag){
		this.diamond = player.diamond.ToString();
		this.money = bag.money.ToString();
		var bnum:int = 0;
		if(bag.list){
			bnum = bag.list.Length;
		
		}
		this.bag = bnum.ToString() + "/" +bag.max.ToString();
		setup(player);
	
	}
	public function Awake(){
		//close();
	}
	
	public function set diamond(value:String){
		_diamond.text = value;
	}
	
	public function set money(value:String){
		_money.text = value;
	}
	
	public function set bag(value:String){
		_bag.text = value;
	}
	/*public function set apNumber(value:String){
		_apNumber.text = value;
	}
	public function set ap(value:float){
		_ap.sliderValue = value;
	}*/
}
