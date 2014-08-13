// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict
@CustomEditor(EZDuplicateModelDebug)
class EZDuplicateModelDebugEditor extends Editor {
    var jsonProp_ : SerializedProperty;
   
    
    function OnEnable () {
    	jsonProp_ = serializedObject.FindProperty ("_json"); 
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		serializedObject.ApplyModifiedProperties ();
	}


    function OnDrawProperties() { 
    
    	EditorGUILayout.LabelField("Level", "json");
        jsonProp_.stringValue = EditorGUILayout.TextArea(jsonProp_.stringValue, GUI.skin.textArea, GUILayout.Height(200f));
      
		 
		
    }

}