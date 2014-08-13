#pragma strict

class EZRivalStronghold extends EZStronghold{
	
	public function get type():EZStronghold.Type{
		return EZStronghold.Type.Rival;
	}
	
	public function get battle():EZThePosition{
		return null;
	}
	
	public function get bag1():EZThePosition{
		return null;
	}
	
	public function get bag2():EZThePosition{
		return null;
	}
	
	public function thinking(){
	
	
	}
}