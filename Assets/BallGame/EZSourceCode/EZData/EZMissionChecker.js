#pragma strict

class EZMissionChecker extends MonoBehaviour{
	public var _missionTable:EZMissionBagTable = null;
	public var _bagTable:EZBagTable = null;
	public var _playerTable:EZPlayerTable = null;
	public var _teamTable:EZTeamTable = null;
	public var _guideTable:EZGuideTable = null;
	public var _subscript:EZSubscript = null;
	private static var instance_:EZMissionChecker = null;
	class BagOverflow{
		var text:String = "";
		var cancel:String = "";
		var comp:String = "";
		var sell:String = "";
	}
	
	public var _overflow:BagOverflow = null;
	public var _noMission:String = "no mission";
	class Result{
		var error:String = null;
	}
	
	class NoAp{
		var max:String = "";
		var noBeginAp:String = "";
		var noMidAp:String = "";
		var noEndAp:String = "";
		//var noEndAp1:String = "";
		function noApMessage(ap:float, playerAp:float){
			var setup:JsonData.Setup = EZSetupTable.GetInstance().data;
			//var diamond:int = setup.game.ap_diamond;
			return noBeginAp + ap.ToString()+ noMidAp + playerAp.ToString();// +noEndAp + diamond +noEndAp1;
		}
		var maxBeginAp:String = "";
		var maxMidAp:String = "";
		var maxEndAp:String = "";
		function maxApMessage(ap:float, playerMax:float){
			return maxBeginAp + ap.ToString()+ maxMidAp + playerMax.ToString() +maxEndAp;
		}
		var noAp:String = "";
		var cancel:String = "";
		var ok:String = "";
	}
	public var _noAp:NoAp = null;
	
	class GoShop{
		var text:String = "";
		var cancel:String = "";
		var ok:String = "";
	}
	public var _goShop:GoShop = null;
	 
	class GoMission{ 
		var ok:String;
		var cancel:String;
		var goBegin:String = "";
		var goMid:String = "";
		var goEnd:String = "";
		function goText(name:String, ap:float){
			return goBegin  + name + goMid + ap.ToString() + goEnd;
		}
	}
	public var _goMission:GoMission = null;
	
	public class KeyTexts{
		var keys:String[];
		var ok:String;
		var cancel:String;
		var otherKey0:String;
		var otherKey1:String;
		var otherKey2:String;
		var noKey0:String;
		var noKey1:String;
		var hasKey0:String;
		var hasKey1:String; 
		function  noKey(key:int):String{
			return noKey0 + keys[key]+noKey1 ;
		}
	
		function  hasKey(key:int):String{
			return hasKey0 + keys[key]+hasKey1 ;
		}
		
		function  otherKey(key:int, use:int):String{
			return otherKey0 + keys[key]+otherKey1 + keys[use] +otherKey2;
		}
	
	};
	public var _keyTexts:KeyTexts; 
	
	class NoTeam{
		var text:String = "";
		var cancel:String = "";
		var ok:String = "";
	}
	public var _noTeam:NoTeam; 
	public var _wrongTime:String; 
	
	function Awake(){
		this.instance_ = this;
	}
	
