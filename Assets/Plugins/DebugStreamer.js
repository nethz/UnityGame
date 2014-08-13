/*	DebugStreamer
	Jamie McCarter of Toxic Blob
	jamie@toxicblob.com
	· displays on screen a history of 'numberOfLines' of whatever text is sent to 'message'
	· 'showLineMovement' adds a rotating mark at the end of the lines of text, so repetitive message can be seen to be moving

	· to use, add this script to a game object, then from another script simply add "DebugStreamer.message = "text to display";
	*/
#pragma strict
/*

private static var	messageList:Array = new Array();
private static var	designList:Array = new Array();
private static var	uiList:Array = new Array();
//static var			message:String = "";

private var					showLineMovement:boolean;
private var					anchorAt:TextAnchor = TextAnchor.LowerLeft;
public var					numberOfLines:int = 20;
private var					pixelOffset:int = 5;


private var			guiObj:GameObject;
private var			guiTxt:GUIText;
private var			_anchorAt:TextAnchor;
private var			_pixelOffset:float;
private var			_showLineMovement:boolean;
private var			messageHistory:Array = new Array();
private var			messageHistoryLength:int;
private var			displayText:String;
private var			patternIndex:int = 0;
private var			pattern:String[] = ["-", "\\", "|", "/"];

public var design:boolean = true; 
public var log:boolean = true;
public var _ui:boolean = true;

static function Log(msg:Object){	
	this.messageList.push(msg.ToString());
}


static function Design(msg:Object){	
	this.designList.push(msg.ToString());
}


static function UI(msg:Object){	
	this.uiList.push(msg.ToString());
}


function Awake()
{

	
	
	guiObj = new GameObject("Debug Streamer", GUIText);

	
	guiObj.transform.position = Vector3.zero;
	guiObj.transform.localScale = Vector3(0, 0, 1);
	guiObj.name = "Debug Streamer";
	guiTxt = guiObj.guiText;
	_anchorAt = anchorAt;
	SetPosition();
	this.Log("start");
}
function putout(list:Array){
	for(var n:int=0; n<list.length; ++n)
		{
			var message:String = list[n] as String;
			if(showLineMovement)
				messageHistoryLength = messageHistory.Unshift(message + "\t" + pattern[patternIndex]);
			else
				messageHistoryLength = messageHistory.Unshift(message);
			
			patternIndex = (patternIndex + 1) % 4;
			while(messageHistoryLength>numberOfLines)
				{
				messageHistory.Pop();
				messageHistoryLength = messageHistory.length;
				}
		
			//	create the multi-line text to display
			displayText = "";
			for(var i:int=0; i<messageHistory.length; i++)
				{
				if(i==0)
					displayText = messageHistory[i] as String;
				else
					displayText = (messageHistory[i] as String) + "\n" + displayText;
				}
			
			guiTxt.text = displayText;
		}
	
}
function Update()
	{
	//	if anchorAt or pixelOffset has changed while running, update the text position
	if(_anchorAt!=anchorAt || _pixelOffset!=pixelOffset)
		{
		_anchorAt = anchorAt;
		_pixelOffset = pixelOffset;
		SetPosition();
		}
		if(log){
			this.putout(messageList);
		}
		messageList = Array();
		if(design){
			this.putout(designList);
		}
		designList = Array();
		if(_ui){
			this.putout(uiList);
		}
		uiList = new Array();
		//	if the message has changed, update the display
		//if(_message!=message)
		//	{
		//	_message = message;
		
	//	}
	}

//	·
function OnDisable()
	{
	if(guiObj!=null)
		GameObject.DestroyImmediate(guiObj.gameObject);
	}

//	sets all the appropriate GUI Text settings for positioning the display
function SetPosition()
	{
	switch(anchorAt)
		{
		case TextAnchor.UpperLeft:
			guiObj.transform.position = Vector3(0, 1, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Left;
			guiTxt.pixelOffset = Vector2(pixelOffset, -pixelOffset);
			break;
		case TextAnchor.UpperCenter:
			guiObj.transform.position = Vector3(0.5, 1, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Center;
			guiTxt.pixelOffset = Vector2(0, -pixelOffset);
			break;
		case TextAnchor.UpperRight:
			guiObj.transform.position = Vector3(1, 1, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Right;
			guiTxt.pixelOffset = Vector2(-pixelOffset, -pixelOffset);
			break;
		case TextAnchor.MiddleLeft:
			guiObj.transform.position = Vector3(0, 0.5, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Left;
			guiTxt.pixelOffset = Vector2(pixelOffset, 0);
			break;
		case TextAnchor.MiddleCenter:
			guiObj.transform.position = Vector3(0.5, 0.5, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Center;
			guiTxt.pixelOffset = Vector2(0, 0);
			break;
		case TextAnchor.MiddleRight:
			guiObj.transform.position = Vector3(1, 0.5, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Right;
			guiTxt.pixelOffset = Vector2(-pixelOffset, 0);
			break;
		case TextAnchor.LowerLeft:
			guiObj.transform.position = Vector3(0, 0, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Left;
			guiTxt.pixelOffset = Vector2(pixelOffset, pixelOffset);
			break;
		case TextAnchor.LowerCenter:
			guiObj.transform.position = Vector3(0.5, 0, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Center;
			guiTxt.pixelOffset = Vector2(0, pixelOffset);
			break;
		case TextAnchor.LowerRight:
			guiObj.transform.position = Vector3(1, 0, 0);
			guiTxt.anchor = anchorAt;
			guiTxt.alignment = TextAlignment.Right;
			guiTxt.pixelOffset = Vector2(-pixelOffset, pixelOffset);
			break;
		}
	}
*/
