#pragma strict

class EZGameOverStronghold extends EZStronghold{
	public function get type():EZStronghold.Type{
		return EZStronghold.Type.GameOver;
	}
}