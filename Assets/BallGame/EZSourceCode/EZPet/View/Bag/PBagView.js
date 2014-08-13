#pragma strict

class PBagView extends MonoBehaviour{
	public var _cards:PCardsView = null;
	public var _affix:PAffixView = null;
	
	public function get cards():PCardsView{
		return _cards;
	}
	
	public function get affix():PAffixView{
		return _affix;
	}
}