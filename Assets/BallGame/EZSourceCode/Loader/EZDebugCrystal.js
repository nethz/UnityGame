#pragma strict

class EZDebugCrystal extends MonoBehaviour{


    var _json:String;
    
  //  private function getSoul(json:String):JsonData.Soul{
	//	 var soul:JsonData.Soul = new JsonData.Soul.Load(json);
//		 return soul; 
  //  }
	public function getData():JsonData.CrystalTech{
		
		var crystal:JsonData.CrystalTech = JsonData.CrystalTech.Load(_json);
		//if(crystal){
		//Debug.Log(crystal.cry);
		return crystal;
	}

}