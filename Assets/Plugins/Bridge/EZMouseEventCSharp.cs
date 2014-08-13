using UnityEngine;
using System.Collections;

public class EZMouseEventCSharp{

	public int button;
	public Vector3 position;
	public Vector3 absolute;
	public Vector3 worldPoint; 
	


	public  EZMouseEventCSharp(int b, Vector2 p){
		this.button = b;
		this.absolute = new Vector3(p.x, p.y, 0);
	}
}
