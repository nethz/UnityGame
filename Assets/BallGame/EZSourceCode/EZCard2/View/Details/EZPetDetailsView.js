#pragma strict

class EZPetDetailsView extends EZCardViewBase{
	public var _table:UITable;
	public var _topTitle:UISprite = null;
	//Left
	public var _texture:EZPetTexture;
	public var _name:UILabel;
	public var _locked:UISprite;
	public var _type:UISprite;
	public var _lv:UILabel;
	public var _exp:UILabel;
	public var _max:UISprite;
	public var _green:UISlider;
	public var _marker:EZMark;
	public var _group:UILabel;
	public var _group0:String = "";
	public var _group1:String = "";
	public var _group2:String = "";
	public var _group3:String = "";
	public var _group4:String = "";
	public var _group5:String = "";
	public var _quality:UILabel;
	public var _quality0:String = "";
	public var _quality1:String = "";
	public var _quality2:String = "";
	public var _quality3:String = "";
	//Right
	public var _button:EZLockButton;
	public var _panel:UIPanel;
	public var _hp:UILabel;
	public var _mp:UILabel;
	public var _attack:UILabel;
	public var _speed:UILabel;
	public var _upSkillTitles:UILabel[];
	public var _upMagicTitles:UILabel[];
	public var _btnAffix:GameObject;
	public var _bagOffset:GameObject = null;
	public var _bagIcon:UIPanel;
	public var _btnSort:GameObject;
	public var _downDetail:EZAffixDetails = null;

	private var _id:int = -1;
	private var limitPetLv_:boolean = false;
	
	public function show(){ 
		setEnabled(true);
		_topTitle.spriteName = "infoTop";
	}
	public function hide(){
		_texture.destroy();
		setEnabled(false);
		_id = -1;
	}
	
	public function setTechInfo(card:EZCard){
		setUpAffix(card);
		setDownDetail(card);
	}
	
	private function setUpAffix(card:EZCard){
		clearUpAffixText();
		var cardGetAffix:EZCardAffix = new EZCardAffix(card);
		var skillTitles:String[] = cardGetAffix.getUpSkill();
		if(skillTitles && _upSkillTitles){
			var m:int = skillTitles.length < _upSkillTitles.length?skillTitles.length:_upSkillTitles.length;
			for(var i:int=0; i<m; ++i){
				if(i < skillTitles.length){
					_upSkillTitles[i].text = skillTitles[i];
				}
			}
		}

		var magicTitles:String[] = cardGetAffix.getUpMagic();
		if(magicTitles && _upMagicTitles){
			var n:int = magicTitles.length < _upMagicTitles.length?magicTitles.length:_upMagicTitles.length;
			for(var j:int=0; j<n; ++j){
				if(magicTitles){
					if(j < magicTitles.length){
						_upMagicTitles[j].text = magicTitles[j];
					}
				}
			}	
		}
	}
	
	private function setDownDetail(card:EZCard){
		_downDetail.setup(card);
	}
	
	private function clearUpAffixText(){
		for(var i:int = 0;i<_upSkillTitles.length;++i){
			_upSkillTitles[i].text = "";
		}
		for(var j:int = 0;j<_upMagicTitles.length;++j){
			_upMagicTitles[j].text = "";
		}
	}
	
