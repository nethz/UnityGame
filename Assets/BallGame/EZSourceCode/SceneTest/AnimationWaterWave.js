#pragma strict

class AnimationWaterWave extends MonoBehaviour{
	public var wave1:exSprite = null;
	public var wave2:exSprite = null;
	public var wave3:exSprite = null;
	public var wave4:exSprite = null;
	public var wave5:exSprite = null;
	public var wave6:exSprite = null;
	public var ship:Transform = null;
	
	public var waveSpeed:float = 0.1f;
	private var temp:float = 0.1f;
	private var langA:float = 0.1f;
	private var langA2:float = 0.1f;
	private var langA3:float = 0.1f;
	public function Update(){
	
		var flag:float = wave1.shear.x;
		
		if(flag <= 0){
			temp = waveSpeed;
		}else if(flag >= 0.4){
			temp = -waveSpeed;
		}
		/*if(wave1.shear.x > 0 && temp >0){
			if(wave1.shear.x <0.15){
				langA = waveSpeed;
			}else{
				langA = -waveSpeed;
			}
			if(wave1.shear.x >0.1&&wave1.shear.x <0.15){
				langA2 = waveSpeed;
			}else{
				langA2 = -waveSpeed;
			}
		}else{
			langA = 0;
			langA2 = 0;
		}*/
		if(flag > 0.1 && flag <0.5 && temp >0){
			langA = waveSpeed;
		}else{
			if(wave4.color.a > 0.5){
				langA = -waveSpeed;
			}else{
				langA = 0;
			}	
		}
		
		/*if(flag > 0.1 && flag < 0.5&& temp >0){
			langA2 = waveSpeed;
		}else{
			if(wave5.color.a > 0.5){
				langA2 = -waveSpeed;
			}else{
				langA2 = 0;
			}	
		}
		
		if(flag > 0.16 && flag< 0.5&& temp >0){
			langA3 = waveSpeed;
		}else{
			if(wave6.color.a > 0.5){
				langA3 = -waveSpeed;
			}else{
				langA3 = 0;
			}	
		}*/
		
		wave1.shear.x += Time.deltaTime*temp;
		//wave1.scale.x += Time.deltaTime*temp*0.1f;
		wave1.scale.y += Time.deltaTime*temp*0.6;
		
		wave2.shear.x += Time.deltaTime*temp*0.8f;
		//wave2.scale.x += Time.deltaTime*temp*0.1f;
		wave2.scale.y += Time.deltaTime*temp*0.8f;
		
		wave3.shear.x += Time.deltaTime*temp*0.7f;
		//wave3.scale.x += Time.deltaTime*temp*0.1f;
		wave3.scale.y += Time.deltaTime*temp*0.8f;
		
		wave4.shear.x += Time.deltaTime*temp*0.2f;
		wave4.scale.x += Time.deltaTime*temp*0.1f;
		wave4.scale.y += Time.deltaTime*temp*2;
		wave4.color.a += Time.deltaTime*langA*2;
		
		wave5.shear.x += Time.deltaTime*temp*0.1f;
		wave5.scale.x += Time.deltaTime*temp*0.1f;
		wave5.scale.y += Time.deltaTime*temp*0.3;
		wave5.color.a += Time.deltaTime*langA*2;
		
		wave6.shear.x += Time.deltaTime*temp*0.2f;
		wave6.scale.x += Time.deltaTime*temp*0.1f;
		wave6.scale.y += Time.deltaTime*temp*0.4;
		wave6.color.a += Time.deltaTime*langA*2;
		
		ship.transform.localPosition.y -= Time.deltaTime*temp*20;
		
	}
}