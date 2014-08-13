// Custom Editor using SerializedProperties.
// Automatic handling of multi-object editing, undo, and prefab overrides.
#pragma strict

@CustomEditor(EZDebugHero)
class EZDebugHeroEditor extends Editor {
    var _battleProp : SerializedProperty;
    var _bag1Prop : SerializedProperty;
    var _bag2Prop : SerializedProperty;
    var _avatarProp : SerializedProperty;
    var _webAvatarProp : SerializedProperty;
    
    function OnEnable () {
    	_battleProp = serializedObject.FindProperty ("_battle"); 
    	_bag1Prop = serializedObject.FindProperty ("_bag1"); 
    	_bag2Prop = serializedObject.FindProperty ("_bag2"); 
    	_avatarProp = serializedObject.FindProperty ("_avatar"); 
    	_webAvatarProp = serializedObject.FindProperty ("_webAvatar"); 
    
    	
    	
	}

 	public  function OnInspectorGUI(){
		serializedObject.Update();
		OnDrawProperties();
		serializedObject.ApplyModifiedProperties();
	}


    function OnDrawProperties(){
		EditorGUILayout.PropertyField(_avatarProp, new GUIContent("avatar")); 
		EditorGUILayout.PropertyField(_webAvatarProp, new GUIContent("webavatar")); 
		EditorGUILayout.LabelField("Hero", "Battle");
		_battleProp.stringValue = EditorGUILayout.TextArea(_battleProp.stringValue, GUI.skin.textArea, GUILayout.Height(200f));
		EditorGUILayout.LabelField("Hero", "Bag1");
		_bag1Prop.stringValue = EditorGUILayout.TextArea(_bag1Prop.stringValue, GUI.skin.textArea, GUILayout.Height(200f));
		EditorGUILayout.LabelField("Hero", "Bag2");
		_bag2Prop.stringValue = EditorGUILayout.TextArea(_bag2Prop.stringValue, GUI.skin.textArea, GUILayout.Height(200f));
        
    }

}
