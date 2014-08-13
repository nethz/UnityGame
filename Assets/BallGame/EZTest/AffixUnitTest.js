#pragma strict



class AffixUnitTest extends MonoBehaviour {
	public var _json0:String = '{"type":"attack","name":"none","info":"none","coefficient":0.5}';
	public var _json1:String = '{"type":"combo","name":"none","info":"none","attacks":[{"coefficient":0.5},{"coefficient":0.5},{"coefficient":0.5}]}';
	public var _json2:String = '';
	public var _json3:String = ''; 
	public var _power:float = 0.0f;
	public var _attack:float = 0.0f;
	public var _from:EZSoul.Seat;
	public var _to:EZSoul.Seat;
	private var affixs_:Array= new Array();
	function Start () {
	  
	  
	  	var wait:EZWaitTask = new EZWaitTask();
	  	wait.setAllTime(0.3);
	  	wait.shutdown = function(){
	  		var context:EZAffixContext = new EZAffixContext();
			context.from = _from;
			context.to = _to;
			context.power = _power;
			context.attack = _attack;
			
			var data:EZTechData = context.root;
			
		
			
			
			var affix:EZAffix = addAffix(JsonData.JsonPack.Load(_json0)); 
			if(affix){ 
				affix.executeIt(context);
			}
			postResult("affix0", context);
			 
			var combo:EZAffix = addAffix(JsonData.JsonPack.Load(_json1));
			 if(combo){
				combo.executeIt(context); 
				
			}
			postResult("affix1", context);
			
			
			var addAffix:EZAffix = addAffix(JsonData.JsonPack.Load(_json2));
			
			if(addAffix){
				addAffix.executeIt(context); 
			}
			postResult("affix2", context);
			
			var hurtAffix:EZAffix = addAffix(JsonData.JsonPack.Load(_json3));
			if(hurtAffix){
				hurtAffix.executeIt(context); 
			}
			postResult(context, this.gameObject);
	  	};
	  
		
		
		TaskManager.Run(wait);
		
		
		
	}
	public function postResult(type:String, context:EZAffixContext){
		var go:GameObject = new GameObject();
		go.transform.parent = this.transform;
		go.name = type;
		postResult(context, go);
	}
	public function postResult(context:EZAffixContext, obj:GameObject){
	
		var result:AffixUnitTestResult =  obj.AddComponent(AffixUnitTestResult);
		result.push(context.root, context.to);
		
	}
	public function unittest(){
	 
	 	var context:EZAffixContext = new EZAffixContext();
		for(var i:int= 0; i<affixs_.length; ++i ){
			var affix:EZAffix = affixs_[i] as EZAffix;
			affix.executeIt(context);
		
		}
	
	}
	public function addAffix(data : JsonData.JsonPack):EZAffix{
		var affix:EZAffix = EZAffixManager.instance().createAffix(data);
		
		return affix;
		
	}
	
	
	function Update () {

	}

}
