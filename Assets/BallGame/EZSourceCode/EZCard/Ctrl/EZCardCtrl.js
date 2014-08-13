#pragma strict

class EZCardCtrl extends MonoBehaviour{

	public enum State{
		Comp,
		Info,
		Team,
		Sell,
		None,
	};
	
	public function stirng2State(str:String):State{
		if(str == ""){
			return State.None;
		}else if(str == "info"){
			return State.Info;
		}else if(str == "comp"){
			return State.Comp;
		}else if(str == "sell"){
			return State.Sell;
		}else if(str == "team"){
			return State.Team;
		}else{
			return State.None;
		}
	}
	//public var _guide:EZCardGuide = null;
	//public function get guide():EZCardGuide{
	//	return _guide;
	//}
	public var _subscriptKey:String ="pet";
	public var _level:int = 1;
	public class SellText{
		public var _begin:String;
		public var _end:String;
		function text(money:int):String{
			return _begin + money.ToString() + _end;
		}
		
		
		public var ok:String;
		public var cancel:String;
		public var window:String;
		
	}
	
	public var _sellText:SellText;
	public class WindowText{
		public var text:String = "";
		public var ok:String = "";
		public var cancel:String = "";
	}
	public var _sellOnlyOne:WindowText;
	public var _compOnlyOne:WindowText;
	
	public class CompText{
		public var _expBegin:String;
		public var _expEnd:String;
		public var _affixBegin:String;
		public var _affixEnd:String;
		public var _maxBegin:String;
		public var _maxEnd:String;
		public var _newSkill:String;
		public var _newMagic:String; 
		public var _fullLv:String; 
		function affix(title:String, max:boolean){
			if(max){
				return _affixBegin+title+_affixEnd;
			
			}else{
				 
				return _maxBegin+title+_maxEnd;
			}
		
		}
		
		function newSkill():String{
			return _newSkill;
		} 
		function fullLv():String{
			return _fullLv;
		
		}
		function newMagic():String{
			return _newMagic;
		}
		function exp(exp:float):String{
			return _expBegin + exp.ToString() + _expEnd;
		}
		public var _lvBegin:String;
		public var _lvEnd:String;
		function lv(lv:int):String{
			return _lvBegin + lv.ToString() + _lvEnd;
		}
		
		
	}
	
	
	public var _compText:CompText;
	
	
	public class CompBeforeText{
		public var _hasGoodCard:String;
		public var _lvLimit:String;
		public var _two:String;
		public var _ok:String;
		public var _cancel:String;
		function text(hasGood:boolean,lvLimit:boolean):String{
			if(hasGood&&!lvLimit){
				return _hasGoodCard;
			}else if(!hasGood&&lvLimit){
				return _lvLimit;
			}
			return _two;
		}
	}
	
	public var _compBeforeText:CompBeforeText;
	
	public class ShareText{
		public var _ok:String;
		public var _cancel:String;
		public var _text:String;
	}
	
	public var _shareText:ShareText;
	
	
	public class WeixinText{
		public var _titleBegin:String;
		public var _titleEnd:String;
		public var _description:String;
		public var _info:String;
		public var _url:String;
		
		
	}
	public var _weixinText:WeixinText;
	private var part_:EZCardPartCtrl = null;
	private var comp_:EZPetCompCtrl = null;
	private var sell_:EZPetSellCtrl = null;
	private var info_:EZCardInfoCtrl = null;
	private var team_:EZCardTeamCtrl = null;
	private var state_:State = State.None;
	public var _view:EZPetView;
	public var _model:EZPetModel;
	
	public var _inputSwitch:EZUIInputSwitch;
	
	public function inputOpen(){
		_inputSwitch.open();
	}
	public function inputClose(){
		_inputSwitch.close();
	}
	public function Awake(){
		comp_ = new EZPetCompCtrl(_model, _view);
		sell_ = new EZPetSellCtrl(_model, _view);
		info_ = new EZCardInfoCtrl(_model, _view);
		team_ = new EZCardTeamCtrl(_model, _view);
	}
	public function Start(){
		comp_.close();
		sell_.close();
		info_.close();
		team_.close();
	}
	public function compGuideOver(){
		_view.comp.overGuide();
	}
	public function teamGuideOver(){
		_view.team.overGuide();
	}
	public function guideOver(){
		compGuideOver();
		teamGuideOver();
	}
	public function shareTask():EZWindowTask{
		var share:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		share.text = _shareText._text;
		share.ok = _shareText._ok;
		share.cancel = _shareText._cancel;
		return share;
	}
	public function sellWindow():EZWindowTask{
		var sell:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		sell.text = _sellText.window;
		sell.ok = _sellText.ok;
		sell.cancel = _sellText.cancel;
		return sell;
	} 
	
