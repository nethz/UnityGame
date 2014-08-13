// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZDebugStronghold)
class EZDebugStrongholdEditor extends Editor {
 
    
    var _battleProp : SerializedProperty;
    var _battleDropProp:SerializedProperty;
    var _battleMoneyProp:SerializedProperty;
    
    var _bag1Prop : SerializedProperty;
   	var _bag1DropProp:SerializedProperty;
    var _bag1MoneyProp:SerializedProperty;
    
    var _bag2Prop : SerializedProperty;
   	var _bag2DropProp:SerializedProperty;
    var _bag2MoneyProp:SerializedProperty;
   
   
    
    function OnEnable () {
    	
    	_battleProp = serializedObject.FindProperty ("_battle"); 
    	_battleDropProp = serializedObject.FindProperty ("_battleDrop"); 
   		_battleMoneyProp = serializedObject.FindProperty ("_battleMoney"); 
   		
    	_bag1Prop = serializedObject.FindProperty ("_bag1"); 
    	_bag1DropProp = serializedObject.FindProperty ("_bag1Drop"); 
   		_bag1MoneyProp = serializedObject.FindProperty ("_bag1Money"); 
   		
   		
    	_bag2Prop = serializedObject.FindProperty ("_bag2"); 
    	_bag2DropProp = serializedObject.FindProperty ("_bag2Drop"); 
   		_bag2MoneyProp = serializedObject.FindProperty ("_bag2Money"); 
   		
	}

 	public  function OnInspectorGUI ()
	{
		serializedObject.Update ();
		OnDrawProperties();
		
		
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties() { 
    
		EditorGUILayout.LabelField("Monster", "Battle");
        _battleProp.stringValue = EditorGUILayout.TextArea(_battleProp.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
        EditorGUILayout.PropertyField (_battleDropProp, new GUIContent ("Battle Drop"));
       	EditorGUILayout.PropertyField (_battleMoneyProp, new GUIContent ("Battle Money")); 
		EditorGUILayout.LabelField("Monster", "Bag1");
        _bag1Prop.stringValue = EditorGUILayout.TextArea(_bag1Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
        EditorGUILayout.PropertyField (_bag1DropProp, new GUIContent ("Bag1 Drop"));
       	EditorGUILayout.PropertyField (_bag1MoneyProp, new GUIContent ("Bag1 Money")); 
        
		EditorGUILayout.LabelField("Monster", "Bag2");
        _bag2Prop.stringValue = EditorGUILayout.TextArea(_bag2Prop.stringValue, GUI.skin.textArea, GUILayout.Height(100f));
        EditorGUILayout.PropertyField (_bag2DropProp, new GUIContent ("Bag2 Drop"));
       	EditorGUILayout.PropertyField (_bag2MoneyProp, new GUIContent ("Bag2 Money")); 
        
        
	
    }

}
