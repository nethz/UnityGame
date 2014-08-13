using UnityEngine;

/// <summary>
/// Basic input validator with a few presets. I suggest making your own validator if you need new functionality.
/// </summary>

[RequireComponent(typeof(UIInput))]
public class EZUIInputValidator : MonoBehaviour
{


	
	public UILabel label;
	//public UILabel labelTo;
	public string replace;
	private string text;
	//private string toText;

	void Update(){
		
		//Debug.LogWarning (labelFrom.text+ "..?;;;?.");
		if(text != label.text){
			string normalize = label.text.Normalize();
			text = "";
			for(int i = 0; i<normalize.Length; ++i){
				int ch = normalize[i];

				if (ch>=0x4e00 && ch<=0x9fa5){
					text += EZTranscoding.Big5Gb2312((char)(ch));
				}else if (ch >= ' ' && ch <= '~'){ 
					text += (char)(ch);
				}else{
				//	Debug.LogWarning (ch+ "????");
					//Debug.LogWarning ((int)(ch) + "!!!!" );
					text += replace;
				}

				label.text = text;
				/*	Debug.LogWarning (fromText[i]+ "..??.");
				int ch = fromText[i];
				Debug.LogWarning (ch+ ".....");
				//Debug.LogWarning (fromText+ "..??..");
				//char ch = fromText[i];
				//Debug.LogWarning (ch+ ".....");
				//toText += ch;
				/*
				if (ch>=0x4e00 && ch<=0x9fa5){
					toText += EZTranscoding.Big5Gb2312(ch);
				}else if (ch >= ' ' && ch <= '~'){ 
					toText += ch;
				}else{
					Debug.LogWarning (ch+ "????");
					Debug.LogWarning ((int)(ch) + "!!!!" );
					toText += replace;
				}
				*/

			}
			//labelTo.text = toText;
		}

	}

}
