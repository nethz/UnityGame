#pragma strict
public var localPosition:Vector3;
function Start () {

}

function Update () {
	this.transform.localPosition = localPosition;
}