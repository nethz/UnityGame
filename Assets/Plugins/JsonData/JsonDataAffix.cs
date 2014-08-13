using System;
using UnityEngine;
using Pathfinding.Serialization.JsonFx;
using System.Collections.Generic;
using System.IO;
using ICSharpCode.SharpZipLib.Zip.Compression;
using ICSharpCode.SharpZipLib.GZip;
using System.Text;

namespace JsonData
{ 	

	public class GZip
    {
        /// <summary>
        /// 实时压缩目标流，WEB输出专用功能
        /// </summary>
        //public static Stream BaseStream
        //{
         //   get
         //   {
        //        return HttpContext.Current.Items["OutStream"] as Stream;
         //   }
        //}
        /// <summary>
        /// 将字节数组写入目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="buffer">要写入的字节数组</param>
       // public static void Write(byte[] buffer)
       // {
       //     if (HttpContext.Current.Response.ContentType.IndexOf(';') == -1 && HttpContext.Current.Response.ContentType.StartsWith("text", true, null))
        //    {
        //        HttpContext.Current.Response.ContentType += "; charset=" + HttpContext.Current.Response.ContentEncoding.WebName;
        //    }
        //    ((Stream)HttpContext.Current.Items["OutStream"]).Write(buffer,0,buffer.Length);
       // }
        /// <summary>
        /// 清除当前压缩流中的所有内容，WEB输出专用功能
        /// </summary>
        
      
        /// <summary>
        /// 将XML对象写入目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="xml">XmlDocument对象</param>
      
        /// <summary>
        /// 将一个可转换为字符串的object对象写入目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="num">要写入的对象</param>
        public static void Write(object num)
        {
            Write(num.ToString());
        }
        /// <summary>
        /// 将一个字符串写入目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="str">要写入的字符串</param>
      
        /// <summary>
        /// 将一个流压缩到目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="stream">要写入的流</param>
        public static void Write(Stream stream)
        {
            int len = (int)stream.Length;
            byte[] data = new byte[len];
            stream.Read(data, 0, len);
            Write(data);
        }
        /// <summary>
        /// 将一个文件压缩到目标压缩流，WEB输出专用功能
        /// </summary>
        /// <param name="filepath">要写入的文件路径</param>
       
        /// <summary>
        /// 将字符串压缩为字节数组
        /// 返回：已压缩的字节数组
        /// </summary>
        /// <param name="data">待压缩的字符串</param>
        /// <returns></returns>
        public static byte[] Compress(string stringToCompress)
        {
            byte[] bytData = Encoding.UTF8.GetBytes(stringToCompress);
            return CompressBytes(bytData);
        }
        /// <summary>
        /// 解压缩字节数组到字符串
        /// 返回：已解压的字符串（慎用）
        /// </summary>
        /// <param name="bytData">待解压缩的字节数组</param>
        /// <returns></returns>
        public static string DeCompress(byte[] bytData)
        {
            byte[] decompressedData = DecompressBytes(bytData);
            return Encoding.UTF8.GetString(decompressedData);
        }
        /// <summary>
        /// 压缩字符串
        /// 返回：已压缩的字符串
        /// </summary>
        /// <param name="bytData">待压缩的字符串组</param>
        /// <returns></returns>
        public static string CompressString(string stringToCompress)
        {
            byte[] bytData = Encoding.UTF8.GetBytes(stringToCompress);
            byte[] compressedData = CompressBytes(bytData);
            return Convert.ToBase64String(compressedData);
        }
        /// <summary>
        /// 解压缩字符串
        /// 返回：已解压的字符串
        /// </summary>
        /// <param name="bytData">待解压缩的字符串</param>
        /// <returns></returns>
        public static string DeCompressString(string CompressTostring)
        {
			//Debug.Log ("e" + CompressTostring);
            byte[] bytData = System.Text.Encoding.UTF8.GetBytes(CompressTostring);
			//for(int i=0;i<bytData.Length; ++i){
			//	Debug.Log( bytData[i]);
			//}
			//Debug.Log ("f");
            byte[] decompressedData = DecompressBytes(bytData);
			//Debug.Log ("g");
            return Encoding.UTF8.GetString(decompressedData);
			//Debug.Log ("h");
        }
        /// <summary>
        /// 压缩字节数组
        /// 返回：已压缩的字节数组
        /// </summary>
        /// <param name="bytData">待压缩的字节数组</param>
        /// <returns></returns>
        public static byte[] CompressBytes(byte[] data)
        {
            MemoryStream o = new MemoryStream();
            Stream s = new ICSharpCode.SharpZipLib.GZip.GZipOutputStream(o);
            s.Write(data, 0, data.Length);
            s.Close();
            o.Flush();
            o.Close();
            return o.ToArray();
        }
        /// <summary>
        /// 解压缩字节数组
        /// 返回：已解压的字节数组
        /// </summary>
        /// <param name="bytData">待解压缩的字节数组</param>
        /// <returns></returns>
        public static byte[] DecompressBytes(byte[] data)
        {
            MemoryStream o = new MemoryStream();
            Stream s = new GZipInputStream(new MemoryStream(data));
            try
            {
            int size = 0;
                byte[] buf = new byte[1024];
                while ((size = s.Read(buf, 0, buf.Length))> 0)
                {
                    o.Write(buf, 0, size);
                }
            }
            finally
            {
                o.Close();
            }
            return o.ToArray();
        }
    }
    
