using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using Pathfinding.Serialization.JsonFx;


namespace JsonData
{ 	
[JsonOptIn]
public class LevelItem{
	[JsonMember]
	public string name;
	
	[JsonMember]
	public string level;
	
	
	[JsonMember]
	public float ap;
		
	[JsonMember]
	public int team;
		
	[JsonMember]
	public double start = 0;
		
	[JsonMember]
	public double end = 0;

	[JsonMember]
	public int key = 0;
		
}

[JsonOptIn]
public class Level{
	[JsonMember]
	public int id;
	[JsonMember]
	public string name;
	[JsonMember]
	public string info;
	[JsonMember]
	public LevelItem[] items;
}
[JsonOptIn]
public class LevelList{
	[JsonMember]
	public Level[] lists;
	
}


[JsonOptIn]
public class MissionCard{
	[JsonMember]
	public string style = "none";	
	[JsonMember]
	public string magicType = "Fire";
	[JsonMember]
	public int quality = -1;
	
}
[JsonOptIn]
public class EvtMission{
	
	[JsonMember]
	public string classify = "none";
	[JsonMember]
	public string classify_info = "none";
	
	[JsonMember]
	public int ver = -1;
	[JsonMember]
	public string name = "none";
	[JsonMember]
	public string type = "none";
	[JsonMember]
	public int id = -1;
		
	[JsonMember]
	public int ap = 1;
		
	[JsonMember]
	public int team = 1;
		
	[JsonMember]
	public double start = 0;
		
	[JsonMember]
	public double end = 0;

	[JsonMember]
	public int key = 0;
	[JsonMember]
	public bool[] day = null;
	[JsonMember]
	public int sort = 0;
	[JsonMember]
	public bool pass = false;
		
	[JsonMember]
	public MissionCard[] cards = null;
		
		
	public int getCount(){
		return 0;		
	}
	public int getPass(){
		return 0;		
	}
	public int howManyDays(System.DateTime time){
		int day = (int)time.DayOfWeek;
		
		for(int n = 0; n<7; ++n){
			if(this.day[(day+n) % 6]){
				return n;
			}
		
		}
		
		return -1;
	} 
		
	static public JsonData.EvtMission Load(string json){
		JsonData.EvtMission data = JsonDataHandler.reader<JsonData.EvtMission>(json);
		return data;
	}
	static public string Save(JsonData.EvtMission mission){
		string data = JsonDataHandler.write<JsonData.EvtMission>(mission);
		return data;
	}
		
	
}
	
public class EvtMissionComparer: IComparer<EvtMission>
{
	
    public int Compare(EvtMission a, EvtMission b){
		
		if(a.sort>b.sort){
			return 1;		
		}
		if(a.sort < b.sort){
			return -1;		
		}
		if(a.id > b.id){
			return 1;		
		}
		if(a.id < b.id){
			return -1;		
		}
		return 0;
    }
}
	
[JsonOptIn]
public class Mission{	
		
	[JsonMember]
	public int ver = -1;
	[JsonMember]
	public string classify = "none";
	[JsonMember]
	public string classify_info = "none";
	[JsonMember]
	public string mode = "pvp";
	[JsonMember]
	public string scene = "Fire";
	[JsonMember]
	public string name = "none";
	[JsonMember]
	public string type = "none";
	[JsonMember]
	public int id = -1;
		
	[JsonMember]
	public int ap = 1;
		
			
	[JsonMember]
	public int team = 1;
	
	[JsonMember]
	public bool pass = false;
		
	[JsonMember]
	public MissionCard[] cards = null;

	[JsonMember]
	public bool big = false;
	
	public int getCount(){
		if(cards != null)		
			return cards.Length;		
		return 0;
	}
	public int getPass(){
		int pass = 0;
		if(cards != null){
			for(int i = 0; i<cards.Length; ++i){
				if(cards[i] != null){
					if(cards[i].style.ToLower() != "none" && cards[i].quality != -1){
						++pass;		
					}
				}
			}		
		}
		return pass;		
	}
		
	static public JsonData.Mission Load(string json){
		JsonData.Mission data = JsonDataHandler.reader<JsonData.Mission>(json);
		return data;
	}
	static public string Save(JsonData.Mission mission){
		string data = JsonDataHandler.write<JsonData.Mission>(mission);
		return data;
	}
		
	
}
public class QuestComparer: IComparer<Quest>
{
	
    public int Compare(Quest a, Quest b){
		
		if(a.id > b.id){
			return 1;		
		}
		if(a.id < b.id){
			return -1;		
		}
		return 0;
    }
}


public class MissionComparer: IComparer<Mission>
{
	
    public int Compare(Mission a, Mission b){
		
		if(a.id > b.id){
			return 1;		
		}
		if(a.id < b.id){
			return -1;		
		}
		return 0;
    }
}

[JsonOptIn]
public class MissionInfo:DataInfo{
		
