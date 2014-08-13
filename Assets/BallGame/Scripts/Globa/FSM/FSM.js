#pragma strict

class FSM
{
	private var states = {};
	private var curr_state = new Array();
	function FSM(){
		var root:State = new State();
		root.name = "root";
		this.states["root"]  = root;
		this.curr_state.push(root);
	}
	function addState(state_name:String, state:State, father_name:String){	
		var self = this;
		state.constructed();
		state.name = state_name;
		if(father_name == ""){
			state.father_name = "root";
		}
		else{
			state.father_name = father_name;
		
		}
		state.getCurrState = function(name:String){	
			for(var i = 0; i< self.curr_state.length; ++i){
				var s:State = self.curr_state[i] as State;
				if(s.name == name)
				{
					return s;
				}
				
			}							
								
			return null;
		};
		
		
		self.states[state_name] = state;
		
	}
	function print(){
		for(var i =0; i< this.curr_state.length; ++i){
		    var state:State = this.curr_state[i] as State;
			Debug.Log("i:" + i +"," +state.name);
		}
	}
	function translation(name)
	{
		var self = this;
		
		var target:State = self.states[name] as State;//target state
		
		if (!target)//if no target return!
		{
			return;
		}
		
		
		//if current, reset
		if(target == self.curr_state[self.curr_state.length-1])
		{
			target.over();
			target.start();
			return;
		}
		
		
		
		var public_state:State = null;
		
		var state_list = new Array();
		
		var temp_state:State = target;
		var father_name = temp_state.father_name;
		
		//do loop 
		while(temp_state != null)
		{
			//reiterator current list
			for(var i = self.curr_state.length -1; i >= 0; i--){
				var state:State = self.curr_state[i] as State;
				//if has public 
				if(state == temp_state){
					public_state = state;	
					break;
				}
			}
			
			//end
			if(public_state != null){
				break;
			}
			
			//else push state_list
			state_list.unshift(temp_state);
			
			if(father_name){
				temp_state = self.states[father_name] as State;
				father_name = temp_state.father_name;
			}else{
				temp_state = null;
			}
		
		}
		//if no public return
		if (public_state == null){
			return;
		}
		
		var newCurrState = new Array();
		var under = true;
		//-- 析构状态
		for(var i2 = self.curr_state.length -1; i2>=0; --i2)
		{
			var state2:State = self.curr_state[i2] as State;
			if(state2 == public_state)
			{
				under = false;
			}
			if(under){
				state2.over();
			}
			else{
				newCurrState.unshift(state2);
			}
			
		}
	
		
		//-- 构建状态
		for(var i3 = 0; i3 < state_list.length; ++i3){
			var state3:State = state_list[i3] as State;
			state3.start();
			newCurrState.push(state3);
		}
		self.curr_state = newCurrState;
	}
	
	function getCurrState(name:String):State
	{
		var self = this;
		for(var i =0; i< self.curr_state.length; ++i)
		{
			var state:State = self.curr_state[i] as  State;
			if(state.name == name)
			{
				return state;
			}
		}
		
		return null;
	
	}
	
	function init(state_name:String){
		var self = this;
		self.translation(state_name);
	}


	function shutdown(){
		for(var i = this.curr_state.length-1; i>=0; --i){
			var state:State =  this.curr_state[i] as State;
			state.over();
		}
		this.curr_state = null;  
	}
	function update(d:float){
	
		for(var i =0; i< this.curr_state.length; ++i)
		{
			var state:State = this.curr_state[i] as State;
			var stateName:String= state.update(d) as String;
			if(stateName){
				this.translation(stateName);
				break;
			}
		}
	}
	function post(msg:String){
		var evt:FSMEvent = new FSMEvent();
		evt.msg = msg;
		this.postEvent(evt);
	}
	function postEvent(evt:FSMEvent){
		for(var i =0; i< this.curr_state.length; ++i){
		    var state:State = this.curr_state[i] as State;
		    var stateName:String = state.postEvent(evt) as String;
			if(stateName){
				this.translation(stateName);
				break;
			}
		}
	}
		
};

