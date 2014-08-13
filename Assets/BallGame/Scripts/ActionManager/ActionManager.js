#pragma strict

class ActionObj{
	public var execute:Function = function(){};
}

class ActionManager{

	private static var actionMap_:Hashtable = new Hashtable(); 
	static function registerFunction(key:String, act:Function){
		var factory = function(){
			var action:ActionObj = new ActionObj();
			action.execute = function(){
				act();
			};
			return action;
		};
		this.actionMap_[key] = factory;
	}
	static function unregisterAction(key:String){
		this.actionMap_.Remove(key);
	}
	static function unregisterFunction(key:String){
		this.unregisterAction(key);
	}
	static function registerAction(key:String, factory:Function){
		
		this.actionMap_[key] = factory;
	}

	
	static function Run(key:String){
		 var action = ActionManager.Create(key) as ActionObj;
		 if(action){
		 	this.Run(action);
		 }else{
		 	Debug.LogError("no action:"+ key);
		 }
	}
	
	static function Run(action:ActionObj){
		 action.execute();
	}
	
	static function has(key:String):boolean{
		return this.actionMap_.ContainsKey(key);
	}
	
	
	static public function Create(key:String) : ActionObj{
		var factory:Function = this.actionMap_[key] as Function;
		if(factory != null)
			return factory() as ActionObj;
		return null;
	   
	} 
	static function clear(){
		this.actionMap_.Clear();
	}
};