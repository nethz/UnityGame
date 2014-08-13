#pragma strict

class EZEggCardView extends MonoBehaviour{
	public var _core:EZCardCoreView = null;
	public var _name:UILabel = null;
	public var _lv:UILabel = null;
	public var _skills:UILabel[];
	public var _magics:UILabel[];
	public var _otherLabels:UILabel[];
	public var _bg:UISprite = null;
	
	private var isShowCard_:boolean = false;
	private var isShowInfo_:boolean = false;
	
	public function Awake(){
		//infoEnabled = false;
		//_core.close();
	}
	
	public function setup(card:EZCard){
		_core.setup(card);
		setInfo(card);
//Test Code......
		//var core:EZCardCoreData = new EZCardCoreData();
		//core.quality = Geek.Quality.Iron;
		//core.magicType = Geek.MagicType.Wood;
		//core.style = "dwarves1";
		//_core.setupCore(core);
//Test Code......
	}
	
	public function set showCard(value:boolean){
		if(isShowCard_ != value){
			isShowCard_ = value;
			refresh();	
		}
	}
	
	public function set showInfo(value:boolean){
		if(isShowInfo_ != value){
			isShowInfo_ = value;
			refresh();
		}

	}
	
	private function refresh(){
		if(isShowCard_){
			_core.open();
		}
		if(isShowInfo_){
			infoEnabled = true;
		}
	}
	
	private function setInfo(card:EZCard){
		_name.text = card.name;
		_lv.color = Geek.GetQualityColor(card.quality, 1, 1);	
		_lv.text = (card.lv+1) + "";
		
		var cardGetAffix:EZCardAffix = new EZCardAffix(card);
		
		var skillTitles:String[] = cardGetAffix.getSkillTitles();
		var magicTitles:String[] = cardGetAffix.getMagicTitles();
		if(skillTitles){
			for(var i:int = 0;i<skillTitles.length;++i){
				if(i < 2){
					_skills[i].text = skillTitles[i];
				}else{
					Debug.LogWarning("card's skill num is more than two!!!");
				}
				
			}
		}
		if(magicTitles){
			for(var j:int = 0;j<magicTitles.length;++j){
				if(j < 4){
					_magics[j].text = magicTitles[j];
				}else{
					Debug.LogWarning("card's magic num is more than four!!!");
				}
			}
		}
		
	}
	
	private function set infoEnabled(value:boolean){
		_bg.enabled = value;
		_bg.gameObject.GetComponent(BoxCollider).enabled = value;
		for(var i:int = 0;i<_skills.length;++i){
			_skills[i].enabled = value;
		}
		for(var j:int = 0;j<_magics.length;++j){
			_magics[j].enabled = value;
		}
		for(var k:int = 0;k<_otherLabels.length;++k){
			_otherLabels[k].enabled = value;
		}
	}
}