	public class Zip{
		public static string Unzip(string input){
			byte[] buffer = System.Text.Encoding.Default.GetBytes(input);
			for(int i=0; i<buffer.Length; ++i){
				Debug.Log (buffer[i]);
			}
		
            return input;
			//return "";
		}
	}
	
	





	public class JsonPack{
		private Dictionary<string,object> pack_;
		public Dictionary<string,object> getPack(){
			
			return pack_;
		}
		public void addObject(string key, object obj){
			if(!pack_.ContainsKey(key)){
				pack_.Add(key, obj);
			}
		}
		public void update(string key, object obj){
			pack_[key] = obj;
		}
		private float CastFloat (object o) {
			if (o==null)return 0.0F;
			try {
				return System.Convert.ToSingle(o);
			} catch(System.Exception e) {
				throw new JsonDeserializationException ("Cannot cast object to float. Expected float, got "+o.GetType(),e,0);
			}
		}
		
		
		public bool hasKey(string key){
			return pack_.ContainsKey(key);
		}
		
		public JsonPack(Dictionary<string,object> pack){
			pack_ = pack;
		}
		public string toString(string key){
			if(!pack_.ContainsKey(key)){
				Debug.LogError("No Key:"+ key);
			}
			
			return (string)(pack_[key]);
		}
		
		public bool toBoolean(string key){
			return (bool)(pack_[key]);
		}
		
		
		public JsonPack toJsonPack( string key){
			
			Dictionary<string,object> json  = (Dictionary<string,object>)(pack_[key]);
			JsonPack jp = new JsonPack(json);
			return jp;
		}
		
		
		public JsonData.JsonPack[] toJsonPacks(string key){
			
			object[] jsons  = (object[])(pack_[key]);
			JsonData.JsonPack[] packs = new JsonData.JsonPack[jsons.Length];
			for(int i=0; i<jsons.Length; ++i){
				Dictionary<string,object> obj = (Dictionary<string,object>)(jsons[i]);
				packs[i] = new JsonData.JsonPack(obj);
			}
			return packs;
			
			
		}
		public int toInt(string key){
			return (int)(pack_[key]);
		}
		public int[] toIntArray(string key){
			return (int[])(pack_[key]);
		}	
		
		public double[] toDoubleArray(string key){
			return (double[])(pack_[key]);
		}
		
		public object[] toObjectArray(string key){
			return (object[])(pack_[key]);
		}
		
		
		public float[] toFloatArray(string key){
			if(!hasKey(key)){
				Debug.LogError("no key "+ key);
			}
			float[] ret = null;
			object v = pack_[key];
			if(v.GetType() == typeof(int[])){
				int[] temp = toIntArray(key);
				ret = new float[temp.Length];
				for(int i=0; i< ret.Length; ++i){
					ret[i] = CastFloat(temp[i]);
				}
				
			}else if(v.GetType () == typeof(double[])){
				double[] temp = toDoubleArray(key);
				ret = new float[temp.Length];
				for(int i=0; i< ret.Length; ++i){
					ret[i] = CastFloat(temp[i]);
				}
			}else if(v.GetType () == typeof(object[])){
				object[] temp = toObjectArray(key);
				ret = new float[temp.Length];
				for(int i=0; i< ret.Length; ++i){
					ret[i] = CastFloat(temp[i]);
				}
				
			}else{
				
				ret =  (float[])(pack_[key]);
				
			}
			
			return ret;
		}
		
		public float toFloat(string key){
			if(!hasKey(key)){
				Debug.LogError("no key "+ key);
			}
			return CastFloat(pack_[key]);
		}
		
		public JsonData.JsonPack toAffix(string key){
			Dictionary<string,object> json  = (Dictionary<string,object>)(pack_[key]);
			return new JsonData.JsonPack(json);
		}
		
		public JsonData.JsonPack[] toAffixes(string key){
			
			object[] json  = (object[])(pack_[key]);
			JsonData.JsonPack[] affixes = new JsonData.JsonPack[json.Length];
			for(int i=0; i<json.Length; ++i){
				Dictionary<string,object> obj = (Dictionary<string,object>)(json[i]);
				affixes[i] = new JsonData.JsonPack(obj);
			}
			return affixes;
		}
		
		static public string Save(JsonData.JsonPack data){
			string json = JsonDataHandler.write<JsonData.JsonPack>(data);
			return json;
		}
		
		static public JsonData.JsonPack Load(string json){
			JsonData.JsonPack data = JsonDataHandler.reader<JsonData.JsonPack>(json);
			return data;
		}
	}
	



	public class AffixConverter : JsonConverter
	{
		public override bool CanConvert (Type type) {
			return type == typeof(JsonData.JsonPack);
		}
		
		public override object ReadJson (Type type, Dictionary<string,object> values) {
			if (type == typeof(JsonData.JsonPack)) {
				return new JsonData.JsonPack(values);
				
				
			} else {
				throw new System.NotImplementedException ("Can only read Affix. Not objects of type "+type);
			}
		}
		public override Dictionary<string,object> WriteJson (Type type, object value) {
			
			
			if (type == typeof(JsonData.JsonPack)) {
				
				return ((JsonData.JsonPack)(value)).getPack();
			} 
			throw new System.NotImplementedException ("Can only write Vector2,3,4. Not objects of type "+type);
		}
	}

}


