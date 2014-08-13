using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;
namespace JsonData{ 	

[JsonOptIn]
public class Ball{
	[JsonMember]
	public int group;
	[JsonMember]
	public float exp;
};

[JsonOptIn]
public class BallBag{
	[JsonMember]
	public Ball[] balls;
	public Ball getBall(int group){
		if(balls != null){
			for(int i=0; i <balls.Length; ++i ){
				Ball ball = balls[i];
				if(ball.group == group)
					return ball;
			}
		}
		return null;
	}
	public Ball random(){
		if(balls!= null && balls.Length!=0){
			Ball ball = balls[Random.Range(0, balls.Length)];	
			if(ball != null){
				return ball;		
			}
		}
		return null;
	}
	public Ball check(Ball ball){
	
		return getBall(ball.group);
	}
	
		
};

[JsonOptIn]
public class Cry{
	[JsonMember]
	public int id;
};
	
[JsonOptIn]
public class CryBag{
	[JsonMember]
	public Cry[] cries;
	[JsonMember]
	public int mp;
	[JsonMember]
	public int mpMax;
	[JsonMember]
	public int addMpMax;
	[JsonMember]
	public double resetTime;
	public Cry getCry(int id){
		if(cries != null){
			for(int i=0; i <cries.Length; ++i ){
				Cry cry  = cries[i];
				if(cry.id == id)
					return cry;
			}		
		}
		return null;	
	}
	public Cry random(){
		if(cries!= null && cries.Length!=0){
			Cry cry  = cries[Random.Range(0, cries.Length)];	
			if(cry != null){
				return cry;		
			}
		}
			
		return null;
			
	}
		
	public Cry check(Cry cry){
		Debug.Log(cry);
		return getCry(cry.id);
	}
	
};
[JsonOptIn]
public class WeixinCrystal{
	[JsonMember]
	public int type;
	[JsonMember]
	public string from;
	
	[JsonMember]
	public string key;
	
	static public JsonData.WeixinCrystal Load(string json){
		JsonData.WeixinCrystal data = JsonDataHandler.reader<JsonData.WeixinCrystal>(json);
		return data;
	}
	
	static public string Save(JsonData.WeixinCrystal data){
		string json = JsonDataHandler.write<JsonData.WeixinCrystal>(data);
		return json;
	}
}
[JsonOptIn]
public class BallSetup{
	[JsonMember]
	public int[] exp;
	[JsonMember]
	public int fragMax;
	
	public int getLv(float xp){
		int lv = 0;
		if(isMax(xp)){
			return maxLv() +1;		
		}
		if(xp <0)
			return 0;
			
		for(int i = 0; i<exp.Length; ++i){
			if(xp >= exp[i]){
				lv = i + 1;
			}else{
				break;
			}
		}
		return lv;
	}
	public bool isMax(float xp){
		if(xp >= exp[maxLv()]){
			return true;	
		}
		return false;
	}
			
	private float getNext(int lv){
		int l = lv;
		if(l < 0){
			return 0.0f;			
		}else if(l >= exp.Length){
			l = exp.Length -1;
		}
		return exp[l];
	}	
	public int maxLv(){
		return exp.Length -1;	
	}
	private float getBefore(int lv){
		int l = lv -1;
		if(l < 0){
			return 0.0f;			
		}else if(l >= exp.Length){
			l = exp.Length -1;
		}
		return exp[l]; 		
	}
		
	public float getMax(float xp){
		if(isMax(xp)){
			return 0;
		}
		int lv = getLv(xp);
		float ret = getNext(lv) - getBefore(lv);
		return ret;
	}
	
		
	public float getExp(float xp){
		Debug.Log(xp);
		if(isMax(xp)){
			return 0;
		}	
		int lv = getLv(xp);
		float ret = xp - getBefore(lv);
		return ret;
	}
	
	public float getExpBar(float xp){
		if(isMax (xp)){
			return 1;
		}	
		return getExp(xp)/getMax(xp);
		
	}
	
		

		
		
	
		
};
/*
[JsonOptIn]
public class Frag{
	[JsonMember]
	public int self = 0;
	[JsonMember]
	public int other = 0;	
		
	public int count(){
		return self + other;		
	}
}

[JsonOptIn]
public class CryFrag{
	[JsonMember]
	public Frag[] frags;
}*/
[JsonOptIn]
public class Crystal{
	
	[JsonMember]
	public Ball ball = null;
	[JsonMember]
	public Cry cry = null;
		
		
	public bool has(){
		if(ball == null || ball.group ==-1){
			return false;		
		}		
		if(cry == null || cry.id ==-1){
			return false;		
		}		
		return true;
	}
	
