// ======================================================================================
// File         : SpriteBlendClipping.shader
// Author       : Wu Jie 
// Last Change  : 03/05/2012 | 15:19:25 PM | Monday,March
// Description  : 
// ======================================================================================

///////////////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////

Shader "EZ/Change" {
    Properties {
        _MainTex ("Atlas Texture", 2D) = "white" {}
        _ChangeTex ("Atlas Texture", 2D) = "white" {}
        _change ("change", float) = 1
    }

    // ======================================================== 
    // cg 
    // ======================================================== 

    SubShader {
        Tags { 
            "Queue"="Transparent" 
            "IgnoreProjector"="True" 
            "RenderType"="Transparent" 
        }
        Cull Off 
        Lighting Off 
        ZWrite Off 
        Fog { Mode Off }
        Blend SrcAlpha OneMinusSrcAlpha

        Pass {
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest

			#include "UnityCG.cginc"

			sampler2D _MainTex;
			sampler2D _ChangeTex;
			float4 _MainTex_ST;
			float _change = 0.0;
			float4x4 _ClipMatrix;

			struct appdata_t {
				float4 vertex   : POSITION;
				fixed4 color    : COLOR;
				float2 texcoord : TEXCOORD0;
			};

			struct v2f {
				float4 vertex        : POSITION;
				fixed4 color         : COLOR;
				float2 texcoord      : TEXCOORD0;
				float2 worldPosition : TEXCOORD1;
			};

			v2f vert ( appdata_t _in ) {
				v2f o;
                float4 wpos = mul(_Object2World, _in.vertex);
                o.worldPosition = mul(_ClipMatrix, wpos).xy;
				o.vertex = mul(UNITY_MATRIX_MVP, _in.vertex);
				o.color = _in.color;
				o.texcoord = TRANSFORM_TEX(_in.texcoord, _MainTex);
				return o;
			}

			fixed4 frag ( v2f _in ) : COLOR {
				fixed4 toColor = tex2D ( _ChangeTex, _in.texcoord ) * _in.color;
				fixed4 fromColor = tex2D ( _MainTex, _in.texcoord ) * _in.color;
          
            	fixed4 outClor = fromColor * (1- _change) + toColor * _change;
               	
             
                return outClor; 
			}
			ENDCG
        }
    }

    // ======================================================== 
    // fallback 
    // ======================================================== 

    SubShader {
        Tags { 
            "Queue"="Transparent" 
            "IgnoreProjector"="True" 
            "RenderType"="Transparent" 
        }
        Cull Off 
        Lighting Off 
        ZWrite Off 
        Fog { Color (0,0,0,0) }
        Blend SrcAlpha OneMinusSrcAlpha

        BindChannels {
            Bind "Color", color
            Bind "Vertex", vertex
            Bind "TexCoord", texcoord
        }

        Pass {
            SetTexture [_MainTex] {
                combine texture * primary
            }
        }
    }
}
