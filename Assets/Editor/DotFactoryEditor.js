// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict
/*
@CustomEditor(DotFactory)
class DotFactoryEditor extends Editor {
   //var typeProp_ : SerializedProperty;
    var infoProp_ : SerializedProperty;
    var storyProp_ : SerializedProperty;
    var iconProp_ : SerializedProperty;
    var lastTimesProp_ : SerializedProperty;
    var powerProp_ : SerializedProperty;
    var seatProp_ : SerializedProperty;
    
    function OnEnable () {
    	//typeProp_ = serializedObject.FindProperty ("_prototype._type"); 
    	infoProp_ = serializedObject.FindProperty ("_prototype._info");  
   	 	storyProp_ = serializedObject.FindProperty ("_prototype._story");  
    	iconProp_ = serializedObject.FindProperty ("_prototype._icon");  
    	lastTimesProp_ = serializedObject.FindProperty ("_prototype._lastTimes");  
    	powerProp_ = serializedObject.FindProperty ("_prototype._power");  
    	seatProp_ = serializedObject.FindProperty ("_prototype._seat");  
    	
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		
		
		serializedObject.ApplyModifiedProperties ();
	}


    function OnDrawProperties() { 
    
    	
		 
      //  EditorGUILayout.PropertyField (typeProp_); 
		EditorGUILayout.PropertyField (iconProp_, new GUIContent ("Icon"));
		
		 
		
        EditorGUILayout.PropertyField (lastTimesProp_, new GUIContent ("Last Times")); 
        EditorGUILayout.PropertyField (powerProp_, new GUIContent ("Power")); 
        EditorGUILayout.PropertyField (seatProp_, new GUIContent ("Seat")); 
        
        
        EditorGUILayout.LabelField("Dot", "Information");
        infoProp_.stringValue = EditorGUILayout.TextArea(infoProp_.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
		
        EditorGUILayout.LabelField("Dot", "Story"); 
        storyProp_.stringValue = EditorGUILayout.TextArea(storyProp_.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
		
    }

}
*/