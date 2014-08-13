// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZSkeletalAnimation)
class EZSkeletalAnimationEditor extends Editor {
    var _jsonProp : SerializedProperty;
    var _jsonOtherProp : SerializedProperty;
    var _nameProp : SerializedProperty;
    var _debugProp : SerializedProperty;
    var _speedProp : SerializedProperty;
    
    function OnEnable () {
    	_jsonProp = serializedObject.FindProperty ("_json"); 
    	_jsonOtherProp = serializedObject.FindProperty ("_jsonOther"); 
    	_nameProp = serializedObject.FindProperty ("_name"); 
    	_debugProp = serializedObject.FindProperty ("_debug"); 
    	_speedProp = serializedObject.FindProperty ("_speed"); 
    
    	
   	 	/*storyProp_ = serializedObject.FindProperty ("_prototype._story");  
    	iconProp_ = serializedObject.FindProperty ("_prototype._icon");  
    	lastTimesProp_ = serializedObject.FindProperty ("_prototype._lastTimes");  
    	powerProp_ = serializedObject.FindProperty ("_prototype._power");  
    	seatProp_ = serializedObject.FindProperty ("_prototype._seat");  */
    	
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		
		
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties() { 
    	 
		EditorGUILayout.PropertyField (_nameProp, new GUIContent ("Name")); 
		EditorGUILayout.PropertyField (_debugProp, new GUIContent ("Debug"));
		EditorGUILayout.PropertyField (_speedProp, new GUIContent ("Speed"));
		
		EditorGUILayout.LabelField("Animation", "Json");
        _jsonProp.stringValue = EditorGUILayout.TextArea(_jsonProp.stringValue, GUI.skin.textArea, GUILayout.Height(200f));
        _jsonOtherProp.stringValue = EditorGUILayout.TextArea(_jsonOtherProp.stringValue, GUI.skin.textArea, GUILayout.Height(20f));
	
    	
	
    }

}
