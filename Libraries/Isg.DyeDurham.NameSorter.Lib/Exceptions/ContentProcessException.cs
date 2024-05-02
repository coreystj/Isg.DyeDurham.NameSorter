using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class ContentProcessException : Exception
	{
		public ContentProcessException() { }
		public ContentProcessException(string message) : base(message) { }
		public ContentProcessException(string message, Exception inner) : base(message, inner) { }
		protected ContentProcessException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
