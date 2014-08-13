#pragma strict
class EZNewsMessageSubscript extends EZSubscript{
	public var _table:EZMessageBagTable = null;
	public function get number():int{
	
		
		
		if(_table.news){
			Debug.LogWarning("news:" +"aaa");
			return _table.news.Length;
		}
			Debug.LogWarning("news:" +"bbb");
			
		return 0; 
	}
	
}