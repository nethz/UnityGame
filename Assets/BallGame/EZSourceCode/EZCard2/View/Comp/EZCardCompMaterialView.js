#pragma strict
class EZCardCompMaterialView extends MonoBehaviour{
	public var _cards:EZCardMaterialView[];
	public var _money:UILabel;
	public var _need:UILabel;
	private var money_:int = 0;
	private var materialMoney_:int = 0;
	public function setCards(datas:EZCard[]){
		
		for(var i:int=0; i<_cards.length; ++i){
			this._cards[i].load(datas[i]);
		}
	}
	public function setMoney(money:int){
		money_ = money;
	}
	public function enough():boolean{
		return (money_ >= this.materialMoney_);
	
	} 
	public function refresh(){
		_money.text = "" + money_;
		_need.text = "" + this.materialMoney_;
	}
	public function get exp():float{
		var exp:float = 0;
		for(var i:int=0; i<_cards.length; ++i){
			if(this._cards[i].data != null){
				exp += this._cards[i].data.soul.baseProp.exp;
			}
		}
		return exp*0.7f;
	}
	public function setMaterialMoney(materialMoney:int){
		materialMoney_ = materialMoney;
	}
	/*public function get materialMoney():float{
		var exp:float = 0;
		for(var i:int=0; i<_cards.length; ++i){
			if(this._cards[i].data != null){
				exp += this._cards[i].data.soul.baseProp.exp;
			}
		}
		
		
		var web:WebSetupData = GameSetup.getInstance().web;
		return Mathf.Floor(exp*web.soul.money);
	}*/
	public function empty():boolean{
		for(var i:int=0; i<_cards.length; ++i){
			if(this._cards[i].data != null){
				return false;
			}
		}
		return true;
	}
	

	public function setNeedColor(c:Color){
		_need.color = c;
	}
	
}

