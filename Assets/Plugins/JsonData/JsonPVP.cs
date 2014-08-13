using UnityEngine;
using System.Collections;

using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;



namespace JsonData
{
	[JsonOptIn]
	public class PVPActionSwap{
		[JsonMember]
		int target = 1;
	}
	public class PVPActionCrystal{

	}
	public class PVPActionMagic{
		[JsonMember]
		int target = 1;

	}
	public class PVPActionAttack{
		[JsonMember]
		int metal = 0;
		[JsonMember]
		int wood = 0;
		[JsonMember]
		int water = 0;
		[JsonMember]
		int fire = 0;
		[JsonMember]
		int earth = 0;

	}
	[JsonOptIn]
	public class PVPAction{
		[JsonMember]
		PVPActionSwap swap = null;
		[JsonMember]
		PVPActionAttack atk = null;
		[JsonMember]
		PVPActionMagic mic = null;
		[JsonMember]
		PVPActionCrystal cry = null;

		static public JsonData.PVPAction Load(string json){
			JsonData.PVPAction data = JsonDataHandler.reader<JsonData.PVPAction>(json);
			return data;
		}
		
		static public string Save(JsonData.PVPAction data){
			string json = JsonDataHandler.write<JsonData.PVPAction>(data);
			return json;
		}

	}
	

}