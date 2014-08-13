#pragma strict

class EZAwardCryItem extends EZAwardItem{
	public var _metal:String = "";
	public var _wood:String = "";
	public var _water:String = "";
	public var _fire:String = "";
	public var _earth:String = "";
	public var _rand:String = "";
	
	public function setup(self:int[], other:int[]){
		var text:String = "";
		/*
		if(self[0]+other[0] != 0)
			text += "[ffff00]" + _metal + (self[0]+other[0]).ToString() + "[-] "; 
		
		if(self[1]+other[1] != 0)
			text += "[32cd32]" + _wood + (self[1]+other[1]).ToString() + "[-] "; 
		
	
		if(self[2]+other[2] != 0)
			text += "[87ceeb]" + _water + (self[2]+other[2]).ToString() + "[-] "; 
		
		
		if(self[3]+other[3] != 0)
			text += "[ff7f50]" + _fire + (self[3]+other[3]).ToString() + "[-] "; 
		
		
		if(self[4]+other[4] != 0)
			text += "[a39480]" + _earth + (self[4]+other[4]).ToString() +"[-]" ; 
		
		*/
		
		var n:int = 0;
		for(var i:int = 0; i<self.Length; ++i){
			n += self[i];
		}
		for(var j:int = 0; j<other.Length; ++j){
			n += other[j];
		}
		_label.text = _rand + n.ToString();
	}
	
}