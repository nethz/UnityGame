#pragma strict

class CameraControl extends MonoBehaviour {
	public var _camera:Camera;
	public var _target:GameObject = null;
	private var _targetPosition:Vector3;
	private var _orthographicSize:float = 0;
	public var _offset:Vector2 = Vector2(0,0);
	public var _limits:Vector4 = Vector4(0.1, 0.1, 0.1, 0.1);
	private var screenLimits_:Vector4 = Vector4(0,0,0,0);
	
    private function refreshScreenLimits(){
    	var sizeSP:Vector2 = Geek.Screen2Space(Vector2(Screen.width, Screen.height), _camera.orthographicSize);
    	this.screenLimits_ = Vector4((0.5-this._limits.x) * sizeSP.x, (0.5 - this._limits.y )*sizeSP.x, (0.5- this._limits.z) * sizeSP.y,  (0.5- this._limits.w) *sizeSP.y);
    }
	
	function Start (){
		this.refreshScreenLimits();
	}
	

	function updateControl(d:float) {
		
    	var sizeSP:Vector2 = Geek.Screen2Space(Vector2(Screen.width, Screen.height),_camera.orthographicSize);
		if(this._target.transform.position.x - this.screenLimits_.x + _offset.x*sizeSP.x > this.transform.position.x){
			this.transform.position.x = this._target.transform.position.x - this.screenLimits_.x + _offset.x*sizeSP.x ;
		}else if(this._target.transform.position.x + this.screenLimits_.y + _offset.x*sizeSP.x  < this.transform.position.x){
			this.transform.position.x = this._target.transform.position.x + this.screenLimits_.y + _offset.x*sizeSP.x ;
		}
	}
	function Update () {
		if(this._target != null){
			if(_targetPosition != _target.transform.position || _orthographicSize != _camera.orthographicSize){
				_targetPosition = _target.transform.position;
				_orthographicSize = _camera.orthographicSize;
				this.updateControl(Time.deltaTime);
			}
			
			
		}
	}

}