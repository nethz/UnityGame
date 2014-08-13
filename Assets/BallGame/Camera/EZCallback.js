#pragma strict

class EZCallback{
	
	private var onEnd_:Function;
	private var size_:int = 0;
	private var count_:int = 0;
	function EZCallback(onEnd:Function){
		onEnd_ = onEnd;
	}
	function back(call:Function):Function{
		++size_;
		return function(){
			call();
			++count_;
			if(count_ == size_){
				onEnd_();
			}
		};
	}
}