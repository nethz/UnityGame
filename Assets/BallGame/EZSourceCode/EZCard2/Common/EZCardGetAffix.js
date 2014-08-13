#pragma strict
class EZCardGetAffix{
/**
this code is old

*/
	private var affixMed:String = "医疗";
	private var affixAtt:String = "元素冲击";
	//private var titleUpColor:String = "[ffffff]";
	//private var titleDownColor:String = "[ffffff]";
	private var titleColor:String = "[ffffff]";
	private var lvColor:String = "[ffffff]";
	private var gray:String = "[8f8888]";
	private var yellow:String = "[f2e850]";
	private var white:String = "[ffffff]";
	private var colorEnd:String = "[-]";
	private var titleLv = "";
	private var titleMax = "";
	/*private var affixLimts = [
	[10,24,4,6,16,34],
	[14,32,-1,8,22,40],
	[20,38,-1,12,30,46],
	[28,44,-1,18,36,48],
	[-1,-1,-1,26,42,50]
	];*/
	public function affixLimts(x:int, y:int):int{
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		return setup.affix.getOpen(y, x);
	}
	private var card:EZCard = null;
	private var isInitSkill:boolean = false;
	private var isInitMagic:boolean = false;
	private var baseAttack:String = "";
	
	private var skillTitles:String[];
	private var skillInfos:String[];//
	private var skillLvs:String[];
	private var skillLvMaxs:String[];
	private var skillAllInfo:String = "";
	
	private var magicTitles:String[];
	private var magicInfos:String[];//
	private var magicLvs:String[];
	private var magicLvMaxs:String[];
	private var magicAllInfo:String = "";
	
	public function EZCardGetAffix(card:EZCard){
		this.card = card;
		this.isInitSkill = false;
		this.isInitMagic = false;
	}
	
	private function initSkill(){
		if(!isInitSkill){
			var skillInfo:EZAffixInfo[] = card.skillInfo;
			if(skillInfo){
				skillTitles =new String[skillInfo.length];
				skillLvs =new String[skillInfo.length];
				skillLvMaxs =new String[skillInfo.length];
				skillInfos = new String[skillInfo.length];
				for(var i:int = 0;i<skillInfo.length;++i){
					if(card.lv < affixLimts(0,i)){
						titleColor = gray;//
						lvColor = gray; 
					}else{
						if(skillInfo[i].lv >= maxAfLvByLv(card.lv,i)){
							lvColor = yellow;
						}else{
							lvColor = white;
						}
						titleColor = yellow;//
					}
					skillTitles[i] = lvColor+ skillInfo[i].title + colorEnd;//
					if(lvColor == gray){
						skillLvs[i] = "";
						skillLvMaxs[i] = lvColor + "(未开启" + ")" + colorEnd;
					}else{
						skillLvs[i] = lvColor + "Lv" +(skillInfo[i].lv +1) +colorEnd;
						//skillLvMaxs[i] = lvColor + "(Lv"+ (skillInfo[i].lv) +".Max" + skillInfo[i].maxLv + ")" + colorEnd;
						skillLvMaxs[i] = lvColor + "(Lv"+ (skillInfo[i].lv +1) +".Max" + (maxAfLvByLv(card.lv,i)+1) + ")" + colorEnd;
					}
					skillInfos[i] = skillInfo[i].info;//
					//skillAllInfo += titleColor+skillInfo[i].title;//
					//skillAllInfo += "(Lv"+ (skillInfo[i].lv) +".Max" + skillInfo[i].maxLv + ")";
					//skillAllInfo += colorEnd + "\n";
					skillAllInfo += skillTitles[i] + skillLvs[i] + skillLvMaxs[i];
					skillAllInfo += "\n";
					skillAllInfo += skillInfo[i].info;
					if(i < skillInfo.length-1){
						skillAllInfo += "\n\n";
					}
				}
			}
			
		}
		isInitSkill = true;
	}
	
