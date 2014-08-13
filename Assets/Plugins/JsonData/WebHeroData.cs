using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;


namespace JsonData
{
	//[JsonOptIn]
	//public class Scene{
	//	[JsonMember]
	//	public int id = 0;
	//}
	
	[JsonOptIn]
	public class AffixInfo{
		[JsonMember]
		public string type ="none";
		[JsonMember]
		public string json ="{}";
	}
	
	[JsonOptIn]
	public class TechInfo{
		[JsonMember]
		public string type;
		[JsonMember]
		public string mark;
		[JsonMember]
		public JsonData.JsonPack[] affixes;
	}
	
	[JsonOptIn]
	public class BaseProperty{
		[JsonMember]
		public float maxHealth  = -1;
		[JsonMember]
		public float speed  = -1;
		[JsonMember]
		public float exp  = 0;
		[JsonMember]
		public int lv  = 0;
		[JsonMember]
		public float attack  = -1;
		[JsonMember]
		public int quality = 0;
	}
	
	
	
	[JsonOptIn]
	public class NatureProperty{
		[JsonMember]
		public string type = "";
		[JsonMember]
		public string style = "";
		[JsonMember]
		public int group = -1;
		[JsonMember]
		public string name = "Monster";
	}
	
	[JsonOptIn]
	public class MagicProperty{
		[JsonMember]
		public float maxPower  = -1;
		[JsonMember]
		public TechInfo tech;
	}
	
	[JsonOptIn]
	public class SkillProperty{
		[JsonMember]
		public TechInfo tech;
		
	}
	[JsonOptIn]
	public class CrystalTech{
		
		[JsonMember]
		public int mp = 0;
		[JsonMember]
		public int maxMp = -1;
		[JsonMember]
		public int group = -1;
		[JsonMember]
		public int lv = 0;
		
		[JsonMember]
		public int cry = -1;


		[JsonMember]
		public TechInfo tech;
		
		static public JsonData.CrystalTech Load(string json){
			JsonData.CrystalTech data = JsonDataHandler.reader<JsonData.CrystalTech>(json);
			return data;
		}
		static public string Save(JsonData.CrystalTech data){
			
			string json = JsonDataHandler.write<JsonData.CrystalTech>(data);
			return json;
		}
	}
	
	[JsonOptIn]
	public class CrystalTechInfo:DataInfo{
		[JsonMember]
		public CrystalTech crystal = null;
		//[JsonMember]
		//public QuickQuestBag quickQuestBag = null;
		
		static public JsonData.CrystalTechInfo Load(string json){
			JsonData.CrystalTechInfo data = JsonDataHandler.reader<JsonData.CrystalTechInfo>(json);
			return data;
		}
		
	}
	[JsonOptIn]
	public class AttackProperty{
		[JsonMember]
		public float attack  = -1;
	}
	[JsonOptIn]
	public class Team{
		[JsonMember]
		public float battle  = -1;
		[JsonMember]
		public float bag1  = -1;
		[JsonMember]
		public float bag2  = -1;
		public bool find(int id){
			if(id != battle && id != bag1 && id != bag2){
				return false;
			}
			return true;
		}
		static public JsonData.Team Load(string json){
			JsonData.Team data = JsonDataHandler.reader<JsonData.Team>(json);
			return data;
		}
		
		
		static public string Save( JsonData.Team team){
			string data = JsonDataHandler.write<JsonData.Team>(team);
			return data;
		}
		
		
	}
	
	[JsonOptIn]
	public class Share{
		[JsonMember]
		public int mp = 0;
		[JsonMember]
		public int health = 0;
		[JsonMember]
		public float bar = 0;
		[JsonMember]
		public int lv = 0;
		[JsonMember]
		public int quality = 0;
		[JsonMember]
		public int group = 0;
		[JsonMember]
		public string name = "";
		[JsonMember]
		public string style = "";
		[JsonMember]
		public float speed = 0;
		[JsonMember]
		public float attack = 0;
		[JsonMember]
		public string[] t = null;
		[JsonMember]
		public int[] tv = null;
		[JsonMember]
		public string[] tm = null;

		[JsonMember]
		public int magic = 0;

		static public string Save(JsonData.Share share){
			string data = JsonDataHandler.write<JsonData.Share>(share);
			return data;
		}
	}
	[JsonOptIn]
	public class Soul{


		[JsonMember]
		public int id = -1;
		[JsonMember]
		public int ver = -1;
		[JsonMember]
		public NatureProperty natureProp;
		
		[JsonMember]
		public string type = null;
		[JsonMember]
		public bool[] appear = null;

		[JsonMember]
		public BaseProperty baseProp;
		[JsonMember]
		public MagicProperty magicProp;
		[JsonMember]
		public SkillProperty skillProp;
		
