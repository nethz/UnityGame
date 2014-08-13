#pragma strict

import System.Collections.Generic;
class MissionCtrl extends MonoBehaviour{
	public enum Face{
		Pvp,
		PvpLevel,
		Pve,
		PveLevel,
		PveElite,
		PveEliteLevel,
		Evt,
		EvtLevel,
		None,
	};
	public var _pveTitle:String = "";
	public var _evtTitle:String = "";
	public var _subscriptKey:String = "mission";
	
	
	public var _apCtrl:EZApCtrl;
	private var list_:List.<JsonData.Mission> = null;
	private var evtList_:List.<JsonData.EvtMission> = null;
	private var bag_:JsonData.MissionBag = null;
	public var _pvpButton:EZLockButton = null;
	public var _pveButton:EZLockButton = null;
	public var _eventButton:EZLockButton = null;
	public var _switchBtn:MissionSwitchButton = null;
	public var _pveView:MissionPVEView = null;
	public var _eventView:MissionEventView = null;
	public var _bg:MissionBgView = null;
	private var closeTask_:Task = null; 
	private var face_:MissionCtrl.Face = MissionCtrl.Face.None;
	
	public var _inputSwitch:EZUIInputSwitch; 
	
	private var isElite_:boolean = false;
	
	public function get elite():boolean{
		return isElite_;
	}
	
	public function set elite(value:boolean){
		isElite_ = value;
	}
	
	public function foldTask():Task{
		 return _eventView.foldTask();
	}

	public function inputOpen(){
		_inputSwitch.open();
	}
	public function inputClose(){
		_inputSwitch.close();
	}
	
	public function get switchBtn():MissionSwitchButton{
		return _switchBtn;
	}
	
	public function setup(bag:JsonData.MissionBag, list:List.<JsonData.Mission>, evtList:List.<JsonData.EvtMission>){
		bag_ = bag;
		list_ = list;
		evtList_ = evtList;
		
	}
	public function loadMission(){
		_apCtrl.refresh();
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
		_pveView.main.setup(subscript, new EZMissionMenuSetup(list_, MissionCtrl.Face.Pve));
		Debug.Log(list_.Count);
		_pveView.eliteMain.setup(subscript, new EZMissionMenuSetup(list_, MissionCtrl.Face.PveElite));
		_eventView.setup(subscript, new EZMissionEvtMenuSetup(evtList_, bag_.gold, bag_.silver, bag_.cuprum));
	}
	public function loadPveMinor(classify:String, scene:String, face:MissionCtrl.Face){
		var sm:EZSubscriptManager = EZSubscriptManager.GetInstance();
		var subscript:EZSubscript = sm.getSubscript(_subscriptKey);
		_pveView.minor.setup(subscript, new EZMissionMinorSetup(classify, list_, face));
		_bg.setup(classify, scene);
	}

	public function setFace(face:MissionCtrl.Face){
		face_ = face;
		switch(face_){
			case MissionCtrl.Face.Pve:
			_pveButton.doDisable();
			
			
			if(evtList_ && evtList_.Count != 0){
				_eventButton.doEnable();
			}else{
				_eventButton.doLock();
			}
			_pvpButton.doLock();
			break;
		case MissionCtrl.Face.Evt:
			if(evtList_ && evtList_.Count != 0){
				_eventButton.doDisable();// = true;
			}else{
				_eventButton.doLock();// = true;
			}
			_pveButton.doEnable();// = true;
			_pvpButton.doLock();// = false;
			break;
		}
	}
	
	public function openTask(face:MissionCtrl.Face):Task{
	
		var open:Task = null;
		var tl:TaskList = new TaskList();
		
		if(closeTask_ != null){
			var close:Task = closeTask_;
			TaskManager.PushBack(close, function(){
				closeTask_ = null;
			});
			tl.push(close);
		}
		
		if(face == MissionCtrl.Face.Pve){
			open = _pveView.main.openTask();
			//////////
			TaskManager.PushFront(open, function(){
				_bg.setTopBg("pveTop");
			});
			/////////
			TaskManager.PushBack(open, function(){
				closeTask_ = _pveView.main.closeTask();
			});
		}else if(face == MissionCtrl.Face.PveElite){
			open = _pveView.eliteMain.openTask();
			//////////
			TaskManager.PushFront(open, function(){
				_bg.setTopBg("pveTop");
			});
			/////////
			TaskManager.PushBack(open, function(){
				closeTask_ = _pveView.eliteMain.closeTask();
			});
		}else if(face == MissionCtrl.Face.PveLevel){
			open = _pveView.minor.openTask();
			//////////
			TaskManager.PushFront(open, function(){
				_bg.setTopBg("pveInTop");
			});
			/////////
			TaskManager.PushBack(open, function(){
				closeTask_ = _pveView.minor.closeTask();
			});
		}else if(face == MissionCtrl.Face.Evt){
			open = _eventView.openTask();
			//////////
			TaskManager.PushFront(open, function(){
				_bg.setTopBg("eventTop");
			});
			/////////
			TaskManager.PushBack(open, function(){
				closeTask_ = _eventView.closeTask();
			});
		}
	
		var mt:MultiTask = new MultiTask();
		mt.push(open);
		
		if(face == MissionCtrl.Face.Pve || face == MissionCtrl.Face.Evt || face == MissionCtrl.Face.PveElite){
			mt.push(_bg.closeBgTask(0.3));
		}else if(face == MissionCtrl.Face.PveLevel){
			mt.push(_bg.openBgTask(0.3));
		}
		
		tl.push(mt);
		return tl;
	}
	
	public function fullAp(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
		var diamond:int = setup.game.ap_diamond;
		window.text = EZDictionary.LookUp("!pay4ap1") + diamond + EZDictionary.LookUp("!pay4ap2");
		window.ok = EZDictionary.LookUp("!ok");
		window.cancel = EZDictionary.LookUp("!cancel");
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
				loading.time = 0.3;
				loading.alpha = 0.5;
				loading.text = EZDictionary.LookUp("!full_aping");
				var table:EZShopTable = EZShopTable.GetInstance();
				var web:WebLoaderTask = table.fullAp();
				TaskManager.PushBack(web, function(){
					var info:JsonData.PlayerInfo = web.data as JsonData.PlayerInfo;
					if(info && info.succeed){
						var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
						warning.addText(EZDictionary.LookUp("!full_aped"));
						TaskManager.Run(warning);
					}
				});
				var tl:TaskList = new TaskList();
				var mt:MultiTask = new MultiTask();
				mt.push(loading);
				mt.push(web);
				tl.push(mt);
				var loaded:EZLoadedTask = TaskManager.Create("global.ui.loaded") as EZLoadedTask;
				loaded.time = 0.3;
				tl.push(loaded);
				TaskManager.Run(tl);
			}
		});
		TaskManager.Run(window);
	}

}