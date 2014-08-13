#pragma strict

class EZCryNormalState extends StateWithEventMap{
	private var normal_:EZCryNormalCtrl;
	function EZCryNormalState(normal:EZCryNormalCtrl){
		normal_ = normal;
		addEvent("go_back", "go.home");
		addEvent("weixin", "go.weixin");
	}
	public function start(){
	
		var magicBall:EZMagicBallTable = EZMagicBallTable.GetInstance();
		var crystal:EZCrystalTable = EZCrystalTable.GetInstance();
		normal_.load();
		normal_.open();
	}
	public function over(){
		//normal_.close();
	}
	
	function postEvent(evt:FSMEvent){
		var crystal:JsonData.Crystal = EZCrystalTable.GetInstance().data;
		var magicBall:JsonData.MagicBall = EZMagicBallTable.GetInstance().data; 
		if(evt.msg == "ball"){
			var view:EZMagicBallView = evt.obj.GetComponent.<EZMagicBallView>();
			if(view){
				normal_.ballSelected(view.id);
				crystal.ball = magicBall.getBall(view.id);
				EZCrystalTable.GetInstance().save(crystal);
				Debug.Log(crystal.ball.exp + "exp");
			}
		}else if(evt.msg == "spell"){
			var spell:EZCrySpellView = evt.obj.GetComponent.<EZCrySpellView>();
			if(spell){
				normal_.spellSelected(spell.id);
				crystal.cry = magicBall.getCry(spell.id);
				EZCrystalTable.GetInstance().save(crystal);
			}
		}
		return super.postEvent(evt);
	}
}