	public function setPetInfoTask(card:EZCard):Task{
		if(card == null){
			return new Task();
		}
		if(_id != card.id){
			var loadTask:Task = _texture.loadTask(new Geek.SoulKey(card.style, card.magicType),card.quality);
			TaskManager.PushFront(loadTask, function(){
				_marker.refresh(card.mark);
				setTechInfo(card);
				var soul:JsonData.Soul = card.soul;
				_id = card.id;
				 if(soul && soul.natureProp){
					_name.text = soul.natureProp.name;
					refreshLock(card.userLocked);
					_group.text = getGroup(soul.natureProp.group);
					_type.spriteName =soul.natureProp.type.ToLower();
					//_type.color = Geek.GetColor(Geek.GetMagicType(soul.natureProp.type),1,1);
				 }
				 if(soul && soul.baseProp){
				 	var qualityColor:Color = Geek.GetQualityColor(Geek.GetQualityType(soul.baseProp.quality),1,1);
					_texture.setMainColor(qualityColor);// gameObject.GetComponent(UITexture).color =  ;
					_quality.text = getQuality(soul.baseProp.quality);
					_quality.color = qualityColor;
					var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
					_attack.text = Mathf.FloorToInt(soul.baseProp.attack) +"";
					_hp.text = Mathf.FloorToInt(soul.baseProp.maxHealth) +"";
					_speed.text = Mathf.FloorToInt(soul.baseProp.speed) +"";
					//////////2014614
					var petLv:int = soul.baseProp.lv;
					var soulExp:float = soul.baseProp.exp;
					var barVal:float = setup.soul.getExpBar(soulExp);
					if(limitPetLv_){
						var player:JsonData.Player = EZPlayerTable.GetInstance().data;
						var playerLv:int = setup.player.getLv(player.exp);
						if(petLv >= playerLv) petLv = playerLv;
						var realLv:float = setup.soul.getLvFloat(soulExp);
						if(realLv >= playerLv){
							barVal = realLv - playerLv;
						}
						Debug.Log("<===limitPetLv_=========barVal================>" + barVal);
					}
					_lv.text = (petLv + 1).ToString();
					if(setup.soul.isMax(soulExp)){
						_max.enabled = true;
						_exp.enabled = false;
					}else{
						_exp.text = Mathf.FloorToInt(barVal *100) + "%";
						_exp.enabled = true;
						_max.enabled = false;
					}
					greenBar(barVal);
				 }
				 if(soul && soul.magicProp){
					_mp.text = Mathf.FloorToInt(soul.magicProp.maxPower) +"";
				 }
				 
				_table.repositionNow = true;
				_downDetail.rePosition();	
			});
			return loadTask;
		}else{
			var task:Task = new Task();
			task.init = function(){
				refreshLock(card.userLocked);
				_marker.refresh(card.mark);
			};
			return task;
		}
	}
	
	private function refreshLock(locked:EZCard.UserLocked){
		if(locked == EZCard.UserLocked.unlocked){
			_locked.enabled = false;
		}else{
			_locked.enabled = true;
		}
	}
	
	private function setGreen(val:float){
		_green.sliderValue = val;
	}
	
	private function greenBar(val:float){
		val = Mathf.Clamp01(val);
		if(val >  _green.sliderValue){
			var tv:GeekTweenValue = GeekTweenValue.Begin(_green.gameObject, 0.2, _green.sliderValue, val, this.gameObject, "setGreen");
			tv.method = GeekTweener.Method.easeOutExpo;
		}else{
			setGreen(val);
		}
	}
	
	public function showAffixInfo(enable:boolean){
		if(_bagIcon.enabled == enable){
			_bagIcon.enabled = !enable;
			_bagOffset.SetActive(!enable); 
			_btnSort.SetActive(!enable);
			if(enable){
				_downDetail.open();
			}else{
				_downDetail.close();
			}				
		}
	}
	
	public function setbtnSortBg(name:String){
		_btnSort.GetComponentInChildren(UISprite).spriteName = name;
	}
	
	public function switchBtnAffix(name:String){
		_btnAffix.GetComponentInChildren(UISprite).spriteName = name;
	}
	
	public function get button():EZLockButton{
		return _button;
	}
	
	private function getGroup(group:int):String{
		switch(group){
			case 0:
				return _group0;
			break;
			case 1:
				return _group1;
			break;
			case 2:
				return _group2;
			break;
			case 3:
				return _group3;
			break;
			case 4:
				return _group4;
			break;
			case 5:
				return _group5;
			break;
			default:
				return "none";
			break;
		}
	}
	
	private function getQuality(quality:int):String{
		switch(quality){
			case 0:
				return _quality0;
			break;
			case 1:
				return _quality1;
			break;
			case 2:
				return _quality2;
			break;
			case 3:
				return _quality3;
			break;
		}
	}
	
}