	static public JsonData.Crystal Load(string json){
		JsonData.Crystal data = JsonDataHandler.reader<JsonData.Crystal>(json);
		return data;
	}
	
	static public string Save(JsonData.Crystal crystal){
		string json = JsonDataHandler.write<JsonData.Crystal>(crystal);
		return json;
	}
	
};
[JsonOptIn]
public class MagicBall{
	[JsonMember]
	public BallSetup setup;
		
	[JsonMember]
	public BallBag ballBag;
	
	[JsonMember]
	public CryBag cryBag;
		
	[JsonMember]
	public int[] frags;
	
	[JsonMember]
	public int[] others;
	
	public int fragsLength(){
		return 5;
	}
	
	public int cryFragCount(int i){
			return frags[i] + others[i];
	}
	


		
	//[JsonMember]
//	public Crystal propose;
		
		

		
		
	public Ball getBall(int group){
		return ballBag.getBall(group);
	}
	public Cry getCry(int id){
		return cryBag.getCry(id);
	}
	static public JsonData.MagicBall Load(string json){
		JsonData.MagicBall data = JsonDataHandler.reader<JsonData.MagicBall>(json);
		return data;
	}
	
	static public string Save(JsonData.MagicBall magicBall){
		string data = JsonDataHandler.write<JsonData.MagicBall>(magicBall);
		return data;
	}
}
	
	

[JsonOptIn]
public class MagicBallCompInfo:DataInfo{
	[JsonMember]
	public MagicBall magicBall = null;
	//[JsonMember]
	//public QuickQuestBag quickQuestBag = null;
	

		
	
	static public JsonData.MagicBallCompInfo Load(string json){
		JsonData.MagicBallCompInfo data = JsonDataHandler.reader<JsonData.MagicBallCompInfo>(json);
		return data;
	}
	
	static public string Save(JsonData.MagicBallCompInfo magicBall){
		string data = JsonDataHandler.write<JsonData.MagicBallCompInfo>(magicBall);
		return data;
	}
	
	
		
}
	
[JsonOptIn]
public class MagicBallCompInfoLoader:DataLoader{
	override public DataInfo load(string json){
		MagicBallCompInfo data = MagicBallCompInfo.Load(json);
		return data;
	}

}
	
[JsonOptIn]
public class MagicBallInfo:DataInfo{
	[JsonMember]
	public MagicBall magicBall;
	

		
	
	static public JsonData.MagicBallInfo Load(string json){
		JsonData.MagicBallInfo data = JsonDataHandler.reader<JsonData.MagicBallInfo>(json);
		return data;
	}
	
	static public string Save(JsonData.MagicBallInfo magicBall){
		string data = JsonDataHandler.write<JsonData.MagicBallInfo>(magicBall);
		return data;
	}
	
	
		
}
	
[JsonOptIn]
public class MagicBallInfoLoader:DataLoader{
	override public DataInfo load(string json){
		MagicBallInfo data = MagicBallInfo.Load(json);
		return data;
	}

}
	
	
[JsonOptIn]
public class WeixinCrystalInfo:DataInfo{
	[JsonMember]
	public MagicBall magicBall;
	[JsonMember]
	public WeixinCrystal give;
	

		
	
	static public JsonData.WeixinCrystalInfo Load(string json){
		JsonData.WeixinCrystalInfo data = JsonDataHandler.reader<JsonData.WeixinCrystalInfo>(json);
		return data;
	}
	
	static public string Save(JsonData.WeixinCrystalInfo data){
		string json = JsonDataHandler.write<JsonData.WeixinCrystalInfo>(data);
		return json;
	}
}
[JsonOptIn]
public class WeixinCrystalInfoLoader:DataLoader{
	override public DataInfo load(string json){
		WeixinCrystalInfo data = WeixinCrystalInfo.Load(json);
		return data;
	}

}
	
	
		
[JsonOptIn]
public class WeixinReceiveInfo:DataInfo{
	[JsonMember]
	public MagicBall magicBall;
	[JsonMember]
	public string[] warning = null;
	
	static public JsonData.WeixinReceiveInfo Load(string json){
		JsonData.WeixinReceiveInfo data = JsonDataHandler.reader<JsonData.WeixinReceiveInfo>(json);
		return data;
	}
	
	static public string Save(JsonData.WeixinReceiveInfo data){
		string json = JsonDataHandler.write<JsonData.WeixinReceiveInfo>(data);
		return json;
	}
}
[JsonOptIn]
public class WeixinReceiveInfoLoader:DataLoader{
	override public DataInfo load(string json){
		WeixinReceiveInfo data = WeixinReceiveInfo.Load(json);
		return data;
	}

}
	
	
	
	
}