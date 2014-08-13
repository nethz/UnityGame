#pragma strict

class EZBody {
	public var alive:Function = null;
	public var isTargeted:Function = null;
	public var getSpeed:Function = null;
	public var getSeat:Function = null;
	public var getName:Function = function():String{return "no body";};
};