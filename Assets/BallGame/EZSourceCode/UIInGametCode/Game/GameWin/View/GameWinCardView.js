#pragma strict

class GameWinCardView extends MonoBehaviour{
	public var _name:UILabel;
	public var _lv:UILabel;
	public var _card:EZCardCoreView;
	public var _skills:UILabel[];
	public var _magics:UILabel[];
	
	

	
	public function setCardInfo(card:EZCard){
		_name.text = card.name;
		_lv.text = (card.lv+ 1).ToString();
		_card.setup(card);
		_card.open();
	}
	
	public function setTechInfo(card:EZCard){
		var cardGetAffix:EZCardAffix = new EZCardAffix(card);
		var skillTitles:String[] = cardGetAffix.getSkillTitles();
		for(var i:int=0; i<_skills.length; ++i){
			_skills[i].enabled = false;
			if(skillTitles){
				if(i < skillTitles.length){
					_skills[i].enabled = true;
					_skills[i].text = skillTitles[i];
				}
			}
		}	
		
		var magicTitles:String[] = cardGetAffix.getMagicTitles();
		for(var j:int=0; j<_magics.length; ++j){
			_magics[j].enabled = false;
			if(magicTitles){
				if(j < magicTitles.length){
					_magics[j].enabled = true;
					_magics[j].text = magicTitles[j];
				}
			}
		}	
	}
}