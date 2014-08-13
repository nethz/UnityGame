#pragma strict

class EZBroadcastPack extends MonoBehaviour{
	private var list_:List.<JsonData.BroadcastData> = new List.<JsonData.BroadcastData>();
	private var broadcast_:JsonData.BroadcastWeb = null;
	private var iterator_:int = 0;
	
	private var default_:List.<String> = new List.<String>();
	class Item{
		var list:List.<JsonData.BroadcastData> = new List.<JsonData.BroadcastData>();
		var n:int = 0;
		function refresh():String{
			if(list.Count == 0){
				return null;
			}
			if(n >= list.Count){
			
				var last:String = EZMissionBagTable.GetInstance().lastType;
				for(var j:int = 0;j< list.Count; ++j){
					list[j].setLastMission(last);
					Debug.Log(list[j]);
					list[j].refresh();
				}
				
				this.list.Sort(new JsonData.BroadcastComparer());
				n = 0;
			
			}
			if(n>=0 && n < list.Count){
				var text:String = list[n].getText();
				++n;
				return text;
			}
			
			
			
			return null;
		}
	};
	private var dict_:Dictionary.<String, EZBroadcastPack.Item> = new Dictionary.<String, EZBroadcastPack.Item>();
	
	public function EZBroadcastPack(){
	}
	public function save(broadcast:JsonData.BroadcastWeb){
		broadcast_ = broadcast;
	}
	public function setup(list:List.<JsonData.BroadcastData>, where:String){
	
		list_.Clear();
		var item:Item = new Item();
		var last:String = EZMissionBagTable.GetInstance().lastType;
		for(var i:int = 0; i< list.Count; ++i){
			list[i].setLastMission(last);
			list[i].refresh();
			
			item.list.Add(list[i]);
			item.list.Sort(new JsonData.BroadcastComparer());
		//iterator_ = 0;
		}
		dict_.Add(where, item);
		
		/*
		var last:String = EZMissionBagTable.GetInstance().lastType;
		for(var i:int = 0;i< list.Count; ++i){
			list[i].setLastMission(last);
			list[i].refresh();
			list_.Add(list[i]);
		}*/
		/*
		if(broadcast_ != null){
			if(broadcast_.page){
				Debug.LogWarning(broadcast_.page);
				Debug.LogWarning(broadcast_.page.Length);
				var epoch:double = EZTimestamp.GetInstance().epoch;
				for(var j:int =0; j<broadcast_.page.Length; ++j){
					if(epoch >= broadcast_.page[j].begin && epoch <= broadcast_.page[j].end){
						if(!String.IsNullOrEmpty(broadcast_.page[j].text) && broadcast_.page[j].scene.ToLower() == where.ToLower()){
							var data:JsonData.BroadcastData = new JsonData.BroadcastData(broadcast_.page[j]);
							data.refresh();
							list_.Add(data);
						}
					}
				}
			
			
			}
		}*/
	}
	public function open(where:String){
	
		default_.Clear();
		
		if(broadcast_ != null){
			if(broadcast_.page){
				Debug.LogWarning(broadcast_.page);
				Debug.LogWarning(broadcast_.page.Length);
				var epoch:double = EZTimestamp.GetInstance().epoch;
				for(var j:int =0; j<broadcast_.page.Length; ++j){
					if(epoch >= broadcast_.page[j].begin && epoch <= broadcast_.page[j].end){
						if(!String.IsNullOrEmpty(broadcast_.page[j].text) && broadcast_.page[j].scene.ToLower() == where.ToLower()){
							
							Debug.LogWarning(broadcast_.page[j].text);
							default_.Add(broadcast_.page[j].text);
						}
					}
				}
			
			
			}
		}
		
		
		if(dict_.ContainsKey(where)){
			var item:Item = dict_[where];
			var text:String = item.refresh();
			default_.Add(text);
		}
	}
	public function getText():String{
		if(default_.Count == 0){
			return null;
		}
		if(iterator_ >= default_.Count){
			iterator_ = 0;
		}
		var text:String = default_[iterator_];
		iterator_++;
		return text;
	
	}

}