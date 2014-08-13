using UnityEngine;
public class MultiDim {
 
	public static int[,] IntArray (int a, int b) {
		return new int[a,b];
	}
 
	public static int[,,] IntArray (int a, int b, int c) {
		return new int[a,b,c];
	}
 
	public static float[,] FloatArray (int a, int b) {
		return new float[a,b];
	}
 
	public static float[,,] FloatArray (int a, int b, int c) {
		return new float[a,b,c];
	}
	
	
	public static Vector2[,] Vector2Array (int a, int b) {
		return new Vector2[a,b];
	}

	public static Vector2[,,] Vector2Array (int a, int b, int c) {
		return new Vector2[a,b,c];
	}

	
	public static Object[,] ObjectArray (int a, int b) {
		return new Object[a,b];
	}

	public static Object[,,] ObjectArray (int a, int b, int c) {
		return new Object[a,b,c];
	}

	public static string[,] StringArray (int a, int b) {
		return new string[a,b];
	}
 
	public static string[,,] StringArray (int a, int b, int c) {
		return new string[a,b,c];
	}
 
	public static int[][] JaggedInt (int a) {
		return new int[a][];
	}
 
	public static float[][] JaggedFloat (int a) {
		return new float[a][];
	}
 
	public static string[][] JaggedString (int a) {
		return new string[a][];
	}
}