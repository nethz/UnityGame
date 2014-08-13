#pragma strict

class EZEggAnimationView extends MonoBehaviour{
	//public var _changeUI:Material = null;
	public var _bg:UISprite = null;
	public var _pet:MagicPetEffect = null;
	public var _magic:EZMagicCircleView = null;
	
	private var isShow_:boolean =false;
	
	public function Awake(){
		show(false);
		//_changeUI = new Material(Shader.Find("Custom/HSVShader"));
	}
	
	public function Start(){
		
	}
	
	public function show(isShow:boolean){
		isShow_ = isShow;
		refresh();
	}
	
	public function drawEgg(cards:List.<EZCard>){
		_pet.drawEgg(cards);
	}
	
	public function changeUI(change:boolean){
		if(change){
			//_changeUI.SetFloat("_Sat",0.2f);
			//_changeUI.SetFloat("_Val",0.9f);
			_magic.setupByMoney();
		}else{
			//_changeUI.SetFloat("_Sat",1f);
			//_changeUI.SetFloat("_Val",1f);
			_magic.setupByDiamond();
		}
	}
	
	public function refresh(){
		if(isShow_){
			_bg.enabled = true;
			_bg.gameObject.GetComponent(BoxCollider).enabled = true;
			_pet.show(true);
		}else{
			_bg.enabled = false;
			_bg.gameObject.GetComponent(BoxCollider).enabled = false;
			_pet.show(false);
		}
	}
	
	
		

}