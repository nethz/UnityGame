using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


using System.Collections.Generic;


namespace JsonData{
	[JsonOptIn]
	public class MonsterTech{
		[JsonMember]
		public int begin;
		[JsonMember]
		public int cd;
		[JsonMember]
		public int power;
		
		[JsonMember]
		public int beginPower;
		
		[JsonMember]
		public TechInfo attack;
		
		[JsonMember]
		public TechInfo magic;
		
	
		
	}
	[JsonOptIn]
	public class State{
		[JsonMember]
		public string name; 
		[JsonMember]
		public BaseProperty baseProp;
		[JsonMember]
		public MonsterTech tech;
		[JsonMember]
		public JsonData.JsonPack[] shifts;
		
	}
	[JsonOptIn]
	public class Boss{
		
		[JsonMember]
		public bool[] appear = null;
		[JsonMember]
		public string type;
		[JsonMember]
		public NatureProperty natureProp;
		[JsonMember]
		public State[] states;
		
		static public JsonData.Boss Load(string json){
			JsonData.Boss data = JsonDataHandler.reader<JsonData.Boss>(json);
			return data;
		}
	}
	[JsonOptIn]
	public class ThePosition{
		[JsonMember]
		public Boss soul;
		[JsonMember]
		public int dropQuality;
	}
	
	[JsonOptIn]
	public class PositionDoc{
		[JsonMember]
		public string type = "";
		[JsonMember]
		public string[] pop = null;
		[JsonMember]
		public string info = "";

	}

	[JsonOptIn]
	public class WaveDoc{

		[JsonMember]
		public PositionDoc[] battle = null;
		[JsonMember]
		public PositionDoc[] bag1 = null;
		[JsonMember]
		public PositionDoc[] bag2 = null;

		private PositionDoc getDoc(PositionDoc[] docs, string type){
//			Debug.LogWarning(type);
			if(docs == null){
				return null;
			}
			for(int i = 0; i<docs.Length; ++i){
				if(docs[i] != null &&  (docs[i].type == type|| string.IsNullOrEmpty(docs[i].type))){
					return docs[i];
				}


			}
			return null;

		}
		public PositionDoc getBattle(string type){
			return getDoc(battle, type);
		}
		
		public PositionDoc getBag1(string type){
			return getDoc(bag1, type);
			
		}
		
		public PositionDoc getBag2(string type){
			return getDoc(bag2, type);
			
		}

	}
	[JsonOptIn]
	public class LevelDoc{
		[JsonMember]
		public WaveDoc[] wave = null;
		[JsonMember]
		public string talk = "";
		[JsonMember]
		public string[] talks = null;
		[JsonMember]
		public string info = "";
		
		[JsonMember]
		public string title = "";
		
		[JsonMember]
		public string scene = "";


		[JsonMember]
		public int ver;
		static public JsonData.LevelDoc Load(string json){
			JsonData.LevelDoc data = JsonDataHandler.reader<JsonData.LevelDoc>(json);
			return data;
		}
		static public string Save(JsonData.LevelDoc scene){
			string json = JsonDataHandler.write<JsonData.LevelDoc>(scene);
			return json;
		}
	}
	[JsonOptIn]
	public class Stronghold{
		[JsonMember]
		public float position = 0;
		[JsonMember]
		public string type = "";
		
		[JsonMember]
		public ThePosition battle = null;
		[JsonMember]
		public ThePosition bag1 = null;
		[JsonMember]
		public ThePosition bag2 = null;
		
		
		[JsonMember]
		public bool box = false;
		
		[JsonMember]
		public bool boss = false;
		
		public void print(){
			
		}
	}
	
	
	[JsonOptIn]
	public class Scene{
		[JsonMember]
		public LevelData level = null; 
		[JsonMember]
		public Hero hero = null;
		[JsonMember]
		public CrystalTech crystal = null;
		
		static public JsonData.Scene Load(string json){
			JsonData.Scene data = JsonDataHandler.reader<JsonData.Scene>(json);
			return data;
		}
		static public string Save(JsonData.Scene scene){
			string json = JsonDataHandler.write<JsonData.Scene>(scene);
			return json;
		}
	
	}
	[JsonOptIn]
	public class LevelDocInfo:DataInfo{
		[JsonMember]
		public LevelDoc doc = null;
		static public JsonData.LevelDocInfo Load(string json){
			JsonData.LevelDocInfo data = JsonDataHandler.reader<JsonData.LevelDocInfo>(json);
			return data;
		}
	}
	public class LevelDocInfoLoader:DataLoader{
		override public DataInfo load(string json){
			LevelDocInfo data = LevelDocInfo.Load(json);
			return data;
		}
		
	}

