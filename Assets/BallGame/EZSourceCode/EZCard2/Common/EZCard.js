#pragma strict

class EZCard{
	public enum Mark{
		Circle,
		Diamond,
		X, 
		Triangle,
		Star,
		No,
	}
	public enum UserLocked{
		locked,
		unlocked,
	}
	private var magic_:EZAffixInfo[] = null;
	private var skill_:EZAffixInfo[] = null;
	private var attack_:EZAffixInfo = null;
	private var soul_:JsonData.Soul = null;
	private var id_:int = -1;
	private var ver_:int = -1;
	private var seat_:EZSoul.Seat = EZSoul.Seat.None;
	private var mark_:EZCard.Mark = EZCard.Mark.No;
	private var userLocked_:UserLocked = UserLocked.unlocked;
	private var core_:EZCardCoreData = null;
	
	public function getAffix(affix:int):EZAffixInfo{
		if(affix == JsonData.SetupAffixData.Affix.Skill0){
			return skill_[0];
		}
		if(affix == JsonData.SetupAffixData.Affix.Skill1){
			return skill_[1];
		}
		if(affix == JsonData.SetupAffixData.Affix.Magic0){
			return magic_[0];
		}
		if(affix == JsonData.SetupAffixData.Affix.Magic1){
			return magic_[1];
		}
		if(affix == JsonData.SetupAffixData.Affix.Magic2){
			return magic_[2];
		}
		if(affix == JsonData.SetupAffixData.Affix.Magic3){
			return magic_[3];
		}
		
		return null;
	}
	
	public function get locked():boolean{
		return (soul_ == null);
	}
	public function get core():EZCardCoreData{
		var core:EZCardCoreData = new EZCardCoreData();
		core.quality = quality;
		core.magicType = magicType;
		core.style = style;
		return core;
	}
	
	public function get magicInfo():EZAffixInfo[]{
		return magic_;
	}
	
	public function get attackInfo():EZAffixInfo{
		return attack_;
	}
	public function get skillInfo():EZAffixInfo[]{
		return skill_;
	}
	public function get soul():JsonData.Soul{
		return soul_;
	}
	public function get quality():Geek.Quality{//
		if(soul_){
			return soul_.baseProp.quality;
		}
		return 0;
	}
	
	public function get mark():EZCard.Mark{
		return mark_;
	}

	public function set mark(value:EZCard.Mark){
		mark_ = value;
		PlayerPrefs.SetInt("card_mark_"+this.id_, mark_);
		PlayerPrefs.Save();
	}
	public function unsetMark(){
		if(PlayerPrefs.HasKey("card_mark_"+this.id_)){
			PlayerPrefs.DeleteKey("card_mark_"+this.id_);
			PlayerPrefs.Save();
		}
	}
	
	public function get userLocked():UserLocked{
		return userLocked_;
	}
	
	public function set userLocked(value:UserLocked){
		userLocked_ = value;
		PlayerPrefs.SetInt("card_userLocked_"+this.id_, userLocked_);
		PlayerPrefs.Save();
	}
	
	public function get mp():float{
		return soul_.magicProp.maxPower;
	}
	public function get seat():EZSoul.Seat{
		return seat_;
	}
	
	public function set seat(value:EZSoul.Seat){
		seat_ = value;
		
	}
	public function get style():String{
		if(soul_ && soul_.natureProp){
			return soul_.natureProp.style;
		}
		return "none";
	}
	
