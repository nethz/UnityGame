#pragma strict

class EZCardViewCompEnabler extends EZCardViewEnabler{
	public var _mark:String = "mark";
	public var _seat:String = "seat";
	public var _full:String = "full";
	public var _model:EZCardCompModel = null;
	
	public function getEnable(card:EZCardViewInfo, data:EZCard):EZCheckerInfo{
	
		
		var checker:EZCompChecker = EZCompChecker.GetInstance();
		
		if(card.mainSelected || card.selected){
			return new EZCheckerInfo();
		}
		
		if(_model.full()){
			return new EZCheckerInfo(_full);
		}
		
		 if(_model.main){
			var info:EZCheckerInfo = checker.canMaterial(_model.main, data);
			if(!info.result){
				return info;
			}
		}else{
			var mInfo:EZCheckerInfo = checker.canMain(data);
			if(!mInfo.result){
				return mInfo;
			}
		} 
		
		return new EZCheckerInfo();
		
	}
	
}