	[JsonMember]
	public Mission mission;
	static public JsonData.MissionInfo Load(string json){
		JsonData.MissionInfo data = JsonDataHandler.reader<JsonData.MissionInfo>(json);
			
		return data;
	}
	static public string Save(JsonData.MissionInfo missionInfo){
		string data = JsonDataHandler.write<JsonData.MissionInfo>(missionInfo);
		return data;
	}
}
	
	
[JsonOptIn]
public class EvtMissionInfo:DataInfo{
		
	[JsonMember]
	public EvtMission mission;
	
		
	static public JsonData.EvtMissionInfo Load(string json){
		JsonData.EvtMissionInfo data = JsonDataHandler.reader<JsonData.EvtMissionInfo>(json);
		return data;
	}
	static public string Save(JsonData.EvtMissionInfo missionInfo){
		string data = JsonDataHandler.write<JsonData.EvtMissionInfo>(missionInfo);
		return data;
	}
}
[JsonOptIn]
public class MissionItem{
	[JsonMember]
	public int id = -1;
	[JsonMember]
	public int ver = -1;
}
[JsonOptIn]
	public class QuickMissionBag{
			
		[JsonMember]
		public MissionBag bag;
		[JsonMember]
		public Mission[] missions;
		[JsonMember]
		public EvtMission[] events;

		static public JsonData.QuickMissionBag Load(string json){
			JsonData.QuickMissionBag data = JsonDataHandler.reader<JsonData.QuickMissionBag>(json);
			
			return data;
		}
		static public string Save(JsonData.QuickMissionBag missionBag){
			string data = JsonDataHandler.write<JsonData.QuickMissionBag>(missionBag);
			return data;
		}
	}
[JsonOptIn]
public class MissionBag{
	[JsonMember]
	public MissionItem[] evtList;
	[JsonMember]
	public MissionItem[] list;
	
	[JsonMember]
	public int gold = 0;
	[JsonMember]
	public int silver = 0;
	[JsonMember]
	public int cuprum = 0;
	static public JsonData.MissionBag Load(string json){
		JsonData.MissionBag data = JsonDataHandler.reader<JsonData.MissionBag>(json);
		
		return data;
	}
	static public string Save(JsonData.MissionBag missionBag){
		string data = JsonDataHandler.write<JsonData.MissionBag>(missionBag);
		return data;
	}
		
}
public class MissionUseKey:DataInfo{
		
	[JsonMember]
	public MissionBag bag;
	
		
		
	static public JsonData.MissionUseKey Load(string json){
		JsonData.MissionUseKey data = JsonDataHandler.reader<JsonData.MissionUseKey>(json);
		return data;
	}
}


	
[JsonOptIn]
public class QuickMissionBagInfo:DataInfo{
		
	[JsonMember]
	public QuickMissionBag quickBag;
		
		
		
		
	static public JsonData.QuickMissionBagInfo Load(string json){
		JsonData.QuickMissionBagInfo data = JsonDataHandler.reader<JsonData.QuickMissionBagInfo>(json);
			
			
		return data;
	}
	static public string Save(JsonData.QuickMissionBagInfo data){
		string json = JsonDataHandler.write<JsonData.QuickMissionBagInfo>(data);
		return json;
	}
}


[JsonOptIn]
public class MissionBagInfo:DataInfo{
		
	[JsonMember]
	public MissionBag bag;
		

		
		
	static public JsonData.MissionBagInfo Load(string json){
		JsonData.MissionBagInfo data = JsonDataHandler.reader<JsonData.MissionBagInfo>(json);

			
		return data;
	}
	static public string Save(JsonData.MissionBagInfo missionBagInfo){
		string data = JsonDataHandler.write<JsonData.MissionBagInfo>(missionBagInfo);
		return data;
	}
}
public class EvtMissionInfoLoader:DataLoader{
	override public DataInfo load(string json){
		EvtMissionInfo data = EvtMissionInfo.Load(json);
		return data;
	}

}
	
public class MissionInfoLoader:DataLoader{
	override public DataInfo load(string json){
		MissionInfo data = MissionInfo.Load(json);
		return data;
	}

}
	
public class MissionBagInfoLoader:DataLoader{
	override public DataInfo load(string json){
		MissionBagInfo data = MissionBagInfo.Load(json);
		return data;
	}

}
	
public class QuickMissionBagInfoLoader:DataLoader{
	override public DataInfo load(string json){
		QuickMissionBagInfo data = QuickMissionBagInfo.Load(json);
		return data;
	}
	
}
public class MissionUseKeyLoader:DataLoader{
	override public DataInfo load(string json){
		MissionUseKey data = MissionUseKey.Load(json);
		return data;
	}
	
}
	
}