#pragma strict
class Prototype{
	var name:String = null;
	var object:GameObject = null;
};
var prototypes:Prototype[] = null;

private static var instance_:DataCenter = null;
private static var prototypeMap:Boo.Lang.Hash = new Boo.Lang.Hash();

function Awake(){

	this.instance_ = this;
	
	for(var i = 0; i< this.prototypes.length; ++i){
		this.prototypeMap[this.prototypes[i].name] = this.prototypes[i].object;
	}
}
function Start () {
}
function destroy(object:GameObject){
		GameObject.Destroy(object);
}
function create(name:String){
	return Instantiate(this.prototypeMap[name] as GameObject, Vector3(0,0,0), transform.rotation);
}
function createMagic(){
	return Instantiate(this.prototypes[0].object, Vector3(0,0,0), transform.rotation);
}
static function getInstance(){
	return this.instance_;
}
function Update () {

}