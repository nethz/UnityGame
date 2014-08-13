#pragma strict
class Filter{
	private var num_:int = 0;
	private var filters_:float[] = new float[15];
	
	function Filter(){
		for(var i = 0;i<filters_.length; ++i){
			this.filters_[i] = 0.015;
		}
		
	}
	
	function interval(d:float){
		this.filters_[num_] = d;
		num_++;
		if(num_ >= 15)
			num_ = 0;
		var all:float = 0;
		for(var i =0; i<15; ++i){
			all += this.filters_[i];
		}
		return (all/15);
	
	}
};