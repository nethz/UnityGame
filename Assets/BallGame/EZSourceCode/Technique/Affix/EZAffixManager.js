#pragma strict

class EZAffixManager extends MonoBehaviour{
	public var _factories:EZAffixFactories;
	private static var instance_:EZAffixManager = null;
	public function Awake(){
		this.instance_ = this;
	}
	public static function instance(){
		return instance_;
	}
	
	public function createAffix(info:JsonData.JsonPack):EZAffix{
		return _factories.create(info);
	}
};