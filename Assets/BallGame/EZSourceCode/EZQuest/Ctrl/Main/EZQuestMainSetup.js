#pragma strict

class EZQuestMainSetup{
	class Item{
		var title:String = "";
		var pass:float = 1;
		var max:float = 1;
		var isPass:boolean = false;
		var list:List.<String> = null;
		var subscript:EZSubscript = null;
	};
	class Temp{
		var title:String = "";
		var pass:int = 0;
		var max:int = 0;
		var list:List.<String> = new List.<String>();
	};
	private var items_:Item[] = null;
	private var table_:List.<Temp> = new List.<Temp>();
	
	private function addQuest(quest:JsonData.Quest){
		var temp:Temp = null;
		for(var i:int =0; i<table_.Count; ++i){
			if(quest.classify == table_[i].title){
				temp = table_[i];
				temp.max += 1;
				Debug.LogWarning("q"+quest.id.ToString());
				temp.list.Add("q"+quest.id.ToString());
				if(quest.isPass()){
					temp.pass += 1;
				}
				table_[i] = temp;
				return;
			}
		}
		
		
		temp = new Temp();
		temp.max += 1;
		if(quest.isPass()){
			temp.pass += 1;
		}
		temp.list.Add("q"+quest.id.ToString());
		temp.title = quest.classify;
		table_.Add(temp);
		
		
	}
	public function EZQuestMainSetup(subscript:EZSubscript, list:List.<JsonData.Quest>){
		table_.Clear();
		for(var j:int = 0; j < list.Count; ++j){
			addQuest(list[j]);
		}
	
		items_ = new Item[table_.Count];
		
		for(var i:int = 0; i<items_.Length; ++i){
			var item:Item = new Item();
			item.title = table_[i].title;
			item.pass = table_[i].pass;
			item.max = table_[i].max;
			item.list = table_[i].list;
			Debug.Log(table_[i].list.Count);
			item.subscript = subscript;
			if((table_[i].pass == table_[i].max) && (table_[i].pass != 0)){
				item.isPass = true;
			}
			items_[i] = item;
		}
	}
	
	public function get items():Item[]{
		return items_;
	}
	
}