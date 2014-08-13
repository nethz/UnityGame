#pragma strict

class EZMessageButtonsManager extends MonoBehaviour{
	public var _table:UITable = null;
	public var _news:EZMessageButton = null;
	public var _quest:EZMessageButton = null;
	public function setup(){
		var  table:EZMessageBagTable = EZMessageBagTable.GetInstance();
		
		
		if(table && table.news){
			_news.setup(table.news.Length);
		}else{
			_news.setup(0);
		}
		
		if(table && table.quest){
			_quest.setup(table.quest.Length);
		}else{
			_quest.setup(0);
		}
		
		_table.repositionNow = true;
	}
}