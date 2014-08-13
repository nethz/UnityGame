// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZDebugSoul)
class EZDebugSoulEditor extends Editor {
 
    
    var _jsonProp : SerializedProperty;
 
   
    
    function OnEnable () {
    	
    	_jsonProp = serializedObject.FindProperty ("_json"); 
    	
   		
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		
		
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties() { 
    
		EditorGUILayout.LabelField("Monster", "Battle");
        _jsonProp.stringValue = EditorGUILayout.TextArea(_jsonProp.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
      
        
	
    }

}
