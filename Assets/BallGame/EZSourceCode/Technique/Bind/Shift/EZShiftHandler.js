#pragma strict

class EZShiftHandler{
	private var shifts_:EZShift[] = null;
	private var obj_:GameObject = null;
	class Ret{
		var state:String;
		var effect:String;
	}
	function refresh(soul:EZSoul){
		
		obj_ = soul.gameObject;
		shifts_ = System.Array.ConvertAll(
			obj_.GetComponents(EZShift),
			function (component){component as EZShift;}
			);
	}
	/*public function round(){
		if(shifts_){
			for(var i:int =0; i <shifts_.Length; ++i){
				if(shifts_[i] && shifts_[i].enabled){
					shifts_[i].round();
				}
			}
		
		}
	
	}*/
	
	//static public function GetState(soul:EZSoul):String{
	//	var boss:EZBossSoul = soul.gameObject.GetComponent(EZBossSoul);
	//	if(boss){
	//		return boss.state.name;
	//	}
	//	return "";
	//}
	static public function GetState(soul:EZSoul):EZBossSoulState{
		var boss:EZBossSoul = soul.gameObject.GetComponent(EZBossSoul);
		if(boss){
			return boss.state;
		}
		return null;
	}
	public function shifted():EZShiftHandler.Ret{
		var ret:EZShiftHandler.Ret = new EZShiftHandler.Ret();
		if(shifts_){
			for(var i:int = 0; i< shifts_.length; ++i){
				if(shifts_[i].enabled){
					ret.state = shifts_[i].shifted();
					if(!String.IsNullOrEmpty(ret.state)){
						ret.effect = shifts_[i].effect;
						break;
					}
				}
			}
		}
		if(!String.IsNullOrEmpty(ret.state)){
			obj_.SendMessage("changeState", ret.state, SendMessageOptions.RequireReceiver);
		}
		return ret;
	}
	
}