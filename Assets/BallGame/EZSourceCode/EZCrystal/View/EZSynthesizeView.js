#pragma strict

class EZSynthesizeView extends MonoBehaviour{
	public var _synthesizeCallback:EZButtonCallback;
	
	public function Awake()
	{
		_synthesizeCallback.setup(this.synthesize, "synthesize");
	}
	
	public function synthesize(name:String)
	{
	
	}
}