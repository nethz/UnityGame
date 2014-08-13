#pragma strict

class EZCardViewInfoEnabler extends EZCardViewEnabler{

	//public var _selected:String = "in selected";
	public function getEnable(card:EZCardViewInfo, data:EZCard):EZCheckerInfo{
		//if(card.mainSelected || card.selected){
	//		return EZCheckerInfo(_selected);
	//	}
		
		return EZCheckerInfo();
	}
	
	
}