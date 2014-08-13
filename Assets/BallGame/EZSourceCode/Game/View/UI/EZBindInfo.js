#pragma strict


class EZBindInfo extends MonoBehaviour{
	private var _strings:EZBindString[] = null;
	public function Awake(){
		this._strings = System.Array.ConvertAll(
			this.GetComponents(EZBindString), 
			function (component){component as EZBindString;}
			);
	}



	public function getInfo(data:EZBindData):String{
		var text:String = "";
	
		for(var i:int =0; i< _strings.length; ++i){
			text  += _strings[i].text(data);
		}
		return text;
	}
}