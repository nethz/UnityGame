#pragma strict
import System.Collections.Generic;

class EZQuestMinorSetup{
	private var list_:List.<JsonData.Quest> = new List.<JsonData.Quest>();
	private var title_:String = "";
	private var progress_:String = "";
	private var subscript_:EZSubscript = null;
	public function EZQuestMinorSetup(subscript:EZSubscript, type:String, list:List.<JsonData.Quest>){
		title_ = type;
		subscript_ = subscript;
		for(var i:int =0; i<list.Count; ++i){
			if(list[i].classify == type){
				list_.Add(list[i]);
			}
		}
	}
	public function get subscript():EZSubscript{
		return subscript_;
	}
	function get list():List.<JsonData.Quest>{
		return list_;
	}
	
	public function get title(){
		return title_;
	}
	
	public function get progress(){
		var passNum:int = 0;
		for(var i:int = 0;i<list_.Count;++i){
			if(list_[i].isPass()){
				passNum++;
			}
		}
		progress_ = passNum + "/" + list_.Count;
		return progress_;
	}
}