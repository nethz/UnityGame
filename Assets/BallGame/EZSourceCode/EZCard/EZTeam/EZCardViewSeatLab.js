#pragma strict
class EZCardViewSeatLab extends MonoBehaviour{
	
	public var _skills:UILabel[];
	//public var _skillLvs:UILabel[];
	public var _magics:UILabel[];
	//public var _magicLvs:UILabel[];
	public var _mp:UILabel;
	public var _name:UILabel;
	
	private var data_:EZCard = null;
	
	public function Start(){
	}
	
	public function empty(){
		for(var i:int = 0; i<_skills.length; ++i){
			_skills[i].enabled = false;
			//_skillLvs[i].enabled = false;
		}
		for(var j:int = 0; j<_magics.length; ++j){
			_magics[j].enabled = false;
			//_magicLvs[j].enabled = false;
		}
		_mp.enabled = false;
		_name.enabled = false;
	}
	public function setCard(data:EZCard){
		data_ = data;
	}
	public function refresh(){
		if(data_){ 
			var soul:JsonData.Soul = data_.soul;
			_mp.text = Mathf.FloorToInt(data_.mp) + "";
			_mp.enabled = true;
			_name.text = data_.name;
			_name.enabled = true;
			var cardAffix:EZCardAffix = new EZCardAffix(data_);
			var skillInfo:String[] = cardAffix.getUpSkill();
			//var skillLvs:String[] = cardAffix.getSkillLvs();
			if(skillInfo){
				for(var i:int = 0;i<_skills.length;++i){
					_skills[i].enabled = true;
					//_skillLvs[i].enabled = true;
					if(i<skillInfo.length){
						_skills[i].text = skillInfo[i];
						//_skillLvs[i].text = skillLvs[i];
					}
				}
			}
			var magicInfo:String[] = cardAffix.getUpMagic();
			//var magicLvs:String[] = cardAffix.getMagicLvs();
			if(magicInfo){
				for(var j:int = 0;j<_magics.length;++j){
					_magics[j].enabled = true;
					//_magicLvs[j].enabled = true;
					if(j<magicInfo.length){
						_magics[j].text = magicInfo[j];
						//_magicLvs[j].text = magicLvs[j];
					}
				}
			}
		}else{
			this.empty();
		}
	}
}