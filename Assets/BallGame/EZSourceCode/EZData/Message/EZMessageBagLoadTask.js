#pragma strict


class EZMessageBagLoadTask extends TaskList{
	private var bag_:JsonData.MessageBag = null;
	private var newsList_:List.<JsonData.Message> = new List.<JsonData.Message>();
	private var questList_:List.<JsonData.Message> = new List.<JsonData.Message>();
	
	
	public function addMessage(message:JsonData.Message){
		if(message.mode == "news"){
			newsList_.Add(message);
		}else{
			questList_.Add(message);
		}
	}
	
	public function get news():List.<JsonData.Message>{
		return newsList_;
	}
	
	
	public function get quest():List.<JsonData.Message>{
		return questList_;
	}
	public function get bag():JsonData.MessageBag{
		return this.bag_;
	}
	public function set bag(value:JsonData.MessageBag){
		bag_ = value;
	}
	
};