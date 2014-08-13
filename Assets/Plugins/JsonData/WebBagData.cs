using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;



namespace JsonData
{
	
	[JsonOptIn]
	public class Card{
		[JsonMember]
		public int id;
		[JsonMember]
		public int ver;
	}
	//[JsonOptIn]
	//public class CardData{

	//}
 	[JsonOptIn]
	public class Draw{
		[JsonMember]
		public JsonData.Soul[] list;
		
		public bool has(int id){
			if(list != null){
				for(int i = 0; i<list.Length; ++i){
					if(list[i].id == id){
						return true;
					}
				}	
			}
			return false;
		}
	}
	
	
	
	
	[JsonOptIn]
	public class DarwInfo:DataInfo{
		
		[JsonMember]
		public Bag bag = null;
		[JsonMember]
		public Draw draw = null;
		[JsonMember]
		public Player player = null;
		//[JsonMember]
		//public QuickQuestBag quickQuestBag = null;
		
		static public JsonData.DarwInfo Load(string json){
			JsonData.DarwInfo data = JsonDataHandler.reader<JsonData.DarwInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.DarwInfo data){
			string json = JsonDataHandler.write<JsonData.DarwInfo>(data);
			return json;
		}
		
		
		
	}
	
		
	public class DarwInfoLoader:DataLoader{
		override public DataInfo load(string json){
			DarwInfo data = DarwInfo.Load(json);
			return data;
		}
	}
	[JsonOptIn] 
	public class QuickBag{
		
		[JsonMember]
		public Bag bag;
		[JsonMember]
		public Soul[] souls;

		static public JsonData.QuickBag Load(string json){
			JsonData.QuickBag data = JsonDataHandler.reader<JsonData.QuickBag>(json);
			return data;
		}
		
		static public string Save(JsonData.QuickBag bag){
			string data = JsonDataHandler.write<JsonData.QuickBag>(bag);
			return data;
		}
	}

	[JsonOptIn]
	public class Title{
		
		//[JsonMember]
		//	public SellBag sell_bag;
		[JsonMember]
		public string text;
	
		static public JsonData.Title Load(string json){
			JsonData.Title data = JsonDataHandler.reader<JsonData.Title>(json);
			return data;
		}
		
		static public string Save(JsonData.Title bag){
			string data = JsonDataHandler.write<JsonData.Title>(bag);
			return data;
		}
		
	}
 	[JsonOptIn]
	public class Bag{
		
		//[JsonMember]
	//	public SellBag sell_bag;
		[JsonMember]
		public int max;
		[JsonMember]
		public int money;
		[JsonMember]
		public JsonData.Card[] list;
		[JsonMember]
		public bool succeed = false;
		
		public bool overflow(){
			if(list != null)
				return list.Length > max;
			return false;
		}
		
		static public JsonData.Bag Load(string json){
			JsonData.Bag data = JsonDataHandler.reader<JsonData.Bag>(json);
			return data;
		}
				
		static public string Save(JsonData.Bag bag){
			string data = JsonDataHandler.write<JsonData.Bag>(bag);
			return data;
		}
		
	}
	[JsonOptIn]
	public class CardInfo:DataInfo{
		[JsonMember]
		public Soul card = null;
		
		
		static public JsonData.CardInfo Load(string json){
			JsonData.CardInfo data = JsonDataHandler.reader<JsonData.CardInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.CardInfo bag){
			string data = JsonDataHandler.write<JsonData.CardInfo>(bag);
			return data;
		}
	}
	

	[JsonOptIn]
	public class QuickBagInfo:DataInfo{
		[JsonMember]
		public QuickBag quickBag = null;

		static public JsonData.QuickBagInfo Load(string json){
			JsonData.QuickBagInfo data = JsonDataHandler.reader<JsonData.QuickBagInfo>(json);
			return data;
		}
	}
	[JsonOptIn]
	public class BagInfo:DataInfo{

		
		
	


		[JsonMember]
		public Bag bag = null;
		
		static public JsonData.BagInfo Load(string json){
			JsonData.BagInfo data = JsonDataHandler.reader<JsonData.BagInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.BagInfo bag){
			string data = JsonDataHandler.write<JsonData.BagInfo>(bag);
			return data;
		}
		
	}

	[JsonOptIn]
	public class BagCompInfo:DataInfo{
		
		[JsonMember]
		public Bag bag = null;
		
		static public JsonData.BagCompInfo Load(string json){
			JsonData.BagCompInfo data = JsonDataHandler.reader<JsonData.BagCompInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.BagCompInfo bag){
			string data = JsonDataHandler.write<JsonData.BagCompInfo>(bag);
			return data;
		}
		
	}
	
	[JsonOptIn]
	public class ShareInfo:DataInfo{
		
		//[JsonMember]
		//public QuickQuestBag quickQuestBag = null;
		[JsonMember]
		public Title title = null;
		
		static public JsonData.ShareInfo Load(string json){
			JsonData.ShareInfo data = JsonDataHandler.reader<JsonData.ShareInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.ShareInfo bag){
			string data = JsonDataHandler.write<JsonData.ShareInfo>(bag);
			return data;
		}
		
		
		
	}
	
	[JsonOptIn]
	public class BagMaxInfo:DataInfo{
		[JsonMember]
		public QuickBag quickBag = null;
		[JsonMember]
		public Player player = null;
		//[JsonMember]
		//public QuickQuestBag quickQuestBag = null;
		
		static public JsonData.BagMaxInfo Load(string json){
			JsonData.BagMaxInfo data = JsonDataHandler.reader<JsonData.BagMaxInfo>(json);
			return data;
		}
			
	
	}
	public class BagMaxInfoLoader:DataLoader{
		override public DataInfo load(string json){
			BagMaxInfo data = BagMaxInfo.Load(json);
			return data;
		}
		
	}
	public class ShareInfoLoader:DataLoader{
		
		override public DataInfo load(string json){
			ShareInfo data = ShareInfo.Load(json);
			return data;
		}
	}
	public class QuickBagInfoLoader:DataLoader{
		override public DataInfo load(string json){
			QuickBagInfo data = QuickBagInfo.Load(json);
			return data;
		}

	}
	public class BagInfoLoader:DataLoader{
		override public DataInfo load(string json){
			BagInfo data = BagInfo.Load(json);
			return data;
		}
		
	}

/*	
	public class QuickBagCompInfoLoader:DataLoader{
		override public DataInfo load(string json){
			QuickBagCompInfo data = QuickBagCompInfo.Load(json);
			return data;
		}
	}*/
	public class BagCompInfoLoader:DataLoader{
		override public DataInfo load(string json){
			BagCompInfo data = BagCompInfo.Load(json);
			return data;
		}
	}
	
	public class CardInfoLoader:DataLoader{
		override public DataInfo load(string json){
			CardInfo data = CardInfo.Load(json);
			return data;
		}
		
	}
}