	public function sellOnlyOneWindow(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _sellOnlyOne.text;
		window.ok = _sellOnlyOne.ok;
		window.cancel = _sellOnlyOne.cancel;
		return window;
	}
	
	public function compOnlyOneWindow(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _compOnlyOne.text;
		window.ok = _compOnlyOne.ok;
		window.cancel = _compOnlyOne.cancel;
		return window;
	}
	
	public function getShareImage():String{
		var card:EZCard = _model.info.getCard();
		var name:String = Geek.GetNameByProSty(card.magicType, card.style);
		return name + ".png";
	}
	
	public function openState():EZCardCtrl.State{
	
		var state = EZCardCtrl.State.Info;
		var guide:EZGuide = EZGuide.GetInstance();
		
		var g:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(!g.canTeam){
			_view.team.button.doLock();
		}
		if(!g.canSell){
			_view.sell.button.doLock();
		}
		if(guide.doTeam() && g.canTeam){
			_view.team.initGuide();
		}else if(guide.doComp()){
			_view.comp.initGuide();
		}
		//if(EZGlobal.GetInstance().stateName != ""){
		//	state = stirng2State(EZGlobal.GetInstance().stateName);
		//	EZGlobal.GetInstance().stateName = "";
		//}
		setState(state);
		return state;
		
		
	}
	public function getShareUrl():String{
		var card:EZCard = _model.info.getCard();
		var share:JsonData.Share = card.share;
		return _weixinText._url+'&share='+WWW.EscapeURL(JsonData.Share.Save(card.share));//card.magicType+'&style='+card.style;
	}
	public function getTitle():String{
		
		var card:EZCard = _model.info.getCard();
		return _weixinText._titleBegin + card.name +  _weixinText._titleEnd;
	
	}
//	public function getTitleTranscoding():Task
	public function weixin(title:String):Task{
		Debug.Log(getShareUrl());
	 	var weixin:EZWeixin = EZWeixin.GetInstance();
		var task:EZWeixin.SendTask = weixin.sendTask();
		task.send(title, _weixinText._description, _weixinText._info, getShareUrl(), getShareImage(), true); 
		return task;
	}
	
	public function send2Weixin():Task{
		
		var tl:TaskList = new TaskList();
	
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3f;
		loading.alpha = 0.5f;
		loading.text = EZDictionary.LookUp("!loading");
		
		tl.push(loading);
	
		tl.push(weixin(EZTranscoding.Gb2312Big5(getTitle())));
		tl.push(EZBagTable.GetInstance().share());
		var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
		loaded.time = 0.3f;
		tl.push(loaded);
			
		 
	
		return tl;
	}
	
	public function updateBag(sub:boolean):Task{
		var isOver:boolean = false;
		var task:Task = _model.card.refreshBag();
		TaskManager.PushBack(task, function(){
			if(sub){
				var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
				var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
				Debug.LogWarning("sub sub" + subscript);
				_view.card.load(subscript, _model.card.cards);
			}else{
			
				_view.card.load(null, _model.card.cards);
			}
			_view.card.bagText = _model.card.bag + "/" + _model.card.allBag + " (" + _model.card.limitBag + ")";
			_view.card.refresh();
		});
	
		return task;
	}
	
	public function get comp():EZPetCompCtrl{
		return comp_;
	}
	
	public function get sell():EZPetSellCtrl{
		return sell_;
	}

