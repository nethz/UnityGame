#pragma strict

class EZPetSellModel extends MonoBehaviour{
	private var cards_:EZCard[];//new EZCard[10];
	public function Awake(){
		cards_ = new EZCard[10];
		for(var i:int = 0; i < cards_.length; ++i){
			cards_[i] = null;
		}
	}
	public function addCard(data:EZCard){
		for(var i:int = 0; i < cards_.length; ++i){
			if(cards_[i] == null){
				cards_[i] = data;
				break;
			}
		}
	}
	public function removeCard(data:EZCard){
		var cards:EZCard[] = new EZCard[10];
		var n:int =0;
		for(var i:int =0; i< cards_.length; ++i){
			if(cards_[i] != null && cards_[i] != data){
				cards[n] = cards_[i];
				n++;
			}
		}
		cards_ = cards;
	}	
	
	public function clean(){
		cards_ = new EZCard[10];
	}
	public function get cards():EZCard[]{
		return cards_;
	}
	
	public function get sell():int{
	
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		//web.soul.exp[]
		var ret:float = 0;
		if(setup){
			for(var i:int =0; i< cards_.length; ++i){
				if(cards_[i] != null){
					Debug.Log("exp" + cards_[i].exp);
					Debug.Log("setup.soul.sell_base" + setup.soul.sell_base);
					Debug.Log("cards_[i].quality" + cards_[i].quality);
					Debug.Log("setup.soul.sell_quality[cards_[i].quality]" + setup.soul.sell_quality[cards_[i].quality]);
					ret += (cards_[i].exp/ 50 + setup.soul.sell_base) * setup.soul.sell_quality[cards_[i].quality];
				}
			}
		}
		
		return Mathf.FloorToInt(ret);
	
	}
	
	public function full():boolean{
		for(var i:int =0; i< cards_.length; ++i){
			if(cards_[i] == null){
				return false;
			}
		}
		return true;
	}
	
	public function goodMaterial():boolean{
		for(var i:int = 0; i< cards_.length; ++i){
			if(cards_[i]){
				if(cards_[i].quality >= Geek.Quality.Silver || cards_[i].lv >= 10){
					return true;
				}
			}
		}
		return false;
	}
	
	public function typeArray():int[]{
		var ret:int[] = [0,0,0,0,0];
		for(var i:int = 0;i < cards_.length;++i){
			if(cards[i]){
				switch(cards[i].magicType){
					case Geek.MagicType.Metal:
						ret[0]++;
						break;
					case Geek.MagicType.Wood:
						ret[1]++;
						break;
					case Geek.MagicType.Water:
						ret[2]++;
						break;
					case Geek.MagicType.Fire:
						ret[3]++;
						break;
					case Geek.MagicType.Earth:
						ret[4]++;
						break;
				}
			}
		}
		return ret;
	}
}