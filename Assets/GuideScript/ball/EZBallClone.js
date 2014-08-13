#pragma strict

class EZBallClone extends MonoBehaviour{
	public var _cursor:EZBallCursor = null;
	public var _cursorNew:EZBallCursorNew = null;
	public var _isNew:boolean = false;
	function locked(parent:Transform, ballPrototype:GameObject){
		if(!_isNew){
			_cursor.locked(parent, ballPrototype);
		}else{
			_cursorNew.locked(parent, ballPrototype);
		}
	}
	
	function setPosition(position:Vector2){
	
		if(!_isNew){
			_cursor.setPosition(position);
		}else{
			_cursorNew.setPosition(position);
		}
		
	}
	
	function setFlash(flash:boolean){
	
		if(!_isNew){
			_cursor.setFlash(flash);
		}else{
			_cursorNew.setFlash(flash);
		}
	}
	
	function unlock(){
	
		if(!_isNew){
			_cursor.unlock();
		}else{
			_cursorNew.unlock();
		}
	}
}
