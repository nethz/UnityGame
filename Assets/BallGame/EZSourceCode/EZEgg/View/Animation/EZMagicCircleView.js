#pragma strict

class EZMagicCircleView extends MonoBehaviour{
	public var _metalBall:UISprite = null;
	public var _woodBall:UISprite = null;
	public var _waterlBall:UISprite = null;
	public var _fireBall:UISprite = null;
	public var _earthBall:UISprite = null;
	
	public var _bigCircle:UISprite = null;
	public var _middleCircle:UISprite = null;
	public var _smallCircle:UISprite = null;
	
	public var _bg:UISprite = null;
	
	public function setupByDiamond(){
		_metalBall.spriteName = "ballMetal";
		_woodBall.spriteName = "ballWood";
		_waterlBall.spriteName = "ballWater";
		_fireBall.spriteName = "ballFire";
		_earthBall.spriteName = "ballEarth";
		_bigCircle.spriteName = "circleBig";
		_middleCircle.spriteName = "circleMiddle";
		_smallCircle.spriteName = "circleSmall";
		_bg.spriteName = "mainBg";
	}
	
	public function setupByMoney(){
		_metalBall.spriteName = "ballMetal2";
		_woodBall.spriteName = "ballWood2";
		_waterlBall.spriteName = "ballWater2";
		_fireBall.spriteName = "ballFire2";
		_earthBall.spriteName = "ballEarth2";
		_bigCircle.spriteName = "circleBig2";
		_middleCircle.spriteName = "circleMiddle2";
		_smallCircle.spriteName = "circleSmall2";
		_bg.spriteName = "mainBg2";
	}
}