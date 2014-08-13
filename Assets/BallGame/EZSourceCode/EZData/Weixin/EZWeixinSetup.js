#pragma strict
class EZWeixinSetup extends MonoBehaviour{
	public var _weixin:boolean = true;
	public var _share:boolean = false;
	public function Start(){
		var table:EZSetupTable = EZSetupTable.GetInstance();
		if(table){
			var data:JsonData.Setup = table.data;
			setup(data.game);
		}
	}
	private function setup(data:JsonData.SetupGame){
		
		this.gameObject.SetActive(true);
		
		if( _weixin&&!data.weixin ){
			this.gameObject.SetActive(false);
		}
		if( _share && !data.share ){
			this.gameObject.SetActive(false);
		}
	
	}
	
	
	
	
	
}