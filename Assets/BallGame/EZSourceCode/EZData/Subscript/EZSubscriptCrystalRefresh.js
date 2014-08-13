#pragma strict

class EZSubscriptCrystalRefresh extends EZSubscriptRefresh{
	public var _talbe:EZMagicBallTable = null;
	public function getList():List.<String>{
		var list:List.<String> = new List.<String>(); 
		var magicBall:JsonData.MagicBall = _talbe.data;
		
		for(var i:int = 0; i<magicBall.ballBag.balls.Length; ++i){
			list.Add("b" + magicBall.ballBag.balls[i].group.ToString());
		}
		
		
		for(var j:int = 0; j<magicBall.cryBag.cries.Length; ++j){
			list.Add("c" + magicBall.cryBag.cries[j].id.ToString());
		}
		return list;
	}
}