#pragma strict

class EZEggP2CTask  extends MonoBehaviour{
	 
	public var _bigCard:EZEggBigCardView = null;
	public var _parameters:DrawPetPar = null;
	public var _go:EZSound = null;
	public var _card1:EZSound = null;
	public var _card2:EZSound = null;
	
	//private var bigCard_:EZEggBigCardView = null;
	//private var parameters_:DrawPetPar = null;

	//private var card1_:EZSound = null; 
	//private var card2_:EZSound = null;
	 /*
	public function EZEggP2CTask(bigCard:EZEggBigCardView,parameters:DrawPetPar, card1:EZSound, card2:EZSound){
		bigCard_ = bigCard;
		parameters_ = parameters;
		card1_ = card1;
		card2_ = card2;
	} */
	
	public function createTask(data:EZCard):Task{
		var taskList:TaskList = new TaskList();
		taskList.push(loadPetTask(data));
		taskList.push(waitTask(_parameters.idelTime));
		taskList.push(attackTask());
		taskList.push(waitTask(_parameters.attackedTime));
		taskList.push(showSeal());
		taskList.push(waitTask(_parameters.sealedTime));
		var mt:MultiTask = new MultiTask();
		mt.push(shrinkPet());
		mt.push(flyOneCard());
		taskList.push(mt);
		taskList.push(resetBigCard());
		return taskList;
	}
	
	private function loadPetTask(data:EZCard):Task{
		var tl:TaskList = new TaskList();
		var loadPetTask:Task = new Task();
		var isOver:boolean = false;
		loadPetTask.init = function(){ 
			var task:Task = _bigCard.pet.loadTask(new Geek.SoulKey(data.style, data.magicType),data.quality);
			TaskManager.Run(task);
			var qua:Color = Geek.GetQualityColor(data.quality,1,1);
			var pro:Color = Geek.GetColor(data.magicType,1,1);
			_bigCard.setColor(qua,pro);
			TaskManager.PushBack(task,function(){ 
				isOver = true;
			});
		};

		loadPetTask.isOver = function():boolean{
			return isOver;
		};
		TaskManager.PushFront(loadPetTask,function(){
			_go.play();
		});
		tl.push(loadPetTask);
		
		/*var alphaTask:Task = new Task();
		var tv:GeekTweenValue =null;
		alphaTask.init = function(){
			tv = GeekTweenValue.Begin(bigCard_.gameObject,0.2f, 0f, 1f, bigCard_.gameObject, "setPetAlpha");
			tv.method = GeekTweener.Method.EaseIn;
		};
		alphaTask.isOver = function(){
			if(tv && tv.enabled){
				return false; 
			}
			return true;
		};
		tl.push(alphaTask);*/
		
		return tl;
		
	}
	
	private function attackTask():Task{
		var attackTask:Task = new Task();
		var isOver:boolean = false;
		attackTask.init = function(){
			var task:Task = _bigCard.pet.pet.attackDBTask();
			TaskManager.PushBack(task, function(){
				isOver = true;
			});
			TaskManager.Run(task);
		};
		attackTask.isOver = function():boolean{
			return isOver;
		};
		return attackTask;
	}
	
	private function showSeal():Task{
		/*var showSeal:Task = new Task();
		var tsSeal:GeekTweenScale = null;
		showSeal.init = function(){
			bigCard_.petSeal.transform.localScale = parameters_.sealBegin;
			bigCard_.isShowBorder = true;
			tsSeal = GeekTweenScale.Begin(bigCard_.petSeal, parameters_.sealTime, parameters_.sealEnd);
		};
		showSeal.isOver = function():boolean{
			if(tsSeal && tsSeal.enabled){
				return false;
			}
			return true;
		};
		return showSeal;*/
		
		var mt:MultiTask = new MultiTask();
		var upTask:Task = new Task();
		var tp:GeekTweenPosition = null;
		upTask.init = function(){
			_bigCard.petSeal.transform.localPosition = _parameters.sealFromPos;
			_bigCard.isShowBorder = true;
			tp = GeekTweenPosition.Begin(_bigCard.petSeal, _parameters.sealUpTime, _parameters.sealToPos);
			tp.method = _parameters.sealUpMethod;
		};
		upTask.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		
		var alphaTask:Task = new Task();
		var tv:GeekTweenValue = null;
		alphaTask.init = function(){
			_bigCard.setAlpha(0f);
			_bigCard.isShowBorder = true;
			tv = GeekTweenValue.Begin(_bigCard.petSeal, _parameters.sealUpTime, 0f, 1f,_bigCard.gameObject,"setAlpha");
		};
		alphaTask.isOver = function():boolean{
			if(tv && tv.enabled){
				return false;
			}
			return true;
		};
		
		mt.push(upTask);
		mt.push(alphaTask); 
		TaskManager.PushFront(mt, function(){
			_card1.play();
		});
		return mt;
	}
	
	private function shrinkPet():Task{
		var shrinkTask:Task = new Task();
		var tsSeal:GeekTweenScale = null; 
		shrinkTask.init = function(){
			tsSeal = GeekTweenScale.Begin(_bigCard.gameObject, _parameters.shrinkFlyTime, _parameters.cardSize);
		};
		shrinkTask.isOver = function():boolean{
			if(tsSeal && tsSeal.enabled){
				return false;
			}
			return true;
		};
		return shrinkTask;
	}	
				
	private function flyOneCard():Task{
		var task:Task = new Task();
		var tp:GeekTweenPosition = null;
		task.init = function(){
			tp = GeekTweenPosition.Begin(_bigCard.gameObject,_parameters.shrinkFlyTime,_parameters.flyPos);
			tp.method = _parameters.sealFlyMethod;
		};
		task.isOver = function():boolean{
			if(tp && tp.enabled){
				return false;
			}
			return true;
		};
		TaskManager.PushBack(task, function(){
			_card2.play();
		});
		return task;
	}
	
	private function resetBigCard():Task{
		var task:Task = new Task();
		var isOver:boolean = false;
		task.init = function(){
			_bigCard.pet.destroy();
			_bigCard.isShowBorder = false;
			_bigCard.reSet();
			isOver = true;
		};
		task.isOver = function(){
			return isOver;
		};
		return task;
	}

	private function waitTask(time:float):Task{
		if(time <= 0){
			return new Task();
		}
		var wait:EZWaitTask = new EZWaitTask();
		wait.setAllTime(time);
		return wait;
	}
}