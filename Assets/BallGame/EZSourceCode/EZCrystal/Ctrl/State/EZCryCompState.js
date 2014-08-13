#pragma strict

class EZCryCompState extends StateWithEventMap{
	private var comp_:EZCryCompCtrl;
	function EZCryCompState(comp:EZCryCompCtrl){
		comp_ = comp;
		addEvent("weixin", "go.weixin");
	}
	public function start(){
		var magicBall:EZMagicBallTable = EZMagicBallTable.GetInstance();
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		comp_.setup(magicBall.data, crystal.data);
		comp_.open();
		
	}
	public function over(){
		comp_.close();
	}
	

}