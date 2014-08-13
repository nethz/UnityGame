using UnityEngine;
using System.Collections;

using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;



namespace JsonData
{
	[JsonOptIn]
	public class Message{
		
		[JsonMember]
		public double timestamp = 0;
		
		[JsonMember]
		public string title = "";
		
		[JsonMember]
		public string content = "";
		
		[JsonMember]
		public Award award = null;
		
		[JsonMember]
		public string mode = "news";

	
		static public JsonData.Message Load(string json){
			JsonData.Message data = JsonDataHandler.reader<JsonData.Message>(json);
			return data;
		}
		
		static public string Save(JsonData.Message shop){
			string data = JsonDataHandler.write<JsonData.Message>(shop);
			return data;
		}
	}
/*	
	
	[JsonOptIn] 
	public class MessageInfo:DataInfo{
		[JsonMember]
		public Message theMessage;
	
		
		
		static public JsonData.MessageInfo Load(string json){
			JsonData.MessageInfo data = JsonDataHandler.reader<JsonData.MessageInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.MessageInfo info){
			string data = JsonDataHandler.write<JsonData.MessageInfo>(info);
			return data;
		}
	} 
	
	
	public class MessageInfoLoader:DataLoader{
		override public DataInfo load(string json){
			MessageInfo data = MessageInfo.Load(json);
			return data;
			
		}
	}
	*/
	
	public class BroadcastData{
		private int priority_ = 0;
		private JsonData.BroadcastItem item_= null;
		private JsonData.Soul soul_= null;
		private JsonData.BroadcastPage page_ = null;
		private string lastMission_ = null;
		private bool dirty_ = false;
		public int getPriority(){
			return priority_;
		}
		public void setLastMission(string lastMission){
			lastMission_ = lastMission;
		}
		private string getBeViewMission(){
			if(item_ != null && !string.IsNullOrEmpty(item_.beViewMission) ){
				return "ex_" +item_.beViewMission;

			}
			return null;

		}
		public string getText(){
			if(page_ != null){
				return page_.text;
			}
			string ret = item_.infoValue;
			string debug = "";
			string say = "";
			if(Debug.isDebugBuild){

				if(page_ != null){
					debug += "(web)"; 
				}else{
					if(!string.IsNullOrEmpty(lastMission_) && lastMission_ == getBeViewMission()){
						debug += "(be)"; 
					}
				}

				debug += "<"+ priority_+">"; 
				if(!string.IsNullOrEmpty(item_.openMission)){
					debug += "("+ item_.openMission+")";
					
				}
				if(!string.IsNullOrEmpty(item_.closeMission)){
					debug += "("+ item_.closeMission+")";
					
				}
			}
			if(soul_ != null){
				say = soul_.natureProp.name + ": ";
			}
			dirty_ = true;
			return debug + say + ret;
		}
		public bool getDirty(){
			return dirty_;
		}
		public void setDirty(bool dirty){
			dirty_ = dirty;
		}
		public void refresh(){
			if(page_ != null){
				priority_ = Random.Range(400, 500);
			}else{
				if(!string.IsNullOrEmpty(lastMission_) && lastMission_ == getBeViewMission()){
					priority_ = Random.Range(200, 300);
				}else{
					priority_ = Random.Range(0, 100);
				}
			}
		}

		public  BroadcastData(JsonData.BroadcastItem item){
			item_ = item;
		}
		public  BroadcastData(JsonData.BroadcastItem item, JsonData.Soul soul){
			item_ = item;
			soul_ = soul;
			
		}
		public  BroadcastData(JsonData.BroadcastPage page){
			page_ = page;
			
		}
		
	};

	public class BroadcastComparer: IComparer<BroadcastData>
	{
		
		public int Compare(BroadcastData a, BroadcastData b){
			
			if(a.getPriority()<b.getPriority()){
				return 1;		
			}
			if(a.getPriority()>b.getPriority()){
				return -1;		
			}

			return 0;
		}
	}
	[JsonOptIn]
	public class BroadcastPage{
		[JsonMember]
		public double begin;
		
		[JsonMember]
		public double end;

		[JsonMember]
		public string scene;

		[JsonMember]
		public string text;

	}
	[JsonOptIn]
	public class BroadcastWeb{
	
		
		[JsonMember]
		public BroadcastPage[] page = null;
		
		static public JsonData.BroadcastWeb Load(string json){
			JsonData.BroadcastWeb data = JsonDataHandler.reader<JsonData.BroadcastWeb>(json);
			return data;
		}
		
		static public string Save(JsonData.BroadcastWeb data){
			string json = JsonDataHandler.write<JsonData.BroadcastWeb>(data);
			return json;
		}
	}
	[JsonOptIn]
	public class BroadcastItem{
		
