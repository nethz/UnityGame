#pragma strict

class EZFoeBattle extends EZFoeContainer{


	public var _method:GeekTweener.Method = GeekTweener.Method.easeOutExpo;
	public function swapTask(bag:EZFoeBag):Task{
		if(bag.pet.body)
		{
			var task:Task = new Task();
			var tp1:TweenAbsPosition = null;
			var tp2:TweenAbsPosition = null;
			task.init = function(){ 
				var p1:Vector3 = bag.pet.body.gameObject.transform.position;
				tp1 =  TweenAbsPosition.Begin(this.pet.body.gameObject, 0.3, p1);
				tp1.method = _method;
				var p2:Vector3 = this.pet.body.gameObject.transform.position;
				tp2 =  TweenAbsPosition.Begin(bag.pet.body.gameObject, 0.3, p2);
				tp2.method = _method;
			
			};
			task.isOver = function():boolean{
				return (!tp1.enabled)&&(!tp2.enabled);
			};
			task.shutdown = function(){
				this.swap(bag);
			};
			return task;
		}
		return new Task();
	}
	public function swap(other:EZFoeBag){
	
		var bag:EZPet = other.pet;
		
		var battle:EZPet = this.pet;
		
		this.pet = bag; 
		bag.gameObject.transform.parent = this.gameObject.transform;
		
		other.pet = battle;
		battle.gameObject.transform.parent = other.gameObject.transform;
		
	
	}

	
}