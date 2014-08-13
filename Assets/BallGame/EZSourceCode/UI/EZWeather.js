#pragma strict

class EZWeather extends MonoBehaviour{
	private var weather_:JsonData.Weather = null;
	public var _json:String = "";
	public var _changeTime:float = 20;
	private var next_:JsonData.Sky = null;
	public var _rain:EZRain = null;
	public var _debug:String = "";
	public var _changes:EZChange[]; 
	private var runner_:TaskRunner = null;
	public function Awake(){
		runner_ = TaskRunner.Create(this.gameObject) as TaskRunner;
	}
	public function Start(){
	
		
	}

	public function setup(weather:JsonData.Weather){
		weather_ = weather;
		var epoch:double = EZTimestamp.GetInstance().epoch;
		var now:JsonData.Sky = getNow(epoch);
		this.showWeather(now.weather);
		var time:double = epoch + _changeTime/2;
		next_ = this.getNext(time);
	}
	
	
	public function getNow(epoch:double):JsonData.Sky{
		var now:JsonData.Sky = weather_.sky[0];
		for(var i:int = 0; i<weather_.sky.Length; ++i){
			if(weather_.sky[i].time > epoch){
				return now;
			}else{
				now = weather_.sky[i];
			}
		}
		return null;
	
	}
	
	public function getNext(epoch:double):JsonData.Sky{
		
		for(var i:int = 0; i<weather_.sky.Length; ++i){
			if(epoch < weather_.sky[i].time){
				return weather_.sky[i];
			}
		}
		return null;
	
	}
	public function showWeather(weather:String){
		for(var i:int= 0; i<_changes.length; ++i){
			_changes[i].showWeather(weatjer2Id(weather));
		}
		if(weather == "rain"){
			_rain.open();	
		}else{
			_rain.close();
		}
	}
	public function weatjer2Id(weather:String):int{
		var ret:int = 0;
		switch(weather){
			case "day":
			 	ret = 0;
				break;
			case "dusk":
			 	ret = 1;
				break;
			case "night":
				ret = 2;
				break;
			case "rain":
				ret = 3;
				break;
		}
		return ret;
	}
	public function weatherTask(weather:String, time:float):Task{
		var mt:MultiTask = new MultiTask();
		var id:int =  weatjer2Id(weather);
		for(var i:int= 0; i<_changes.length; ++i){
			mt.push(_changes[i].change(time, id));
		}
		
		TaskManager.PushBack(mt, function(){
			if(weather == "rain"){
				_rain.open();	
			}else{
				_rain.close();
			}
		});
	
				
		
		return mt;
	}
	public function Update(){
		if(next_ != null){
			var epoch:double = EZTimestamp.GetInstance().epoch;
			var time:double = epoch + _changeTime /2;
			_debug = ""+epoch;
			if(time > next_.time){
						
				Debug.LogWarning("Wether" + time +":" + next_.time +":" + next_.weather);
				var task:Task = weatherTask(next_.weather, _changeTime);
				runner_.addTask(task);
				next_ = this.getNext(time);
				if(next_)
				Debug.LogWarning("Wether2" + time +":" + next_.time +":" + next_.weather);
			}
		}
		
	}
	
	
}