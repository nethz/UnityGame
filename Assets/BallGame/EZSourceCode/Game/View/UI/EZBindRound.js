#pragma strict


class EZBindRound extends EZBindString{
	
	public var offset:int = 0;
	public var _negative:boolean = false;
	public function text(data:EZBindData):String{
		if(_negative){
			return  (-data.number + offset).ToString();
		}
		return (data.number + offset).ToString();
	}
}