	public class SceneInfoLoader:DataLoader{
		override public DataInfo load(string json){
			SceneInfo data = SceneInfo.Load(json);
			return data;
		}
		
	}



	[JsonOptIn]
	public class SceneInfo:DataInfo{
		[JsonMember]
		public Scene scene = null;
		[JsonMember]
		public QuickMissionBag quickLevelBag = null;
		[JsonMember]
		public Player player = null;

	
		public void print(){
			Debug.LogWarning(scene);
			Debug.LogWarning(scene.hero);
			Debug.LogWarning(scene.hero.avatar);
		}
		static public JsonData.SceneInfo Load(string json){
			JsonData.SceneInfo data = JsonDataHandler.reader<JsonData.SceneInfo>(json);
			return data;
		}
	}
	

	
			
	[JsonOptIn]
	public class LevelData{
		
		[JsonMember]
		public string uuid = "";
		[JsonMember]
		public int minPower = 3;

		[JsonMember]
		public int minLv = 3;
		
		[JsonMember]
		public int minHeroLv = 3;

		[JsonMember]
		public int[] magicType = null;


		[JsonMember]
		public Stronghold[] strongholds;

		public void print(){
			for(int i = 0; i > strongholds.Length; ++i){
				strongholds[i].print();
			}
			
		}
		
		static public JsonData.LevelData Load(string json){
			JsonData.LevelData data = JsonDataHandler.reader<JsonData.LevelData>(json);
			return data;
		}
	}
	
	
	[JsonOptIn]
	public class Plant{
		[JsonMember]
		public string uuid = "";
		
		static public string Save(JsonData.Plant plant){
			string data = JsonDataHandler.write<JsonData.Plant>(plant);
			return data;
		}
			
		static public JsonData.Plant Load(string json){
			JsonData.Plant data = JsonDataHandler.reader<JsonData.Plant>(json);
			return data;
		}
		
		
	}
	
	[JsonOptIn]
	public class PlantInfo:DataInfo{
		
	
		
		[JsonMember]
		public Plant plant = null;
		[JsonMember]
		public Player player = null;

		static public JsonData.PlantInfo Load(string json){
			JsonData.PlantInfo data = JsonDataHandler.reader<JsonData.PlantInfo>(json);
			return data;
		}
	}
	
	
	[JsonOptIn]
	public class Harvest{
		[JsonMember]
		public int money = 0;
		[JsonMember]
		public float exp = 0;
		[JsonMember]
		public Soul[] drops;
		//[JsonMember]
		//public string info;
		
		[JsonMember]
		public string[] warning = null;
		[JsonMember]
		public string[] message = null;
		
		
		
		static public JsonData.Harvest Load(string json){
			JsonData.Harvest data = JsonDataHandler.reader<JsonData.Harvest>(json);
			return data;
		}
		
		
	}
	
	[JsonOptIn]
	public class HarvestInfo:DataInfo{
		[JsonMember]
		public Harvest harvest = null;
		[JsonMember]
		public Player player = null;
		[JsonMember]
		public QuickBag quickBag = null;
		[JsonMember]
		public QuickMissionBag quickLevelBag = null;
		//public QuickQuestBag quickQuestBag = null;
		
		static public JsonData.HarvestInfo Load(string json){
			JsonData.HarvestInfo data = JsonDataHandler.reader<JsonData.HarvestInfo>(json);
			return data;
		}
	}
	[JsonOptIn]
	public class PlantInfoLoader:DataLoader{
		override public DataInfo load(string json){
			PlantInfo data = PlantInfo.Load(json);
			return data;
		}

		
	}
	
	
	/*
	public class LevelInfoLoader:DataLoader{
		override public DataInfo load(string json){
			LevelInfo data = LevelInfo.Load(json);
			return data;
		}

	}
	*/
		
	public class HarvestInfoLoader:DataLoader{
		override public DataInfo load(string json){
			HarvestInfo data = HarvestInfo.Load(json);
			return data;
		}

	}
	

}