	public function get name():String{
		
		if(soul_ && soul_.natureProp){
			return soul_.natureProp.name;
		}
		return "none";
	
	}
	public function get group():int{
		
		if(soul_ && soul_.natureProp){
			return soul_.natureProp.group;
		}
		return 0;
	
	}
	private var share_:JsonData.Share = null;
	/*public function getAffixInfo(affix:int):EZAffixDBInfoBase{
		var ai:EZAffixInfo = getAffix(affix);
		if(ai){
			return EZAffixDB.GetInstance().getInfo(ai.mark);
		}
	
		return null;
	
	}*/
	public function get share():JsonData.Share{
		if(share_ ==  null){
			share_ = new JsonData.Share();
			share_.name = EZTranscoding.Gb2312Big5(this.name);
			
			var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
			share_.bar = setup.soul.getExpBar(this.exp);
			share_.attack = this.attack;
			share_.speed = this.speed;
			share_.group = this.group;
			
			
			share_.style = this.style;
			share_.magic = this.magicType;
			share_.mp = this.mp;
			share_.health = this.maxHealth;
			share_.quality = this.quality;
			share_.lv = this.lv;
			share_.t = new String[6];
			share_.tm = new String[6];
			share_.tv = new int[6];
			for(var i:int = 0; i<6; ++i){
				var ai:EZAffixInfo = getAffix(i);
				share_.tv[i] = ai.lv;
				share_.t[i] = EZTranscoding.Gb2312Big5(ai.title);
				share_.tm[i] = EZTranscoding.Gb2312Big5(ai.info);
			}
		}
		return share_;
	}
	public function get exp():float{
		
		if(soul_ && soul_.baseProp){
			return soul_.baseProp.exp;
		}
		return 0;
	}
	public function get type():String{//
		
		if(soul_ ){
			return soul_.type;
		}
		return null;
	}
	
	public function get magicType():Geek.MagicType{//
		
		if(soul_ && soul_.natureProp){
			return Geek.GetMagicType(soul_.natureProp.type);
		}
		return Geek.MagicType.None;
	}
	
	public function get attack():float{
		if(soul_ && soul_.baseProp){
			return soul_.baseProp.attack;
		}
		return 0;
	}
	
	public function get maxHealth():float{
		
		if(soul_ && soul_.baseProp){
			return soul_.baseProp.maxHealth;
		}
		return 0;
	
	}
	
	public function get speed():float{
		
		if(soul_ && soul_.baseProp){
			return soul_.baseProp.speed;
		}
		return 0;
	
	}
	
	public function get id():int{
		return id_;
	}
	
	public function get ver():int{
		return ver_;
	}
	
	public function get lv():int{
		
		if(soul_ && soul_.baseProp){
			return soul_.baseProp.lv;
		}
		return 0;
	}

	public function load(soul:JsonData.Soul){
		if(soul.magicProp.tech && soul.magicProp.tech.affixes){
			magic_ = EZAffixDB.GetInstance().createInfos(soul, soul.magicProp.tech);
		}
		if(soul.skillProp.tech && soul.skillProp.tech.affixes){
			
			var temp:EZAffixInfo[] = EZAffixDB.GetInstance().createInfos(soul, soul.skillProp.tech);
			attack_ = temp[0];
			if(soul.skillProp.tech.affixes.length > 1){
				skill_ = new EZAffixInfo[soul.skillProp.tech.affixes.length - 1];
				for(var i:int =0; i< skill_.length; ++i){
					if(i+1<temp.length){
						skill_[i] = temp[i+1];
					}
				}
			
			}
		}
		soul_ = soul;
		loadId(soul_.id, soul_.ver);
		
	}
	
	private function string2Seat(str:String){
		var ret:EZSoul.Seat = EZSoul.Seat.None;
		switch(str){
		case "battle":
			ret = EZSoul.Seat.WeBattle;
		break;
		case "bag1":
			ret = EZSoul.Seat.WeBag1;
		break;
		case "bag2":
			ret = EZSoul.Seat.WeBag2;
		break;
		}
		return ret;
	
	}
	
	public function loadId(id:int, ver:int){
		this.id_ = id;
		this.ver_ =ver;
		this.seat_ = EZSoul.Seat.None;
		var team:JsonData.Team = EZTeamTable.GetInstance().data;
		if(team){
			if(team.battle == this.id_){
				this.seat_ = EZSoul.Seat.WeBattle;
			}else if(team.bag1 == this.id_){
				this.seat_ = EZSoul.Seat.WeBag1;
			}else if(team.bag2 == this.id_){
				this.seat_ = EZSoul.Seat.WeBag2;
			}
		}
		if(PlayerPrefs.HasKey("card_mark_"+id)){
			this.mark_ = PlayerPrefs.GetInt("card_mark_"+id);
		}
		if(PlayerPrefs.HasKey("card_userLocked_"+id)){
			this.userLocked_ = PlayerPrefs.GetInt("card_userLocked_"+id);
		}
	}
	
	public function load(data:JsonData.Card){
		
		loadId(data.id, data.ver);
	
	}
}