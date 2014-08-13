#pragma strict

class PetSoundEffect extends MonoBehaviour{
	class MAudioClip{
		public var name:String = "";
		public var sound:EZSound = null;
	}
	
	public enum AttackType{
		Nomal = 0,
		WoodBlunt,
		Fist,
		Arrow,
		Bullet,
		Slash,
		Impact,
	};
	
	public enum DefenseType{
		Nomal = 0,
		Meat,
		Metal,
		Corselet,
	};
	
	public var _nomalSound:EZSound = null;
	public var _attackedSounds:MAudioClip[] = null;
	
	private var attakedTable:Hashtable = new Hashtable();
	
	function Awake(){
		for(var i:int=0;i<_attackedSounds.Length;++i){
			attakedTable[_attackedSounds[i].name] = _attackedSounds[i].sound;
		}
	}
	
	public function getSoundByTypes(from:AttackType,to:DefenseType):EZSound{
		var name:String = Enum.GetName(typeof(AttackType), from) + Enum.GetName(typeof(DefenseType), to);
		if (attakedTable.ContainsKey(name)){
			var sound:EZSound = attakedTable[name];
			return sound;
		}
		return _nomalSound;
	}
}