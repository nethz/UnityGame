#pragma strict
class EZUIInfoAffix extends MonoBehaviour{
	public var _attackObj:GameObject;
	public var _skillObj:GameObject;
	public var _magicObj:GameObject;
	public var _table:UITable;
	public var _attack:UILabel;
	public var _magic:UILabel;
	public var _skill:UILabel;

	public function setup(soul:JsonData.Soul){
		if(soul){
			_attackObj.SetActive(true);
			_skillObj.SetActive(true);
			_magicObj.SetActive(true);
			setAffixInfo(soul);
			
		}else{
			_attackObj.SetActive(false);
			_skillObj.SetActive(false);
			_magicObj.SetActive(false);
		}
		
		
		_table.repositionNow = true;
	}

	private function setAffixInfo(soul:JsonData.Soul){
		var card:EZCard = new EZCard();
		card.load(soul);
		var cardAffix:EZCardAffix = new EZCardAffix(card); 
		if(_attack){
			_attack.text = cardAffix.getBaseAttack();
		}
		if(_skill){
			_skill.text = cardAffix.getSkillAllInfo();
		}
		if(_magic){
			_magic.text = cardAffix.getMagicAllInfo();
		}
	}
}