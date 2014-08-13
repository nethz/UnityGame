#pragma strict

class EZTableSort extends MonoBehaviour{
	public var _tables:UITable[] = null;
	public var _table:UITable = null;
	
	
	public function sort(){
		for(var i:int = 0;i<_tables.length;++i){
			_tables[i].repositionNow = true;
		}
		_table.repositionNow = true;
	}
}