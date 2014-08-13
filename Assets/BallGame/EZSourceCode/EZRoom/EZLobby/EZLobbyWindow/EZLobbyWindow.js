#pragma strict
class EZLobbyWindow extends MonoBehaviour{
	public var _camera:UICamera;
	public var _window0:GameObject;
	public var _window1:GameObject;
	public var _window2:GameObject;
	public var _window3:GameObject;
	public var _window0Rate:float = 0.1f;
	public var _window1Rate:float = 0.1f;
	public var _window2Rate:float = 0.1f;
	public var _window3Rate:float = 0.1f;
	public var _cloudRate:float = 0.02f;
	
	private var cameraPostion_:Vector3;
	private var window0Postion_:Vector3;
	private var window1Postion_:Vector3;
	private var window2Postion_:Vector3;
	private var window3Postion_:Vector3;
	public function Start(){
		cameraPostion_ = this._camera.transform.position;
		window0Postion_ = this._window0.transform.position;
		window1Postion_ = this._window1.transform.position;
		window2Postion_ = this._window2.transform.position;
		window3Postion_ = this._window3.transform.position;
	}
	
	private var cameraOffset:float;
	private var newCameraPostion:Vector3;
	public function Update(){
		
		//this._window1.uvRect.x += Time.deltaTime*_cloudRate;		
		newCameraPostion = this._camera.transform.position;
		cameraOffset = (newCameraPostion - cameraPostion_).x;
		
		
		if(cameraOffset != 0){
			window0Postion_.x += cameraOffset*_window0Rate;
			this._window0.transform.position = window0Postion_;
			window1Postion_.x += cameraOffset*_window1Rate;
			this._window1.transform.position = window1Postion_;
			window2Postion_.x += cameraOffset*_window2Rate;
			this._window2.transform.position = window2Postion_;
			window3Postion_.x += cameraOffset*_window3Rate;
			this._window3.transform.position = window3Postion_;
			cameraPostion_ = newCameraPostion;
		}
		
		
	}
	
	
}