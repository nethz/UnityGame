#pragma strict

class EZSufferBeatingEffect extends MonoBehaviour{
	public var _attack:AttackMedicalAnimation = null;
	public var _medical:AttackMedicalAnimation = null;
	public var _blood:AttackMedicalAnimation = null;
	public var _dot:AttackMedicalAnimation = null;
	
	public var _attackSound:EZSound = null;
	public var _medicalSound:EZSound = null;
	public var _bloodSound:EZSound = null;
	public var _dotSound:EZSound = null;
	
	public function resetAttack(position:Vector3,scale:Vector3){
		_attack.gameObject.transform.localPosition += position;
		_blood.gameObject.transform.localPosition += position;
		_attack.gameObject.transform.localScale = scale;
		_blood.gameObject.transform.localScale = scale;
	}

	public function resetMedical(position:Vector3,scale:Vector3){
		_medical.gameObject.transform.localPosition += position;
		_medical.gameObject.transform.localScale = scale;
	}
	
	public function resetDot(position:Vector3,scale:Vector3){
		_dot.gameObject.transform.localPosition += position;
		_dot.gameObject.transform.localScale = scale;
	}
	
	public function showAttacked(){
		_attack.Reset();
		//_attackSound.play();
	}
	
	public function showMedical(){
		_medical.Reset();
		//_medicalSound.play();
	}

	public function showBlood(){
		_blood.Reset();
		//_bloodSound.play();
	}
	
	public function showDot(){
		_dot.Reset();
		//_dotSound.play();
	}
	
	
}