	public static function gotoLevel(level:String):Task{
		inputClose();
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.6;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		TaskManager.PushBack(loading, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			EZGlobal.GetInstance().LoadLevel(level);
		});
		mt.push(loading);
		return mt;
	
	}
	
	public static function gotoLevel(level:String,state:String):Task{
		inputClose();
		var mt:MultiTask = new MultiTask();
		mt.push(EZPopInstance.GetInstance().hideTask());
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.6;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		TaskManager.PushBack(loading, function(){
			EZBroadcast.GetInstance().close();
			ActionManager.Run("global.ui.reset");
			EZGlobal.GetInstance().LoadLevel(level,state);
		});
		mt.push(loading);
		return mt;
	
	}
	
	public static function GetInstance():EZMissionChecker{
		return this.instance_;
	}
	
	public function overflowTaskWithShop():Task{
			var task:Task = new Task();
			var isOver:boolean = false;
			task.init = function(){
				isOver = false;
				var window:EZThiWindowTask = TaskManager.Create("global.ui.thiWindow") as EZThiWindowTask;
				window.text = _overflow.text;	
				window.right = _overflow.sell;
				window.mid = _overflow.comp;
				window.left = _overflow.cancel;
				TaskManager.PushBack(window, function(){
					if(window.result == EZThiWindowTask.Result.Right){
						var shop:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop));
						TaskManager.PushBack(shop, function(){
							isOver = true;
						});
						TaskManager.Run(shop);
					}else if(window.result == EZThiWindowTask.Result.Mid){
						var pet:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet),"sell");
						TaskManager.PushBack(pet, function(){
							isOver = true;
						});
						TaskManager.Run(pet);
					}else{
						isOver = true;
					}
				});
				
				TaskManager.Run(window);
			};
			task.isOver = function():boolean{
				return isOver;
			};
			return task;
	}

	public function overflowTaskNoShop():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		
			window.text = _overflow.text;	
			window.ok = _overflow.comp;
			window.cancel =  _overflow.cancel;
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					var pet:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet));
					TaskManager.PushBack(pet, function(){
						isOver = true;
					});
					TaskManager.Run(pet);
				}else{
					isOver = true;
				}
			});
			
			TaskManager.Run(window);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	public function overflowTask():Task{
		var guide:JsonData.Guide = _guideTable.data;
		if(guide.canShop){
			return overflowTaskWithShop();
		}else{
			return overflowTaskNoShop();
		}
	}
	
	private function noDiamond(){
		var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
		window.text = _goShop.text;
		window.ok = _goShop.ok;
		window.cancel = _goShop.cancel;
		TaskManager.PushBack(window, function(){
			if(window.okOrCancel){
				var shop:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Shop));
				TaskManager.Run(shop);
			}
		});
		TaskManager.Run(window);
	}
	
	public function noApTask(ap:float, playerAp:float):Task{
		var guide:JsonData.Guide = _guideTable.data;
		if(guide.canShop){
			var task:Task = new Task();
			var isOver:boolean = false;
			task.init = function(){
				isOver = false;
				Debug.Log("noAp");
				var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
				window.text = _noAp.noAp;
				window.message = _noAp.noApMessage(ap, playerAp);
				window.ok = _noAp.ok;
				window.cancel = _noAp.cancel;
				TaskManager.PushBack(window, function(){
					if(window.okOrCancel){
						var player:JsonData.Player = _playerTable.data;
						if(player.diamond < EZSetupTable.GetInstance().data.game.ap_diamond){
							noDiamond();
						}else{
							var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
							if(target){
								target.SendMessage("OnAction","fullAp", SendMessageOptions.DontRequireReceiver);
							}
						}
						isOver = true;
					}else{
						isOver = true;
					}
				});
				TaskManager.Run(window);
			};
			task.isOver = function():boolean{
				return isOver;
			};
			return task;
		
		}else{
			var warning:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
			warning.addMessage(_noAp.noAp, _noAp.noApMessage(ap, playerAp));
			return warning;
		
		}
		
	}
	
	public function maxApTask(ap:float, max:float):Task{
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addMessage(_noAp.max, _noAp.maxApMessage(ap, max));
		return task;
	}
	
	public function noMissionTask():Task{
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addText(_noMission);
		return task;
	}
	
	public function testKey(key:int):int{
		var bag:JsonData.MissionBag  = _missionTable.bag;
		if(key == 1){
			if(bag.cuprum > 0){
				return 1;
			}else if(bag.silver >0){
				return 2;
			}else if(bag.gold >0){
				return 3;
			}else{
				return 0;
			}
		}else if(key == 2){
			if(bag.silver >0){
				return 2;
			}else if(bag.gold >0){
				return 3;
			}else{
				return 0;
			}
		}else if(key == 3){
			if(bag.gold >0){
				return 3;
			}else{
				return 0;
			}
		}
		return 0;
	}
	
	public function noKeyTask(key:int):Task{
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addText(_keyTexts.noKey(key));
		return task;
	}
	
	public function gotoMission(id:int, ap:float, type:String, ver:int):Task{
	
		inputClose();
		Debug.Log("go to Level");
		var mt:MultiTask = new MultiTask();
		var tl:TaskList = new TaskList();
		var loading:EZLoadingTask = TaskManager.Create("global.ui.loading") as EZLoadingTask;
		loading.time = 0.3;
		loading.alpha = 1;
		loading.text = EZDictionary.LookUp("!loading");
		mt.push(loading);
		TaskManager.PushFront(mt, function(){
			var player:JsonData.Player = EZPlayerTable.GetInstance().data;
			player.ap -= ap;
		});
		tl.push(mt);
		var doc:Task = EZLevelDocTable.GetInstance().loadTask(type, ver, false);
		tl.push(doc);
		
		var load:WebLoaderTask = EZSceneTable.GetInstance().load(id, type);
		tl.push(load);
		TaskManager.PushBack(load, function(){
			var info:JsonData.SceneInfo = load.data as JsonData.SceneInfo;
			if(info && info.succeed){
				info.print();
				EZBroadcast.GetInstance().close();
				EZGlobal.GetInstance().LoadLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Play));
			}else{
				var player:JsonData.Player = EZPlayerTable.GetInstance().data;
				player.ap += ap;
			}
			
		});
		return tl;
	}
	
	public function otherKeyTask(evtMission:JsonData.EvtMission, user:int, title:String):Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			Debug.Log("noAp");
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
			window.text = title;
			window.message = _keyTexts.otherKey(evtMission.key, user);
			window.ok = _keyTexts.ok;
			window.cancel = _noAp.cancel;
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					//inputClose();
					var mission:Task = gotoMission(evtMission.id, evtMission.ap, evtMission.type, evtMission.ver);
					TaskManager.PushBack(mission, function(){
						isOver = true;
					});
					TaskManager.Run(mission);
				}else{
					isOver = true;
				}
			});
			
			TaskManager.Run(window);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	public function goMissionTask(mission:JsonData.Mission, title:String){
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
			window.text = title;
			window.message = _goMission.goText(mission.name, mission.ap);
			window.ok = _goMission.ok;
			window.cancel = _goMission.cancel;
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					//inputClose();
					var missionTask:Task = gotoMission(mission.id, mission.ap, mission.type, mission.ver);
					TaskManager.PushBack(missionTask, function(){
						isOver = true;
					});
					TaskManager.Run(missionTask);
				}else{
					isOver = true;
				}
			});
			TaskManager.Run(window);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	public function goEvtMissionTask(evtMission:JsonData.EvtMission, key:int,  title:String){
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
			window.text = title;
			window.message = _goMission.goText(evtMission.name, evtMission.ap) + _keyTexts.hasKey(key);
			window.ok = _goMission.ok;
			window.cancel = _goMission.cancel;
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					//inputClose();
					var mission:Task = gotoMission(evtMission.id, evtMission.ap, evtMission.type, evtMission.ver);
					TaskManager.PushBack(mission, function(){
						isOver = true;
					});
					TaskManager.Run(mission);
				}else{
					isOver = true;
				}
			});
			
			TaskManager.Run(window);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	function wrongTimeTask():Task{
		var task:EZWarningTask = TaskManager.Create("global.ui.warning") as EZWarningTask;
		task.addText(_wrongTime);
		return task;
	}
	
	function noTeamTask():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			isOver = false;
			Debug.Log("noAp");
			var window:EZWindowTask = TaskManager.Create("global.ui.window") as EZWindowTask;
			window.text = _noTeam.text;
			window.ok = _noTeam.ok;
			window.cancel = _noTeam.cancel;
			TaskManager.PushBack(window, function(){
				if(window.okOrCancel){
					var pet:Task = gotoLevel(EZDictionaryScene.LookUp(EZDictionaryScene.SceneName.Pet));
					TaskManager.PushBack(pet, function(){
						isOver = true;
					});
					TaskManager.Run(pet);
				}else{
					isOver = true;
				}
			});
			
			TaskManager.Run(window);
		};
		task.isOver = function():boolean{
			return isOver;
		};
		return task;
	}
	
	function isEnabled(data:JsonData.EvtMission):boolean{
		var time:System.DateTime = EZDateTime.GetDateTime(EZTimestamp.GetInstance().epoch); 
		if(data.howManyDays(time) != 0){
			return false;
		}
		var sTime:TimeSpan = EZDateTime.GetDateTime(data.start).TimeOfDay; 
		var nTime:TimeSpan = time.TimeOfDay; 
		var eTime:TimeSpan =  EZDateTime.GetDateTime(data.end).TimeOfDay;  
		var start:int =  sTime.Hours*60 + sTime.Minutes; 
		var now:int =  nTime.Hours*60 + nTime.Minutes;
		var end:int =  eTime.Hours*60 + eTime.Minutes;
		if(start == end){
			return true;
		}else if(now < start){
			 return false;
		}else if(now > end){
			 return false;
		}
		return true;
	}
	
	public function check(type:String, title:String):Task{ 
		var team:JsonData.Team = _teamTable.data;
		if(!_bagTable.find(team)){
			return noTeamTask();
		}		
		var bag:JsonData.Bag  = _bagTable.bag;
		if(bag.overflow()){
			return overflowTask();
		}
		var info:EZMissionBagTable.SceneInfo = _missionTable.find(type); 
		if(info == null){
			return noMissionTask();
		}
		var player:JsonData.Player = _playerTable.data;
		
		var ap:float = 9999;
		if(info.mission != null){
			ap = info.mission.ap;
		}else{
			ap = info.evtMission.ap;
		}
		if(ap > player.maxAp){
			return maxApTask(ap, player.maxAp);
		}
		var playerAp:float = EZApData.GetAp(player.ap, player.apTime, player.maxAp, player.apPerTime);
		
		if(playerAp < ap){
			return noApTask(ap, playerAp);
		}
		if(info.evtMission != null){ 
			if(!EZMissionBagTable.GetInstance().isEnabled(info.evtMission)){
				return wrongTimeTask();
			}
			if(info.evtMission.key != 0){
				var user:int = testKey(info.evtMission.key);
				if(user == 0){
					return noKeyTask(info.evtMission.key);
				}else if(user != info.evtMission.key){
					_subscript.touch("e" +info.evtMission.id);
					return otherKeyTask(info.evtMission, user, title);
				}else{
				
					_subscript.touch("e" +info.evtMission.id);
					return goEvtMissionTask(info.evtMission, user, title);
				}
			}else{
				_subscript.touch("e" +info.evtMission.id);
				 return goEvtMissionTask(info.evtMission, user, title);
			}
		}else{
			_subscript.touch("m" +info.mission.id);
			return goMissionTask(info.mission, title);
		}
	}
	
	private static function inputClose(){
		var target:GameObject = GameObject.FindGameObjectWithTag("Ctrl");
			if(target){
				target.SendMessage("inputClose", SendMessageOptions.DontRequireReceiver);
			}
	}

	

}