	private function initMagic(){
		if(!isInitMagic){
			var magicInfo:EZAffixInfo[] = card.magicInfo;
			if(magicInfo){
				magicTitles = new String[magicInfo.length];
				magicLvs = new String[magicInfo.length];
				magicLvMaxs = new String[magicInfo.length];
				magicInfos =new String[magicInfo.length];
				
				for(var i:int = 0;i<magicInfo.length;++i){
					if(card.lv < affixLimts(0,i+2)){
						titleColor = gray;//
						lvColor = gray; 
					}else{
						if(magicInfo[i].lv >= maxAfLvByLv(card.lv,i+2)){
							lvColor = yellow;
						}else{
							lvColor = white;
						}
						titleColor = yellow;//
					}
					var magicTemp = magicInfo[i].title;
					if(magicTemp == affixMed||magicTemp == affixAtt){
						titleLv = "";
						titleMax = "";
					}else{
						titleLv = "Lv" +(magicInfo[i].lv +1);
						//titleMax = "(Lv"+ (magicInfo[i].lv) +".Max" + magicInfo[i].maxLv + ")";
						titleMax = "(Lv"+ (magicInfo[i].lv +1) +".Max" + (maxAfLvByLv(card.lv,i+2)+1) + ")";
					}
					magicTitles[i] = lvColor + magicTemp + colorEnd;//
					
					if(lvColor == gray){
						magicLvs[i] = "";
						magicLvMaxs[i] = lvColor + "(未开启)" + colorEnd;
					}else{
						magicLvs[i] = lvColor + titleLv +colorEnd;
						magicLvMaxs[i] = lvColor + titleMax + colorEnd;
					}
						
					magicInfos[i] = magicInfo[i].info;//
					//magicAllInfo += titleColor+magicInfo[i].title;//
					//magicAllInfo += titleMax;
					//magicAllInfo += colorEnd + "\n";
					magicAllInfo += magicTitles[i] + magicLvs[i] + magicLvMaxs[i];
					magicAllInfo += "\n";
					magicAllInfo += magicInfo[i].info;
					if(i < magicInfo.length-1){
						magicAllInfo += "\n\n";
					}
				}
			}
			
		}
		isInitMagic = true;
	}
	
	public function getBaseAttack():String{
		if(card && card.attackInfo && card.attackInfo.info){
			return  card.attackInfo.info;
		} 
		return "";
	}

	public function getSkillTitles():String[]{
		initSkill();
		return skillTitles;
		
	}
	
	public function getSkillLvs():String[]{
		initSkill();
		return skillLvs;
		
	}
	
	public function getSkillLvMaxs():String[]{
		initSkill();
		return skillLvMaxs;
		
	}
	
	public function getSkillInfos():String[]{
		initSkill();
		return skillInfos;
	}
	
	public function getSkillAllInfo():String{
		initSkill();
		return skillAllInfo;
	}
	
	public function getMagicTitles():String[]{
		initMagic();
		return magicTitles;
	}
	
	public function getMagicLvs():String[]{
		initSkill();
		return magicLvs;
		
	}
	
	public function getMagicLvMaxs():String[]{
		initSkill();
		return magicLvMaxs;
		
	}
	
	public function getMagicInfos():String[]{
		initMagic();
		return magicInfos;
	}
	
	public function getMagicAllInfo():String{
		initMagic();
		return magicAllInfo;
	}
	
	private function maxAfLvByLv(lv:int, index:int):int{
	
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		return setup.affix.getAffixMaxLv(index, lv);
	
	}
	
	/*
	//get affix's maxLv by pet lv and affix's index
	//根据卡牌级别和词缀的位置计算出当前词缀的最高级别
	private function maxAfLvByLvI(lv:int,index:int):int{
		for(var i:int = 0;i < 5; ++i){
			if(parseInt(affixLimts(i,index)) == -1){
				if(i == 4){
					return 4;
				}
				return 1;
			}else if(lv < parseInt(affixLimts(i,index))){
				return i;
			}
		}
		return 5;
	}
*/
}
/*
	[10,24,4,6,16,34],
	[14,32,-1,8,22,40],
	[20,38,-1,12,30,46],
	[28,44,-1,18,36,48],
	[-1,-1,-1,26,42,50]
*/