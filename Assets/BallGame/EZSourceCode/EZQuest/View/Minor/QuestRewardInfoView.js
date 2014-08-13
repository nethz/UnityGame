#pragma strict

class QuestRewardInfoView extends MonoBehaviour{
	public var _award:EZAward;
	public var _bg:UISprite;
	public var _count:int = 0;
	public var _open:boolean = false;
	public function get award():EZAward{
		return _award;
	}
	public function showAward(){
		_open = true;
		refresh();
		//_award.gameObject.SetActive(true);
	}
	public function hideAward(){
		
		_open = false;
		refresh();
	}
	public function refresh(){
		if(_open){
			if(_count != 0){
				_award.gameObject.SetActive(true);
			}else{
				_award.gameObject.SetActive(false);
			}
		}else{
			_award.gameObject.SetActive(false);
		}
		
	}
	
	
	

	function setup(award:JsonData.Award){
		_count = _award.setup(award);
		_bg.transform.localScale.y = 80 + 60 * _count;
		refresh();
		
	}
	
	
}