// ======================================================================================
// File         : SpriteBlend.shader
// Author       : Wu Jie 
// Last Change  : 07/22/2011 | 18:09:25 PM | Friday,July
// Description  : 
// ======================================================================================

///////////////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////

Shader "Test/Alpha Blended" {
    Properties {
        _MainTex ("Atlas Texture", 2D) = "white" {}
    }

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
        Blend OneMinusDstColor One

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
