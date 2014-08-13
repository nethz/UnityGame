#pragma strict

import System.Collections.Generic; 

class EZPopCtrl extends MonoBehaviour{

	
	public var _swap0:String;
	public var _swap1:String;
	public var _magic:String;
	private var selected_:boolean = false;
	private var isOpen_:boolean = false;
	private var queue_:Queue.<Task> = Queue.<Task>();
	private var busy_:boolean = false; 
	
	private static var instance_:EZPopCtrl = null;
	
	function Awake(){
		this.instance_ = this;
		
	}
	
	private function popFoe(seat:EZSoul.Seat, list:List.<Task>):Task{
		
		var soul:EZSoul = EZContainerManager.GetSoul(seat);
		if(soul){
			var soulInfo:EZFoeInfo = soul.gameObject.GetComponent(EZFoeInfo) as EZFoeInfo;
			if(soulInfo && !String.IsNullOrEmpty(soulInfo.pop)){
				var open:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
				open.id = seat;
				open.val = soulInfo.pop;
				list.Add(open);
			}
		
		}
	}
	
	function openLead(seat:EZSoul.Seat, text:String, layer:int){
		var tl:TaskList = new TaskList();
		
		var close:Task = TaskManager.Create("view.hud.pop.we.close") as Task;
		tl.push(close);
		
		var pop:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
		pop.id = seat;
		pop.val = text;
		pop.layer = layer;
		tl.push(pop);
		queue_.Enqueue(tl);
		
	
	}
	function openWe(seat:EZSoul.Seat, text:String){
		var open:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
		open.id = seat;
		open.val = text;
		queue_.Enqueue(open);
	}
	
	function openFoe(){
		var tl:TaskList = new TaskList();
		var list:List.<Task> = new List.<Task>();
		popFoe(EZSoul.Seat.FoeBag1, list);
		popFoe(EZSoul.Seat.FoeBag2, list);
		popFoe(EZSoul.Seat.FoeBattle, list);
		if(list.Count != 0){
			queue_.Enqueue(list[Random.Range(0, list.Count)]);
		}
	}
	
	public static function GetInstance():EZPopCtrl{
		return this.instance_;
	}

	private function isSwap():boolean{
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(guide.swap){
			return false;
		}
		
		
		
		var battle:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBattle);
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1);
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2);
		if(battle && battle.healthBar < 0.333f){
			if((bag1 && bag1.alive && bag1.healthBar> 0.5f) || (bag2 && bag2.alive && bag2.healthBar > 0.5f)){
				return true;
			}
		}
		return false;
	} 
	private function isMagic():boolean{
		var guide:JsonData.Guide = EZGuideTable.GetInstance().data;
		if(guide.magic){
			return false;
		}
 		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1);
		var bag2:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag2);
		if(bag1.magicBar == 1 || bag2.magicBar == 1){
			return true;
		} 
		return false;
	} 

	public function doOpenSelect(){ 
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1);
		var tl:TaskList = new TaskList();
		var open:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
		if(bag1 && bag1.alive && bag1.healthBar > 0.5f){
			open.id = EZSoul.Seat.WeBag1; 
		}else{
			open.id = EZSoul.Seat.WeBag2; 
		}
		open.val = _swap1;
		
		var close:Task = TaskManager.Create("view.hud.pop.we.close") as Task;
		tl.push(close);
		tl.push(open); 
		queue_.Enqueue(tl);
	}
	public function doCloseSelect(){
		var tl:TaskList = new TaskList();
		var open:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
		open.id = EZSoul.Seat.WeBattle;
		open.val = _swap0;
		var close:Task = TaskManager.Create("view.hud.pop.we.close") as Task;
		tl.push(close);
		tl.push(open);
		queue_.Enqueue(tl);
		
	} 
	
	public function doMagic(){ 
		var bag1:EZSoul = EZContainerManager.GetSoul(EZSoul.Seat.WeBag1);
		var tl:TaskList = new TaskList();
		var open:EZIDPopTask = TaskManager.Create("view.hud.pop.open") as EZIDPopTask;
		open.val = _magic;
		if(bag1.magicBar == 1){ 
			open.id = EZSoul.Seat.WeBag1;
		}else{
			open.id = EZSoul.Seat.WeBag2;
		}
		
		var close:Task = TaskManager.Create("view.hud.pop.we.close") as Task;
		tl.push(close);
		tl.push(open);
		queue_.Enqueue(tl);
	
	}
	
	public function Update(){
		if(!busy_ && queue_.Count != 0){
			var task:Task = queue_.Peek();
			queue_.Dequeue();  
			TaskManager.PushFront(task, function(){
				busy_ = true;
			});
			TaskManager.PushBack(task, function(){
				busy_ = false;
			});
			TaskManager.Run(task);
		}
	}
	public function refresh(){ 
		if(isOpen_){
			if(this.isSwap()){
				if(selected_){
					doOpenSelect();
				}else{
					doCloseSelect();
				}
				
			}else if(isMagic()){
				doMagic();
			}
		}else{
		
			var close:Task = TaskManager.Create("view.hud.pop.close") as Task;
			queue_.Enqueue(close);
			
		}
	}
	public function openSelect(){
		selected_ = true;
		refresh();
	}
	public function closeSelect(){
		selected_ = false;
		refresh();
	}
	public function open(){
		isOpen_ = true; 
		refresh();
	}
	
	public function close(){
		isOpen_ = false; 
		refresh();
	}
}