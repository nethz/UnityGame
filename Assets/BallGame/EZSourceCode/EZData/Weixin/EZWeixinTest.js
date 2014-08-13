#pragma strict

class EZWeixinTest extends MonoBehaviour{

	public var _ios:iOS = null;
	public function Start(){
		var tl:TaskList = new TaskList();
		var weixin:EZWaitTask = new EZWaitTask();
		weixin.setAllTime(1);
		TaskManager.PushBack(weixin, function(){
			//var invitation:JsonData.Invitation = new JsonData.Invitation();
			//invitation.code = "1234567";
			//invitation.uuid = "123";
			var crystal:JsonData.WeixinCrystal = new JsonData.WeixinCrystal();
			var weixin:JsonData.WeixinData = new JsonData.WeixinData();
			weixin.crystal = crystal;
			weixin.crystal.type = 0;
			weixin.crystal.from = "123";
			weixin.crystal.key = "abcdefgt";
		
			Debug.LogWarning(JsonData.WeixinData.Save(weixin));
			PlayerPrefs.SetString("ios_weixin", JsonData.WeixinData.Save(weixin));
			_ios.handleWeixin("");
		});
		
		tl.push(weixin);
		TaskManager.Run(tl);
	}

}