		static public JsonData.Soul Load(string json){
			//json = '{"succeed":true,"epoch":1382679175,"card":{"type":"ex_P726","natureProp":{"style":"tinman","type":"Earth","group":1,"name":"\u94c1\u7403"},"baseProp":{"quality":0,"exp":0,"lv":0,"attack":7,"speed":9,"maxHealth":160},"skillProp":{"tech":{"type":"ex_P726_skill","affixes":[{"type":"attack","mark":"attack","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"coefficient":0.05},{"type":"add","mark":"add","name":"none","info":"none","level":[0.5,0.7,0.9,1.1,1],"lv":0,"coefficient":1},{"type":"reinforce_dot_add","mark":"add_dot","name":"none","info":"none","level":[1,1.4,1.8,2.2,2.2],"lv":0}]}},"magicProp":{"maxPower":{"value":18},"tech":{"type":"ex_P726_magic","affixes":[{"type":"attacked","mark":"attacked","name":"none","info":"none","level":[1,1,1,1,1],"lv":0,"step_6":6.7,"step_12":4.7,"step_18":4.1,"coefficient":0.02},{"type":"dot_path","mark":"path3","name":"none","info":"none","level":[0.25,0.27083,0.29167,0.3125,0.33333],"lv":0,"times":3,"coefficient":-0.4},{"type":"reinforce_dot_add","mark":"added_dot","name":"none","info":"none","level":[1,1.25,1.5,1.75,2],"lv":0},{"type":"blood","mark":"blood","name":"none","info":"none","level":[0.25,0.28125,0.3125,0.34375,0.375],"lv":0,"round":2}]}},"id":14,"ver":15000}}';
			JsonData.Soul data = JsonDataHandler.reader<JsonData.Soul>(json);
			return data;
		}
		
	
		
		static public string Save( JsonData.Soul soul){
			string data = JsonDataHandler.write<JsonData.Soul>(soul);
			return data;
		}
	}
	
	
	
	
	
	[JsonOptIn]
	public class Monster{
		[JsonMember]
		public bool[] appear = null;
		[JsonMember]
		public string type;
		
		
		[JsonMember]
		public NatureProperty natureProp;
		
		
		[JsonMember]
		public BaseProperty baseProp;
		
		
		[JsonMember]
		public MonsterTech def;
		
		[JsonMember]
		public MonsterTech[] techs;
		
		static public JsonData.Monster Load(string json){
			JsonData.Monster data = JsonDataHandler.reader<JsonData.Monster>(json);
			return data;
		}
	}
	
	

	
	[JsonOptIn]
	public class Hero{
		[JsonMember]
		public string avatar;
		[JsonMember]
		public int lv;
		[JsonMember]
		public Soul battle;
		[JsonMember]
		public Soul bag1;
		[JsonMember]
		public Soul bag2;
		
			
		static public JsonData.Hero load(string json){
			JsonData.Hero data = JsonDataHandler.reader<JsonData.Hero>(json);
			return data;
		}
		
	}
	
	
	/*
	[JsonOptIn]
	public class Payment{
		[JsonMember]
		public bool succeed = false;
		[JsonMember]
		public string message = "";
		[JsonMember]
		public Player player = null;
		
		static public JsonData.Payment Load(string json){
			JsonData.Payment data = JsonDataHandler.reader<JsonData.Payment>(json);
			return data;
		}
		
		static public string Save(JsonData.Payment payment){
			string data = JsonDataHandler.write<JsonData.Payment>(payment);
			return data;
		}
	}*/
	[JsonOptIn]
	public class LobbyInfo:DataInfo{
		
		
		[JsonMember]
		public Weather weather = null;
	
		[JsonMember]
		public Player player = null;

		[JsonMember]
		public QuickBag quickBag = null;

		[JsonMember]
		public MagicBall magicBall = null;

		[JsonMember]
		public QuickQuestBag quickQuestBag = null;
		[JsonMember]
		public MessageBag messageBag = null;

		[JsonMember]
		public QuickMissionBag quickLevelBag = null;

		[JsonMember]
		public BroadcastWeb broadcast;
		/**/
		static public JsonData.LobbyInfo Load(string json){
			JsonData.LobbyInfo data = JsonDataHandler.reader<JsonData.LobbyInfo>(json);
		 	return data;
		}
		
	}
	
	[JsonOptIn]
	public class HomeInfo:DataInfo{

		
		[JsonMember]
		public Weather weather = null;
		
		[JsonMember]
		public MessageBag messageBag = null;
		
		[JsonMember]
		public BroadcastWeb broadcast = null;
		
		[JsonMember]
		public QuickQuestBag quickQuestBag = null;
		/*
		
		[JsonMember]
		public Player player = null;
		[JsonMember]
		public QuickBag quickBag = null;
		
		[JsonMember]
		public MagicBall magicBall = null;

		
		[JsonMember]
		public QuickMissionBag quickLevelBag = null;

		*/
		static public JsonData.HomeInfo Load(string json){
			JsonData.HomeInfo data = JsonDataHandler.reader<JsonData.HomeInfo>(json);
			return data;
		}
		
	}
	public class LobbyInfoLoader:DataLoader{
		override public DataInfo load(string json){
			LobbyInfo data = LobbyInfo.Load(json);
			return data;
		}
	}
	
	public class HomeInfoLoader:DataLoader{
		override public DataInfo load(string json){
			HomeInfo data = HomeInfo.Load(json);
			return data;
		}
	}

	public class CrystalTechInfoLoader:DataLoader{
		override public DataInfo load(string json){
			CrystalTechInfo data = CrystalTechInfo.Load(json);
			return data;
			
		}
	}
	
	
}


/*
public class WebHeroDataHandle {

	public JsonData.Hero data = null;
	public void reader(string json){
		this.data = JsonDataHandler.reader<JsonData.Hero>(json);
	}

}
*/