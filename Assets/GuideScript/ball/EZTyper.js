#pragma strict

class EZTyper extends MonoBehaviour{
	private var text_:String = "";
	public var _text:UILabel = null;
	private var time_:float = 0;
	private var dTime_:float = 0;
	private var n_:int = 0;
	public function Start(){
		//setText("this is a game \nand you are pig\n ha[444433]力[-]hahaha\n", 0.1); 
		//addText("this is a game \nand you are pig\n ha[444433]力[-]hahaha", 0.1); 
	}
	
	public function setText(text:String, dTime:float){
		dTime_ = dTime;
		time_ = 0;
		text_ = text;
		n_ = 0;
	}
	
		
	public function addText(text:String, dTime:float){
		dTime_ = dTime;
		time_ = 0;
		text_ += text;
	}
	
	public function Update(){
		if(n_ < text_.Length){ 
			time_ += Time.deltaTime; 
			if(time_ > dTime_){
				time_ -= dTime_; 
				
				if(text_.Substring(n_, 1) == "["){ 
					do{
						 n_++;
					}while(text_.Substring(n_, 1) != "]");
				} 
				n_++; 
				if(n_ >= text_.Length){
					_text.text = text_;
				}else{
					_text.text = text_.Substring(0, n_);
				}
				
			}
		}
	}

}