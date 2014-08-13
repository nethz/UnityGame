@script ExecuteInEditMode()

// Just a simple script that looks at the target transform.
var version : String = "";

#if UNITY_EDITOR
function Update () {
    if (version != PlayerSettings.bundleVersion)
        version = PlayerSettings.bundleVersion;
} 
#endif
