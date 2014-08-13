#pragma strict

class EZLayerTexturePair{
	private var first_:EZLayerTexture = null;
	private var second_:EZLayerTexture = null;
	
	public function set first(value:EZLayerTexture){
		this.first_ = value as EZLayerTexture;
	}
	
	public function set second(value:EZLayerTexture){
		this.second_ = value as EZLayerTexture;
	}
	public function refresh(position:Vector3){
		first_.refresh(position);
		second_.refresh(position);
	}
}