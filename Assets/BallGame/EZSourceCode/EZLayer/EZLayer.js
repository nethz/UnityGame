	#pragma strict
	
	class EZLayer extends MonoBehaviour{
		public var _camera:Camera = null;
		private var cameraPostion_:Vector3;
		private var texturePairs_:EZLayerTexturePair[] = null; 
		public var _roll:Vector3;
		public function Awake(){
			var textures:EZLayerTexture[] = System.Array.ConvertAll(
					this.gameObject.GetComponentsInChildren(EZLayerTexture), 
					function (component){component as EZLayerTexture;}
					);
			texturePairs_ = new EZLayerTexturePair[textures.Length];
			for(var i:int = 0; i < texturePairs_.Length; ++i){
				var first:EZLayerTexture = textures[i];
				var obj:GameObject = GameObject.Instantiate(
						textures[i].gameObject,
						textures[i].transform.position,
						textures[i].transform.rotation
					);  
				obj.name = textures[i].gameObject.name+".Copy";
				obj.transform.parent = this.transform;
				var second:EZLayerTexture = obj.GetComponent(EZLayerTexture) as EZLayerTexture;
				obj.transform.localScale = textures[i].gameObject.transform.localScale;
				first.origin = textures[i].transform.position;
				first.shifting = false; 
				first.roll = this._roll;
				first.unActivateObjs();
				second.origin = textures[i].transform.position;
				second.shifting = true;
				second.roll = this._roll; 
				var pair:EZLayerTexturePair = new EZLayerTexturePair();
				pair.first = first;
				pair.second = second;
				texturePairs_[i] = pair;
			}
		}
		public function LateUpdate(){
			if(this._camera.transform.position != this.cameraPostion_){
				for(var i:int = 0; i < texturePairs_.Length; ++i){
					this.cameraPostion_ = this._camera.transform.position;
					texturePairs_[i].refresh(this.cameraPostion_);
				}
			}
		}
		public function OnDestroy(){
		}
	}