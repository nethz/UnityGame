#pragma strict

class EZBossSoul extends EZSoul{
	private var state_:EZBossSoulState = null;
	private var stateMap_:Hashtable = new Hashtable();
	public function get boss():boolean{
		return (stateMap_.Count > 1);
	}
	public function get state():EZBossSoulState{
		return state_;
	} 
	public function get baseProperty():EZBaseProperty{
		return state_.baseProperty;
	}
	public function setState(state:EZBossSoulState){
		if(state_){
			state_.close();
		}
		if(state){
			if(state_){
				 this.health_ = this.health_ * state.baseProperty.maxHealth/ state_.baseProperty.maxHealth;
			}else{
				this.health_ = state.baseProperty.maxHealth;
			}
		}
		state_ = state;
		if(state_){
			state.open();
		}
	}
	private function load(data:JsonData.Boss){
		this.loadNature(data.natureProp);
		loadAppear(data.appear);
		for(var i:int = 0; i < data.states.length; ++i){ 
			var state:EZBossSoulState = new EZBossSoulState(); 
			state.load(this.gameObject, data.states[i]);
			stateMap_[data.states[i].name] = state;
		}
		this.setState(stateMap_[data.states[0].name] as EZBossSoulState);
		
	}
	
	private function EZBossSoul(){	
	}
	
	public function hasMagic():boolean{
		if(state_){
			return state_.hasMagic();
		}
		return false;
	}
	public function hasSkill():boolean{
		if(state_){
			return state_.hasSkill();
		}
		return false;
	}
	
	
	public function changeState(stateName:String){
		Debug.Log("state:"+ stateName); 
		if(stateMap_.ContainsKey(stateName)){
			var state:EZBossSoulState = stateMap_[stateName] as EZBossSoulState; 
			setState(state);
		}
	}
	public static function Create(data:JsonData.Boss):EZBossSoul{ 
	 
		var obj:GameObject = EZSoul.CreateGameObject();
		var soul:EZBossSoul = obj.AddComponent("EZBossSoul") as EZBossSoul;
		var iface:EZBossInterface = obj.AddComponent("EZBossInterface") as EZBossInterface;
		iface._soul = soul;
		soul.load(data);
		obj.name = soul.style;
		return soul;
		
	}
	 
	public function get baseAttack():float{  
		return baseProperty.attack; 
	
	}  
	
	
	 
	public function get baseLv():float{  
		return baseProperty.lv;
	}  
	
	
	public function get baseQuality():float{  
		return baseProperty.quality;
	}  
	public function get baseMaxHealth():float{  
	
		return baseProperty.maxHealth; 
	}  
	
	
 	public function get baseSpeed():float{  
		return baseProperty.speed; 
	
	}  
	
	//private var magic_:EZTechnique = null;
	//private var skill_:EZTechnique = null;
	//private var attack_:EZTechnique = null;
	
	public function get magic():EZTechnique{
		if(state_ && state_.active){
			var type:EZCalculatorAction.Type = EZCalculatorAction.Type.None;
			type = state_.tech.doIt();	
			if(type == EZCalculatorAction.Type.Magic){
				return  state_.tech.magic;
			}
		}
		return null;
	}	
	
	//public function get skill():EZTechnique{
	//	return skill_;
	//} 
	public function get attack():EZTechnique{
	
		if(state_ && state_.active){
			var type:EZCalculatorAction.Type = EZCalculatorAction.Type.None;
			type = state_.tech.doIt();	
			if(type == EZCalculatorAction.Type.Attack){
				
				return  state_.tech.attack;
			}
		}
		return null;
	} 
	
	public function thinking(){
	
		//magic_ = null;
		//skill_ = null;
		//attack_ = null;
		magicPower_ = 0;
		attackPower_ = 0;
		skillPower_ = 0;
		
		
		var handler:EZBuffHandler = this.getBuffHandler();
		handler.refresh();
		if( handler.deposit()){
			return;
		}
		if(state_.tech){
			state_.tech.thinking();
		}
		if(state_ && state_.active && !handler.ignore()){
			
			magicPower_ = 1;
			attackPower_ = 1;
			skillPower_ = 1;
		}
		
	} 

	


};