		[JsonMember]
		public string infoIndex = null;
		[JsonMember]
		public string infoValue = null;
		[JsonMember]
		public string sys = null;
		[JsonMember]
		public string openMission = null;
		[JsonMember]
		public string beViewMission = null;
		[JsonMember]
		public string closeMission = null;


		[JsonMember]
		public string[] openPets = null;


		static public JsonData.BroadcastItem Load(string json){
			JsonData.BroadcastItem data = JsonDataHandler.reader<JsonData.BroadcastItem>(json);
			return data;
		}
		
		static public string Save(JsonData.BroadcastItem data){
			string json = JsonDataHandler.write<JsonData.BroadcastItem>(data);
			return json;
		}

		static public JsonData.BroadcastItem[] LoadList(string json){
			JsonData.BroadcastItem[] data = JsonDataHandler.reader<JsonData.BroadcastItem[]>(json);
			return data;
		}
		
		static public string SaveList(JsonData.BroadcastItem[] data){
			string json = JsonDataHandler.write<JsonData.BroadcastItem[]>(data);
			return json;
		}
	}

	[JsonOptIn] 
	public class BroadcastInfo:DataInfo{
		[JsonMember]
		public BroadcastWeb broadcast;
	
		
		
		static public JsonData.BroadcastInfo Load(string json){
			JsonData.BroadcastInfo data = JsonDataHandler.reader<JsonData.BroadcastInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.BroadcastInfo info){
			string data = JsonDataHandler.write<JsonData.BroadcastInfo>(info);
			return data;
		}
	} 
	
	
	public class BroadcastInfoLoader:DataLoader{
		override public DataInfo load(string json){
			BroadcastInfo data = BroadcastInfo.Load(json);
			return data;
			
		}
	}
	
	

	
	[JsonOptIn] 
	public class MessageId{
		[JsonMember]
		public int id;
		
		[JsonMember]
		public int ver;
		
	}
	[JsonOptIn] 
	public class MessageBag{
		
		[JsonMember]
		public Message[] news;
		
		[JsonMember]
		public Message[] quest;
		
	
		static public JsonData.MessageBag Load(string json){
			JsonData.MessageBag data = JsonDataHandler.reader<JsonData.MessageBag>(json);
			return data;
		}
		
		static public string Save(JsonData.MessageBag bag){
			string data = JsonDataHandler.write<JsonData.MessageBag>(bag);
			return data;
		}
		
	}
	[JsonOptIn] 
	public class MessageBagInfo:DataInfo{
		[JsonMember]
		public MessageBag bag;
		
		
		
		static public JsonData.MessageBagInfo Load(string json){
			JsonData.MessageBagInfo data = JsonDataHandler.reader<JsonData.MessageBagInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.MessageBagInfo info){
			string data = JsonDataHandler.write<JsonData.MessageBagInfo>(info);
			return data;
		}
	} 


	[JsonOptIn] 
	public class DayInfo:DataInfo{
		
		
		
		static public JsonData.DayInfo Load(string json){
			JsonData.DayInfo data = JsonDataHandler.reader<JsonData.DayInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.DayInfo info){
			string data = JsonDataHandler.write<JsonData.DayInfo>(info);
			return data;
		}
	} 
	
	
	public class DayInfoLoader:DataLoader{
		override public DataInfo load(string json){
			DayInfo data = DayInfo.Load(json);
			return data;
			
		}
	}

	public class MessageBagInfoLoader:DataLoader{
		override public DataInfo load(string json){
			MessageBagInfo data = MessageBagInfo.Load(json);
			return data;
			
		}
	}
	
	
	[JsonOptIn] 
	public class MessageBagReceiveInfo:DataInfo{
		[JsonMember]
		public MessageBag messageBag;
		
			
		[JsonMember]
		public Player player = null;
		
		[JsonMember]
		public QuickBag quickBag = null;
		
		[JsonMember]
		public MagicBall magicBall = null;
		
		[JsonMember]
		public JsonData.QuickMissionBag quickLevelBag = null;
		
		//[JsonMember]
		//public QuestBag questBag = null;
	
		
		[JsonMember]
		public string[] warning = null;
		
		static public JsonData.MessageBagReceiveInfo Load(string json){
			JsonData.MessageBagReceiveInfo data = JsonDataHandler.reader<JsonData.MessageBagReceiveInfo>(json);
			return data;
		}
		
		static public string Save(JsonData.MessageBagReceiveInfo info){
			string data = JsonDataHandler.write<JsonData.MessageBagReceiveInfo>(info);
			return data;
		}
	} 
	
	
	public class MessageBagReceiveInfoLoader:DataLoader{
		override public DataInfo load(string json){
			MessageBagReceiveInfo data = MessageBagReceiveInfo.Load(json);
			return data;
			
		}
	}
}