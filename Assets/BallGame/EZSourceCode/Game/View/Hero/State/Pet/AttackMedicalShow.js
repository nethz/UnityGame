#pragma strict

class AttackMedicalShow extends MonoBehaviour{
	enum EffectType{
		Attack,
		Medical,
		None,
	};
	
	public var _attack:AttackMedicalAnimation = null;
	public var _medical:AttackMedicalAnimation = null;
	public var _attackSound:EZSound = null;
	public var _medicalSound:EZSound = null;
	
	public function get attack():AttackMedicalAnimation{
		return _attack;
	}

	public function get medical():AttackMedicalAnimation{
		return _medical;
	}
	
	public function showAttacked(){
		_attack.Reset();
		_attackSound.play();
	}
	
	public function showMedical(){
		_medical.Reset();
		_medicalSound.play();
	}
	
	
}