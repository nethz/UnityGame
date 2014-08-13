using UnityEngine;
using System.Collections;
using Pathfinding.Serialization.JsonFx;


namespace JsonData
{
[JsonOptIn]
public class SetupSoulData{
	[JsonMember]
	public int sell_base;
	[JsonMember]
	public int money;
	[JsonMember]
	public float[] sell_quality;
	[JsonMember]
	public int[] exp;
	[JsonMember]
	public int[] compMoney;
	public int getXpMoney(int xp){
		return this.getLvMoney(this.getLv(xp));	
	}
	
	public int getLvMoney(int lv){
		if(lv<0)
			return 0;
		int count = this.compMoney.Length;
		if(count == 0){
			return 0;	
		}
		if(lv >= this.compMoney.Length){
			return this.compMoney[this.compMoney.Length-1];
		}
		return this.compMoney[lv];
	}


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
	public float getLvFloat(float xp){
		return (getLv (xp) + getExpBar(xp));
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
	
	
}

[JsonOptIn]
public class SetupPlayerData{
	
	[JsonMember]
	public int[] exp;
	
	[JsonMember]
	public int[] bagLimit = null;
	public int getXpBagLimit(int xp){
		return this.getLvBagLimit(this.getLv(xp));	
	}
	
	public int getLvBagLimit(int lv){
		if(lv<0)
			return 0;
		int count = this.bagLimit.Length;
		if(count == 0){
			return 0;	
		}
		if(lv >= this.bagLimit.Length){
			return this.bagLimit[this.bagLimit.Length-1];
		}
		return this.bagLimit[lv];
	}
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
	
}
[JsonOptIn]
public class SetupGame{
	[JsonMember]
	public int draw_money = 100;
		
	[JsonMember]
	public int draw_diamond = 1;
		
	[JsonMember]
	public int revive_diamond = 5;
		
	[JsonMember]
	public bool weixin = true;
	
	[JsonMember]
	public bool share = true;
		
	[JsonMember]
	public int gold_max = 10;
		
	[JsonMember]
	public int silver_max = 10;
		
	[JsonMember]
	public int cuprum_max = 10;
		
	[JsonMember]
	public int ap_diamond = 5;
		
}
[JsonOptIn]
public class SetupServer{
	[JsonMember]
	public string release = "http://ezgame.vipsinaapp.com/server/";
	[JsonMember]
	public string debug = "http://ezgame.vipsinaapp.com/server/";
	
}
[JsonOptIn]
public class SellBagSetup{
	public int diamond = -1;
	public int[] money = null;
	public int getDiamond(){
		return diamond;
	}
	public int getMoney(int bagMax){
		if(money != null && bagMax <= money.Length) {
			return money[bagMax];			
		}
		return 9999999;
	}
}	
[JsonOptIn]
public class SetupShop{
		
	[JsonMember]
	public int version = -1;
	[JsonMember]
	public SellBagSetup sellBag;
	[JsonMember]
	public string[] products;

}
[JsonOptIn]
public class SetupAffixData{
		
	public enum Affix{
		Skill0 = 0,
		Skill1 = 1,
		Magic0 = 2,
		Magic1 = 3,
		Magic2 = 4,
		Magic3 = 5,
		
	}
	
		
	[JsonMember]
	public float foundation;
	[JsonMember]
	public float weaken;
	[JsonMember]
	public int[][] open;
		
	public int getOpen(int affix, int affixLv){
		return 	open[affix][affixLv];
	}
	public int getAffixMaxLv(int affix, int monsterLv){
		
		int[] a = open[affix];	
		int lv = -1;
		for(int i =0; i < a.Length; ++i){
			if(monsterLv < a[i]){
					break;
			}
			lv++;
		}
		return lv;
	}
	public int magic(int monsterLv){
		int ret = 0;
		if(monsterLv >= open[5][0]){
			ret = 4;		
		}else if(monsterLv >= open[4][0]){
			ret = 3;		
		}else if(monsterLv >= open[3][0]){
			ret = 2;		
		}else if(monsterLv >= open[2][0]){
			ret = 1;		
		}
		return ret;
	}
		
	
	public int skill(int monsterLv){
		int ret = 1;
		if(monsterLv >= open[1][0]){
			ret = 3;		
		}else if(monsterLv >= open[0][0]){
			ret = 2;		
		}
		return ret;
	}
}

[JsonOptIn]
public class Setup{

	
	[JsonMember]
	public SetupSoulData soul;
	
	[JsonMember]
	public SetupAffixData affix;
	
	[JsonMember]
	public SetupPlayerData player;
	
	[JsonMember]
	public SetupGame game;
		
	[JsonMember]
	public SetupServer server;

	[JsonMember]
	public SetupShop shop;


	
	static public Setup Load(string json){
		Setup data = JsonDataHandler.reader<Setup>(json);
		return data;
	}	
	
	static public string Save(Setup setup){
		string data = JsonDataHandler.write<Setup>(setup);
		return data;
	}
	
}
	
[JsonOptIn]
public class SetupInfo:DataInfo{
		
	[JsonMember]
	public Setup setup;
		
		
	static public SetupInfo Load(string json){
		SetupInfo data = JsonDataHandler.reader<SetupInfo>(json);
		return data;
	}	
	
	static public string Save(SetupInfo setup){
		string data = JsonDataHandler.write<SetupInfo>(setup);
		return data;
	}
}
	
	
public class SetupInfoLoader:DataLoader{
	override public DataInfo load(string json){
		SetupInfo data = SetupInfo.Load(json);
		return data;
	}

}
}