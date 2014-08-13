#pragma strict

class EZCardCompMainView extends MonoBehaviour{
	
	public var _texture:EZPetTexture;
	public var _mainPetName:UILabel;
	public var _mainPetType:UISprite;
//	public var _mainPetTexture:UITexture;	
	public var _mainPetLv:UILabel;
	public var _group:UILabel = null;
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
	
	private var _data:EZCard = null;
	public function refresh(){
		
	}

	public function show(){
	
	}
	public function hide(){
		
		_texture.destroy();
	}
	public function get exp():float{
		if(_data){
			return _data.soul.baseProp.exp;
		}
		return 0.0f;
	}
	
	public function get lv():int{
		if(_data){
			return _data.soul.baseProp.lv;
		}
		return 0;
	}
	
	public function setMainLv(val:int,color:Color){
		_mainPetLv.color = color;
		_mainPetLv.text = val + "";
	}
	
	public function setCard(card:EZCard, die:boolean){
		if(card && _data != card){
			if(_data && _data.id == card.id && _data.ver == card.ver){
			}else{
				_data = card;
				TaskManager.Run(_texture.loadTask(new Geek.SoulKey(card.style, card.magicType), card.quality));
				showMainPro(true);
				_mainPetName.text = card.name; 
				_mainPetType.color = Geek.GetColor(card.magicType,255,1); 
				_texture.setMainColor(Geek.GetQualityColor(card.quality,255,1));
				_texture.sideAlphaFade(true);
				_mainPetLv.text =(card.lv + 1).ToString();
				_group.text = getGroup(card.soul.natureProp.group);
				_quality.text = getQuality(card.quality);
				_quality.color = Geek.GetQualityColor(card.quality,255,1);
			}
		}else if(!card){
			_data = null;
			if(die){
				TaskManager.Run(clearTask());
				_texture.sideAlphaFade(false);
			}else{
				showMainPro(false);
				_texture.destroy();
			}
			
		}
	}
	
	public function clearTask():Task{
		
		showMainPro(false);
		var task:Task = new Task();
		task.init = function(){
			var pet:EZPet = _texture.pet;
			if(pet){
				pet.setAlpha(0.0f);
			}
		};
		
		
		return task;
	}

	public function showMainPro(value:boolean){
		_mainPetType.enabled = value;
		_mainPetType.color.a = 1f;
		_mainPetName.enabled = value;
		_mainPetLv.enabled = value;
		_group.enabled = value;
		_quality.enabled = value;
	}
	public function clearMainPro(){
		_mainPetType.color.a = 0f;
		_mainPetName.text = "";
		_mainPetLv.text = "";
		_group.text = "";
		_quality.text = "";
	}
	public function empty():boolean{
		return (_data == null);
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