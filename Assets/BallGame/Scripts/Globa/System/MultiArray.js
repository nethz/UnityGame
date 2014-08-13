#pragma strict

class MultiArray
{
	var list_:Object[] = null;
	var width_:int = 0; 
	var height_:int = 0;
	function MultiArray(width:int, height:int){
		this.width_ = width;
		this.height_ = height;
		this.list_ = new Ball[width* height];
		for(var x:int =0 ;x<width; ++x)
		{
			for(var y:int = 0; y<height; ++y){
				this.list_[this.index(x, y)] = null;
			}
			
		}
	}
	function getObj(x:int, y:int){
		return this.list_[this.index(x, y)];
	}
	private function index(x:int, y:int){
		return (x+y*this.width_);
	}
	function setObj(x:int, y:int, obj:Object){

		this.list_[this.index(x, y)] = obj;
	}
	
	

}