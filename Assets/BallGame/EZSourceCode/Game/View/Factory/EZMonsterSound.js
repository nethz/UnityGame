#pragma strict
class EZMonsterSound extends MonoBehaviour{
	public class Sound{
	
		public var _attack:EZSound[] = null;
		public var _magic:EZSound[] = null;
		public var _provoke:EZSound[] = null;
		public var _hurt:EZSound[] = null; 
		public var _medical:EZSound[] = null; 
		public var _blood:EZSound[] = null; 
		public var _dot:EZSound[] = null; 
			
		public function get medical():EZSound{
			return _medical[Random.Range(0, _medical.Length)];
		}
		
		public function get blood():EZSound{
			return _blood[Random.Range(0, _blood.Length)];
		}
		public function get dot():EZSound{
			return _dot[Random.Range(0, _dot.Length)];
		}
		
		
		public function get attack():EZSound{
			return _attack[Random.Range(0, _attack.Length)];
		}
		public function get magic():EZSound{
			return _magic[Random.Range(0, _magic.Length)];
		}
		public function get provoke():EZSound{
			return _provoke[Random.Range(0, _provoke.Length)];
		}
		public function get hurt():EZSound{
			return _hurt[Random.Range(0, _hurt.Length)];
		}
	
	}
	public enum Type{ 
	
		Universal = 0,
		Archer = 1,
		Robot = 2,
		Saber = 3,
		Blunt = 4,
		Paw = 5, 	
		Caster = 6, 
		Ohter1 = 7,
		Ohter2 = 8,
		Ohter3 = 9,
	}; 
	public var _sound:Sound[] = null;
	public var _attackSound:PetSoundEffect = null;
	
	private static var instance_:EZMonsterSound = null;
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance():EZMonsterSound{
		return this.instance_;
	}
	
	public function getSound(type:int):EZMonsterSound.Sound{
		if(type>= 0 && type<=_sound.Length){
			return  _sound[type];
		}
		return _sound[EZMonsterSound.Type.Universal];
	}
	
	public function getSoundByAttackTypes(from:PetSoundEffect.AttackType,to:PetSoundEffect.DefenseType):EZSound{
		return _attackSound.getSoundByTypes(from,to);
	}
	
}