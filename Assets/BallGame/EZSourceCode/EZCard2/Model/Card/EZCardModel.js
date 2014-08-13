#pragma strict

class EZCardModel extends MonoBehaviour{
	
	private var allBag_:int = 10;
	private var limitBag_:int = 0;
	private var cards_:List.<EZCard> = new List.<EZCard>();
	private var money_:int = 0;
	public function get money():int{
		return money_;
	}
	public function get bag():int{
		return cards_.Count;
	}
	public function get allBag():int{ 
		return allBag_;
	}
	public function get limitBag():int{
		return limitBag_;
	}
	
	public function get cards():List.<EZCard>{
		return cards_;
	}
	/*
	public function loadCard(i:int, card:EZCard[], data:JsonData.Card[], end:Function){
		EZCardTable.GetInstance().load(data[i], function(card:EZCard){
			cards_[i] = card;
			end();
		});
	}
	*/
	
	public function refreshBag():Task{
		var task:Task = new Task();
		task.init = function(){
			refresh();
		};
		return task;
	}
	public function refresh(){
		var bagTable:EZBagTable = EZBagTable.GetInstance();
		var bag:JsonData.Bag = bagTable.bag;
		
		var dict:Dictionary.<int, EZCard> = bagTable.dict;
		
		cards_.Clear();
		
		if(dict != null){
				for(var kv:KeyValuePair.<int, EZCard> in dict){
					var soul:EZCard = kv.Value as EZCard;
					cards_.Add(soul);
				}
				
		
		}
		
		if(bag){
			allBag_ = bag.max;
			money_ = bag.money;
		}
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var player:JsonData.Player = EZPlayerTable.GetInstance().data;
		if(setup && player){
			limitBag_ = setup.player.getXpBagLimit(player.exp);
		}
	}
	/*
	public function refreshBag(data:JsonData.Bag, end:Function){
	
		allBag_ = data.max;
		cards_ = new EZCard[data.list.Length];
		money_ = data.money;
		var callback:int =0;
		for(var i:int =0; i< data.list.Length; ++i){
			loadCard(i, cards_, data.list, function(){
				callback++;
				if(callback == data.list.Length){
					end();
				}
			
			});
			
		}
	
		
	}
	*/
	
	public function typeArray():int[]{
		var ret:int[] = [0,0,0,0,0];
		for(var i:int = 0;i < cards_.Count;++i){
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
		Debug.Log("<===========AlltypeArray==============>" + ret[0] + "," + ret[1] + "," + ret[2] + "," + ret[3] + "," + ret[4]);
		return ret;
	}
	
}