	public function get team():EZCardTeamCtrl{
		return team_;
	}
	public function get info():EZCardInfoCtrl{
		return info_;
	}
	public function  setState(state:State){
		if(state_ == state){
			return;
		}
		state_ = state;
		if(part_){
			part_.close();
		}
		switch(state_){
			case State.None:
				part_ = null;
			break;
			case State.Info:
				part_ = info_;
			break;
			case State.Sell:
				part_ = sell_;
			break;
			case State.Comp:
				part_ = comp_;
			break;
			case State.Team:
				part_ = team_;
			break;
			
		}
		
		if(part_){
			part_.open();
		}
	}
	

	public function setup(player:JsonData.Player, setup:JsonData.Setup){
	
		
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		
	
		if(guide.thirdTeam){
			_model.team.setLevel(2);
		}else if(guide.twoTeam){
			_model.team.setLevel(1);
		}else{
			_model.team.setLevel(0);
		}

		
	}

	
	public function removeCard(data:EZCard){
	
		if(part_){
			part_.removeCard(data);
			part_.refresh();
		}
		
	}
	
	public function clear(){
	
		if(part_){
			part_.clear();
			part_.refresh();
		}
		
	}
	public function addCard(data:EZCard){
	
		
		if(part_){
			part_.addCard(data);
			part_.refresh();
		}
			
		
		
	}
	public function refresh(){
		if(part_){
			part_.refresh();
		}
	}
	
	
	
	
	public function sellWarning(from:int):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		
		task.init = function(){
			isOver = false;
			
			var to:int = EZBagTable.GetInstance().bag.money;
			if(to != null){
				var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				
				var text:String = _sellText.text(to - from);
				warning.addText(text);
				
				TaskManager.PushBack(warning, function(){
					isOver = true;
				});
				TaskManager.Run(warning);
			}else{
				isOver = true;
			
			}
			
		};
		task.isOver = function():boolean{
			return isOver;
		};
	
		return task;
	}
	public function compWarning(from:EZCard):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var to:EZCard = EZBagTable.GetInstance().getCard(from.id);
			if(to != null){
				var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
				warning.addText(_compText.exp(Mathf.FloorToInt(to.exp - from.exp)));
				var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
				var flv = setup.soul.getLv(from.exp);
				var tlv = setup.soul.getLv(to.exp);
				if(tlv != flv){ 
					warning.addText(_compText.lv(tlv+1)); 
					if(setup.affix.magic(tlv) != setup.affix.magic(flv)){
						warning.addText(_compText.newMagic());
					}
					if(setup.affix.skill(tlv) != setup.affix.skill(flv)){
						warning.addText(_compText.newSkill());
					} 
					var player:JsonData.Player = EZPlayerTable.GetInstance().data; 
					var lv:int = setup.player.getLv(player.exp);
					if(tlv >= lv){
						warning.addText(_compText.fullLv());	
					}
				}
				var fromSkillInfo:EZAffixInfo[] = from.skillInfo;
				var toSkillInfo:EZAffixInfo[] = to.skillInfo;
				
				for(var i:int = 0; i<fromSkillInfo.Length; ++i){
					if(fromSkillInfo[i].lv < toSkillInfo[i].lv){
						warning.addText(_compText.affix(toSkillInfo[i].title, toSkillInfo[i].lv == toSkillInfo[i].maxLv));
					}
				}
				
				var fromMagicInfo:EZAffixInfo[] = from.magicInfo;
				var toMagicInfo:EZAffixInfo[] = to.magicInfo;
				for(var j:int = 0; j<fromMagicInfo.Length; ++j){
					if(fromMagicInfo[j].lv < toMagicInfo[j].lv){
						warning.addText(_compText.affix(toMagicInfo[j].title, toMagicInfo[j].lv == toMagicInfo[j].maxLv));
					}
				}
				TaskManager.PushBack(warning, function(){
					isOver = true;
				});
				TaskManager.Run(warning);
			}else{
				isOver = true;
			
			}
			
		};
		task.isOver = function():boolean{
			return isOver;
		};
	
		return task;
	}
	
	public function openCompWindow(hasGood:boolean,lvLimit:boolean){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _compBeforeText.text(hasGood,lvLimit);				
		window.ok = _compBeforeText._ok;
		window.cancel = _compBeforeText._cancel;
	
		return window;
		//TaskManager.Run(window);
	}
	
	public function get lvLimit():boolean{
		return _view.comp.lvLimit;
	}
	
}