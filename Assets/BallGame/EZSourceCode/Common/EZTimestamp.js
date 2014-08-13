#pragma strict

import System.Collections.Generic;
class EZTimestamp extends MonoBehaviour{

	private static var instance_:EZTimestamp = null;
	private static var synchro_:double = 0;
	function Awake(){
		this.instance_ = this;
	}
	public static function GetInstance(){
		return this.instance_;
	}
	private function get local():double{
		var epoch:double = (System.DateTime.Now.Ticks - 621355968000000000) / 10000000;
		return epoch;
	}
	public  function get epoch():double{
		return local + synchro_;
	}
	public  function synchro(stamp:double){
		synchro_ = stamp - local;
	}
	
}