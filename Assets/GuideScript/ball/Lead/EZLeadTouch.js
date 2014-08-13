#pragma strict
class EZLeadTouch extends MonoBehaviour{
	public var _input:EZInput = null;
	public var _id:String = "";
	public var _magic:EZLeadMagic = null;
	public var _swap:EZLeadSwap = null;
	public var _info:EZLeadInfo = null;
	public function OnPress(press:boolean){
		if(!press){
			
			if(_magic){
				_magic.touch(_id);
			}
			if(_swap){
				_swap.touch(_id);
			}
			if(_info){
				_info.touch(_id);
			}
			if(_input){
				_input.onShort(_id);
			}
			
		}
	} 
	
}
