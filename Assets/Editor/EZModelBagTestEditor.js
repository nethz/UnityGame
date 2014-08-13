// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZModelBagTest)
class EZModelBagTestEditor extends Editor {

	var _jsonProp : SerializedProperty;
	var _seatProp : SerializedProperty;
	var _resultProp : SerializedProperty;
    function OnEnable () {
    	_jsonProp = serializedObject.FindProperty ("_json"); 
    	_seatProp = serializedObject.FindProperty ("_seat"); 
    	_resultProp = serializedObject.FindProperty ("_result"); 
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		
		
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties() { 
    	 
		
        EditorGUILayout.PropertyField (_seatProp, new GUIContent ("Seat")); 
        EditorGUILayout.PropertyField (_resultProp, new GUIContent ("Result")); 
        
        
		EditorGUILayout.LabelField("Json", "Text");
        _jsonProp.stringValue = EditorGUILayout.TextArea(_jsonProp.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
       
	
    }

}
