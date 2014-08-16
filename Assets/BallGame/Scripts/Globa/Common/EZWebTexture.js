#pragma strict
import System.Collections.Generic;



class EZWebTexture extends EZInputHandler{

	
	public var _URL:String = "http://www.ezdoing.com";
	public var _width:int = 512;
	public var _height:int = 512;
	public var _keyboardEnabled:boolean = true;
	public var _mouseEnabled:boolean = true;
	public var _rotate:boolean = true;
	public var _alphaMask:boolean = false;
	public var _view:UWKView = null;
	public var _htmlText:TextAsset = null;
	public var _webMaterial:Material = null;
	

}
