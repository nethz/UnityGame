#pragma strict

class PlaceholderUnit extends EZUIAutoItemUnitInterface{
	public function alphaTask(alpha:float, allTime:float):Task{
		return new Task();
	}
}