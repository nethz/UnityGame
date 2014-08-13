#pragma strict

class EZSpeciallyEffectManager{
	enum Type{
		Selected,
		None
	}
	static function Create(type:EZSpeciallyEffectManager.Type){
		var effect:EZSpeciallyEffect = null;
		switch(type){
		case Type.Selected:
			effect = new EZSpeciallySelected();
			break;
		case Type.None:
			effect = new EZSpeciallyNone();
			break;
		}
		return effect;
	}

}