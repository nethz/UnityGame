#pragma strict
class EZQuestMessageSubscript extends EZSubscript{
	public var _table:EZMessageBagTable = null;
	
	public function get number():int{
		
		if(_table.quest){
			return _table.quest.Length;
		}
			
		return 0; 
	}
}