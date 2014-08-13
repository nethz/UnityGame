using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;



namespace JsonData
{
	
	[JsonOptIn]
	public class Award{
		[JsonMember]
		public int diamond = 0;
		[JsonMember]
		public int money = 0;
		[JsonMember]
		public int[] self = null;
		[JsonMember]
		public int[] other = null;
		[JsonMember]
		public int ball = -1;
		[JsonMember]
		public int magic = -1;
		[JsonMember]
		public int gold = 0;
		[JsonMember]
		public int silver = 0;
		[JsonMember]
		public int cuprum = 0;
		[JsonMember]
		public int invitation = 0;
		[JsonMember]
		public int exp = 0;
		
		public bool empty(){
			if(diamond != 0 ){
				return false;
			}
			if(money != 0 ){
				return false;
			}
			if(other != null){
				for(int i=0; i<other.Length; ++i){
					if(other[i] !=0) return false;
				}
			}

			if(self != null){
				for(int i=0; i<self.Length; ++i){
					if(self[i] !=0) return false;
				}
			}
			if(ball != -1){
				return false;
			}
			if(magic != -1){
				return false;
			}
			if(gold != 0){
				return false;
			}
			if(silver != 0){
				return false;
			}
			if(cuprum != 0){
				return false;
			}
			if(invitation != 0){
				return false;
			}
			
			if(exp != 0){
				return false;
			}
			return true;
			
		}
	}
	[JsonOptIn]
	public class QuestItemCard{
		
		[JsonMember]
		public string style;
		[JsonMember]
		public string name;
		[JsonMember]
		public string magicType;
		[JsonMember]
		public int lv = 0;
		[JsonMember]
		public int quality = 0;
	}
	
	
	[JsonOptIn]
	public class QuestItemMission{
		
		[JsonMember]
		public string type;
		[JsonMember]
		public string mode = "pve";
		[JsonMember]
		public string name = "name";
		[JsonMember]
		public float ap = 6;
		[JsonMember]
		public string scene = "wood";
		
	
	}
	[JsonOptIn]
	public class QuestItem{
		[JsonMember]
		public string mode;
		[JsonMember]
		public bool pass;
		[JsonMember]
		public QuestItemCard card = null;
		[JsonMember]
		public QuestItemMission mission = null;

		static public string Save(JsonData.QuestItem quest){
			string data = JsonDataHandler.write<JsonData.QuestItem>(quest);
			return data;
		}
	}
	[JsonOptIn]
	public class Quest{
		[JsonMember]
		public int id= -1;
		[JsonMember]
		public string classify;
		[JsonMember]
		public string title;
		
		[JsonMember]
		public string refresh;
		
		[JsonMember]
		public QuestItem[] items;
		[JsonMember]
		public Award award;
		
		[JsonMember]
		public int ver;
		
		public int getCollection(){
			int collection = 0;
			if(items != null){
				for(int i=0; i< items.Length; ++i){
					if(items[i].pass){
						collection += 1;
					}
				}
			}
			return collection;
		}
		
		public bool isPass(){
			for(int i = 0; i<items.Length; ++i){
				if(!items[i].pass){
					return false;
				}
			}
			return true;
		}
		static public JsonData.Quest Load(string json){
			JsonData.Quest data = JsonDataHandler.reader<JsonData.Quest>(json);
			return data;
		}
			
				
		static public string Save(JsonData.Quest quest){
			string data = JsonDataHandler.write<JsonData.Quest>(quest);
			return data;
		}
		
	}
	
	
	[JsonOptIn]
	public class QuestInfo:DataInfo{
		
		
		[JsonMember]
		public Quest quest;
		
		
		
		static public JsonData.QuestInfo Load(string json){
			JsonData.QuestInfo data = JsonDataHandler.reader<JsonData.QuestInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.QuestInfo questInfo){
			string data = JsonDataHandler.write<JsonData.QuestInfo>(questInfo);
			return data;
		}
		
	}
	
	
	[JsonOptIn]
	public class QuestId{
		[JsonMember]
		public int id;
		[JsonMember]
		public int ver;
	}
	[JsonOptIn]
	public class QuestBag{
		
		
		[JsonMember]
		public JsonData.QuestId[] list;
		
		public bool empty(){
			if(list == null || list.Length == 0){
				return true;
			}
			return false;
		}
		
		static public JsonData.QuestBag Load(string json){
			JsonData.QuestBag data = JsonDataHandler.reader<JsonData.QuestBag>(json);
			return data;
		}
			
				
		static public string Save(JsonData.QuestBag questBag){
			string data = JsonDataHandler.write<JsonData.QuestBag>(questBag);
			return data;
		}
		
	}
	[JsonOptIn]
	public class QuickQuestBag{
		[JsonMember]
		public QuestBag bag;
		
		[JsonMember]
		public Quest[] list;
	}
	[JsonOptIn]
	public class QuickQuestBagInfo:DataInfo{
		[JsonMember]
		public QuickQuestBag quickBag;
		
		
		
		static public JsonData.QuickQuestBagInfo Load(string json){
			JsonData.QuickQuestBagInfo data = JsonDataHandler.reader<JsonData.QuickQuestBagInfo>(json);
			return data;
		}
		
		
		static public string Save(JsonData.QuickQuestBagInfo data){
			string json = JsonDataHandler.write<JsonData.QuickQuestBagInfo>(data);
			return json;
		}
	}
	[JsonOptIn]
	public class QuestBagInfo:DataInfo{
		
		
		[JsonMember]
		public QuestBag bag;
		
		
		
		static public JsonData.QuestBagInfo Load(string json){
			JsonData.QuestBagInfo data = JsonDataHandler.reader<JsonData.QuestBagInfo>(json);
			return data;
		}
			
				
		static public string Save(JsonData.QuestBagInfo data){
			string json = JsonDataHandler.write<JsonData.QuestBagInfo>(data);
			return json;
		}
		
	}
	public class QuestInfoLoader:DataLoader{
		override public DataInfo load(string json){
			QuestInfo data = QuestInfo.Load(json);
			return data;
		}
		
	}
	public class QuestBagInfoLoader:DataLoader{
		override public DataInfo load(string json){
			QuestBagInfo data = QuestBagInfo.Load(json);
			return data;
		}
		
	}

	
	public class QuickQuestBagInfoLoader:DataLoader{
		override public DataInfo load(string json){
			QuickQuestBagInfo data = QuickQuestBagInfo.Load(json);
			return data;
		}
		
	}
	
}