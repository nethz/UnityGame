// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(AffixUnitTest)
class AffixUnitTestEditor extends Editor {
	var _powerProp : SerializedProperty;
	var _attackProp : SerializedProperty;
    var _json0Prop : SerializedProperty;
    var _json1Prop : SerializedProperty;
    var _json2Prop : SerializedProperty;
    var _json3Prop : SerializedProperty;
    
   	var _fromProp : SerializedProperty;
   	var _toProp : SerializedProperty;
    
    
	 
   // var _endProp : SerializedProperty; 
    
    function OnEnable () {
    	_json0Prop = serializedObject.FindProperty ("_json0"); 
    	_json1Prop = serializedObject.FindProperty ("_json1"); 
    	_json2Prop = serializedObject.FindProperty ("_json2"); 
    	_json3Prop = serializedObject.FindProperty ("_json3"); 
    	_powerProp = serializedObject.FindProperty ("_power"); 
    	_attackProp = serializedObject.FindProperty ("_attack"); 
    	
    	_fromProp = serializedObject.FindProperty ("_from"); 
    	_toProp = serializedObject.FindProperty ("_to"); 
    	//_endProp = serializedObject.FindProperty ("_end"); 
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties() { 
    	 
		
        EditorGUILayout.PropertyField (_fromProp, new GUIContent ("From"));
       	EditorGUILayout.PropertyField (_toProp, new GUIContent ("To")); 
		
        EditorGUILayout.PropertyField (_powerProp, new GUIContent ("Power"));
        EditorGUILayout.PropertyField (_attackProp, new GUIContent ("Attack")); 
        
		EditorGUILayout.LabelField("Json", "Affix0");
        _json0Prop.stringValue = EditorGUILayout.TextArea(_json0Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
        
		EditorGUILayout.LabelField("Json", "Affix1");
        _json1Prop.stringValue = EditorGUILayout.TextArea(_json1Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
         
		EditorGUILayout.LabelField("Json", "Affix2");
        _json2Prop.stringValue = EditorGUILayout.TextArea(_json2Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
         
		EditorGUILayout.LabelField("Json", "Affix3");
        _json3Prop.stringValue = EditorGUILayout.TextArea(_json3Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
	 
    	
        
	
    }

}
