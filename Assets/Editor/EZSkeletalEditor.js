// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZSkeletal)
class EZSkeletalEditor extends Editor {
    var _prototypeBoneProp : SerializedProperty;
    var _distanceProp : SerializedProperty; 
    var _setupJsonProp : SerializedProperty;
    var _typeProp : SerializedProperty;
    var _layoutProp : SerializedProperty;
    var _hFlipProp : SerializedProperty;
	var _boxColliderProp : SerializedProperty;
	var _offsetProp : SerializedProperty;
	var _statureProp : SerializedProperty;
	var _hudOffsetProp : SerializedProperty;
	var _hudScaleProp : SerializedProperty;
	var _attackEffectOffset1Prop: SerializedProperty;
	var _attackEffectScaleProp: SerializedProperty;
	var _medicalOffsetProp: SerializedProperty;
	var _medicalScaleProp: SerializedProperty;
	var _dotOffsetProp: SerializedProperty;
	var _dotScaleProp: SerializedProperty;
	var _hudIPhone4OffsetProp : SerializedProperty;
	
	
    function OnEnable () {
    	//typeProp_ = serializedObject.FindProperty ("_prototype._type"); 
    	_prototypeBoneProp = serializedObject.FindProperty ("_prototypeBone");  
    	_distanceProp = serializedObject.FindProperty ("_distance"); 
    	_setupJsonProp   = serializedObject.FindProperty ("_setupJson"); 
    	//_speedProp   = serializedObject.FindProperty ("_speed"); 
    	_typeProp   = serializedObject.FindProperty ("_type"); 
    	_layoutProp = serializedObject.FindProperty ("_layout"); 
    	_hFlipProp = serializedObject.FindProperty ("_hFlip");
    	_boxColliderProp = serializedObject.FindProperty ("_boxCollider");
    	_offsetProp = serializedObject.FindProperty ("_offset");
    	_statureProp = serializedObject.FindProperty ("_stature");
    	_hudOffsetProp = serializedObject.FindProperty ("_hudOffset");
    	_hudScaleProp = serializedObject.FindProperty ("_hudScale");
    	_attackEffectOffset1Prop = serializedObject.FindProperty ("_attackEffectOffset1");
    	_attackEffectScaleProp = serializedObject.FindProperty ("_attackEffectScale");
    	_medicalOffsetProp = serializedObject.FindProperty ("_medicalOffset");
    	_medicalScaleProp = serializedObject.FindProperty ("_medicalScale");
    	_dotOffsetProp = serializedObject.FindProperty ("_dotOffset");
    	_dotScaleProp = serializedObject.FindProperty ("_dotScale");
    	_hudIPhone4OffsetProp = serializedObject.FindProperty ("_hudIPhone4Offset");
    	
    	
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
    
    	
		 
      //  EditorGUILayout.PropertyField (typeProp_); 
		EditorGUILayout.PropertyField (_typeProp, new GUIContent ("Type")); 
		EditorGUILayout.PropertyField (_prototypeBoneProp, new GUIContent ("Prototype Bone"));
		EditorGUILayout.PropertyField (_distanceProp, new GUIContent ("Z Distance")); 
		EditorGUILayout.PropertyField (_layoutProp, new GUIContent ("Layout"));
		EditorGUILayout.PropertyField (_hFlipProp, new GUIContent ("H Filp"));
		EditorGUILayout.PropertyField (_boxColliderProp, new GUIContent ("Box Collider"));
		EditorGUILayout.PropertyField (_offsetProp, new GUIContent ("Offset"));
		EditorGUILayout.PropertyField (_statureProp, new GUIContent ("Stature"));
		EditorGUILayout.PropertyField (_hudOffsetProp, new GUIContent ("Hud Offset"));
		
		
		EditorGUILayout.PropertyField (_hudScaleProp, new GUIContent ("Hud Scale"));
		EditorGUILayout.PropertyField (_attackEffectOffset1Prop, new GUIContent ("Attack Offset"));
		EditorGUILayout.PropertyField (_attackEffectScaleProp, new GUIContent ("Attack Scale"));
		EditorGUILayout.PropertyField (_medicalOffsetProp, new GUIContent ("Medical Offset"));
		EditorGUILayout.PropertyField (_medicalScaleProp, new GUIContent ("Medical Scale"));
		EditorGUILayout.PropertyField (_dotOffsetProp, new GUIContent ("Dot Offset"));
		EditorGUILayout.PropertyField (_dotScaleProp, new GUIContent ("Dot Scale"));
		EditorGUILayout.PropertyField (_hudIPhone4OffsetProp, new GUIContent ("Hud iPhone4 offset"));
		
		  
		//EditorGUILayout.PropertyField (_speedProp, new GUIContent ("Speed")); 
		// _speedProp.floatValue = EditorGUILayout.FloatField("Increase scale by:", _speedProp.floatValue);
		 
		EditorGUILayout.LabelField("Setup", "Json");
        _setupJsonProp.stringValue = EditorGUILayout.TextArea(_setupJsonProp.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
		
		//EditorGUILayout.PropertyField (_setupJsonProp, new GUIContent ("Setup Json"));
		 /*
		
        EditorGUILayout.PropertyField (lastTimesProp_, new GUIContent ("Last Times")); 
        EditorGUILayout.PropertyField (powerProp_, new GUIContent ("Power")); 
        EditorGUILayout.PropertyField (seatProp_, new GUIContent ("Seat")); 
        
        
        EditorGUILayout.LabelField("Dot", "Information");
        infoProp_.stringValue = EditorGUILayout.TextArea(infoProp_.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
		
        EditorGUILayout.LabelField("Dot", "Story"); 
        storyProp_.stringValue = EditorGUILayout.TextArea(storyProp_.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
		*/
    }

}
