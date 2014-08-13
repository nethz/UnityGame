#pragma strict

class EZHudState extends MonoBehaviour{
	enum State{
		WeMagic,
		WeNoMagic,
		WeSkill,
		WeNoSkill,
		WeChant,
		FoeMagic,
		FoeSkill,
		FoeChant,
		None,
	};
	public var _back:UISprite;
	public var _time:EZHudTime;
	public var _bar:EZHudBar;
	private var state_:EZHudState.State = EZHudState.State.None;
	public function setState(state:EZHudState.State){
		if(state_ != state){
			state_ = state;
			switch(state){
				case EZHudState.State.WeMagic:
					_bar.color = Color(0.17255f, 0.58824f, 0.79216f, 1.0f);
					_time.hide();
					_back.spriteName = "back1";
				break;
				case EZHudState.State.WeNoMagic:
					_bar.color = Color(0.17255f, 0.58824f, 0.79216f, 1.0f);
					_time.hide();
					_back.spriteName = "back2";
				break;
				case EZHudState.State.WeSkill:
					_bar.color = Color(0.95f, 0.8f, 0.0745f, 1.0f);
					_time.hide();
					_back.spriteName = "back1";
				break;
				case EZHudState.State.WeNoSkill:
					_bar.color = Color(0.95f, 0.8f, 0.0745f, 1.0f);
					_time.hide();
					_back.spriteName = "back2";
				break;
				
				
				case EZHudState.State.WeChant:
					_bar.color = Color(0.6078431f, 0.17255f, 0.79216f, 1.0f);
					_time.hide();
					_back.spriteName = "back1";
				break;
				case EZHudState.State.FoeMagic:
					_bar.color = Color(0.17255f, 0.58824f, 0.79216f, 1.0f);
					_time.show();
					_back.spriteName = "back1";
				break;
				case EZHudState.State.FoeSkill:
					_bar.color = Color(0.17255f, 0.58824f, 0.79216f, 1.0f);
					_time.show();
					_back.spriteName = "back2";
				break;
				
				
				case EZHudState.State.FoeChant:
					_bar.color = Color(0.6078431f, 0.17255f, 0.79216f, 1.0f);
					_time.show();
					_back.spriteName = "back1";
				break;
			}
		}
	}
}