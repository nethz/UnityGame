#pragma strict

import System.Collections.Generic;

class EZBindHandler{
	
	
	//private var ghostQueue_ : List.<String> = new Queue.<String>();
	public  static function GetList(soul:EZSoul):List.<EZBindData>{
		var buffHandler:EZBuffHandler = soul.getBuffHandler();
		var dotHandler:EZDotHandler = soul.getDotHandler();
		var state:EZBossSoulState = EZShiftHandler.GetState(soul);
		buffHandler.refresh();
		dotHandler.refresh();
		var list:List.<EZBindData> = new List.<EZBindData>();
		if(state != null){
			var stateData:EZBindData = EZBindTable.GetInstance().create(state.name, Geek.MagicType.None);
			if(stateData){
				stateData.val = state.val;
				stateData.number = state.number;
				list.Add(stateData);
			}
		}
		var buffs:EZBuff[] = buffHandler.buffs;
		for(var i:int = 0; i< buffs.length; ++i){
			if(buffs[i].enabled){
				var buffData:EZBindData = buffs[i].data;
				if(buffData && buffData.count != -1){
					list.Add(buffData);
				}
			}
		
		}
		
		
		var dots:EZDot[] = dotHandler.dots;
		for(var j:int = 0; j< dots.length; ++j){
			if(dots[j].enabled){
				var dotData:EZBindData = dots[j].data;
				if(dotData && dotData.count != -1){
					list.Add(dotData);
				}
			}
			
		}
		
		return list;
	}
}