#pragma strict
class EZCardAffix{

	//private var affixMed:String = "医疗";
	//private var affixAtt:String = "元素冲击";
	private var noOpen1:String = "(";
	private var noOpen2:String = "级开启)";
	private var gray:String = "[8f8888]";
	private var yellow:String = "[f2e850]";
	private var white:String = "[ffffff]";
	private var colorEnd:String = "[-]";
	private var LColor:String = "";
	private var RColor:String = "";
	
	private var card:EZCard = null;
	private var attackInfo:String = "";
	private var skillInfo:EZAffixInfo[] = null;
	private var magicInfo:EZAffixInfo[] = null;
	
	public function EZCardAffix(card:EZCard){
		this.card = card;
		if(card && card.attackInfo && card.attackInfo.info){
			attackInfo = card.attackInfo.info;
		}
		if(card && card.skillInfo){
			skillInfo = card.skillInfo;
		}
		if(card && card.magicInfo){
			magicInfo = card.magicInfo;
		}
	}
	
	public function getBaseAttack():String{
		return attackInfo;
	}
	
	public function getSkillTitles():String[]{
		var ret:String[] = null;
		if(skillInfo){
			ret = new String[skillInfo.length];
			for(var i:int = 0;i<skillInfo.length;++i){
				ret[i] = skillInfo[i].title;
			}
		}else{
			ret = new String[2];
		}
		return ret;
	}
	
	public function getMagicTitles():String[]{
		var ret:String[] = null;
		if(magicInfo){
			ret = new String[magicInfo.length];
			for(var i:int = 0;i<magicInfo.length;++i){
				ret[i] = magicInfo[i].title;
			}
		}else{
			ret = new String[4];
		}
		return ret;
	}
	
	public function getUpSkill():String[]{
		var ret:String[] = null;
		if(skillInfo){
			ret = new String[skillInfo.length];
			for(var i:int = 0;i<skillInfo.length;++i){
				if(card.lv < affixLimts(0,i)){
					LColor = gray;
					ret[i] = LColor + skillInfo[i].title + colorEnd;
				}else{
					if(skillInfo[i].lv >= maxAfLvByLv(card.lv,i)){
						LColor = yellow;
					}else{
						LColor = white;
					}
					ret[i] = LColor + skillInfo[i].title + " Lv" + (skillInfo[i].lv+1) + colorEnd;
				}
			}
		}else{
			ret = new String[2];
		}
		return ret;
	}
	
	public function getSkillAllInfo():String{
		var ret:String = "";
		if(skillInfo){
			for(var i:int = 0;i<skillInfo.length;++i){
				if(card.lv < affixLimts(0,i)){
					LColor = gray;
					ret += LColor + skillInfo[i].title + noOpen1 + (affixLimts(0,i) + 1) + noOpen2 + colorEnd;
				}else{
					LColor = yellow;
					if((skillInfo[i].lv) >= maxAfLvByLv(card.lv,i)){
						RColor = yellow;
					}else{
						RColor = white;
					}
					ret += LColor + skillInfo[i].title + colorEnd + RColor + "(Lv" + (skillInfo[i].lv +1) + ",Max" + (maxAfLvByLv(card.lv,i)+1) + ")" + colorEnd;
				}
				ret += "\n";
				ret += skillInfo[i].info;
				if(i < skillInfo.length-1){
					ret += "\n\n";
				}
			}
		}
		return ret;
	}
	
	public function getUpMagic():String[]{
		var ret:String[] = null;
		if(magicInfo){
			ret = new String[magicInfo.length];
			for(var i:int = 0;i<magicInfo.length;++i){
				if(card.lv < affixLimts(0,i+2)){
					LColor = gray;
					ret[i] = LColor + magicInfo[i].title + colorEnd;
				}else{
					if((magicInfo[i].lv) >= maxAfLvByLv(card.lv,i+2)){
						LColor = yellow;
					}else{
						LColor = white;
					}
					var magicTitle:String = magicInfo[i].title;
					if(i == 0){
						ret[i] = yellow + magicTitle + colorEnd;
					}else{
						ret[i] = LColor + magicTitle + " Lv" + (magicInfo[i].lv+1) + colorEnd;
					}
				}
			}
		}else{
			ret = new String[4];
		}
		return ret;
	}
	
	public function getMagicAllInfo():String{
		var ret:String = "";
		if(magicInfo){
			for(var i:int = 0;i<magicInfo.length;++i){
				var magicTitle:String = magicInfo[i].title;
				if(card.lv < affixLimts(0,i+2)){
					LColor = gray;
					ret += LColor + magicTitle + noOpen1 + (affixLimts(0,i+2)+1) + noOpen2 + colorEnd;
				}else{
					LColor = yellow;
					if(magicInfo[i].lv  >= maxAfLvByLv(card.lv,i+2)){
						RColor = yellow;
					}else{
						RColor = white;
					}
					//if(magicTitle == affixMed||magicTitle == affixAtt){
					if(i == 0){
						ret += yellow + magicTitle + colorEnd;
					}else{
						ret += LColor + magicTitle + colorEnd + RColor + "(Lv" + (magicInfo[i].lv+1) + ",Max" + (maxAfLvByLv(card.lv,i+2)+1) + ")" + colorEnd;
					}
				}
				ret += "\n";
				ret += magicInfo[i].info;
				if(i < magicInfo.length-1){
					ret += "\n\n";
				}
			}
		}
		return ret;
	}
	
	private function maxAfLvByLv(lv:int, index:int):int{
	
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		return setup.affix.getAffixMaxLv(index, lv);
		
			
	}
	
	//two-dimensional array
	private function affixLimts(x:int, y:int):int{
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		return setup.affix.getOpen(y, x);
	}

}