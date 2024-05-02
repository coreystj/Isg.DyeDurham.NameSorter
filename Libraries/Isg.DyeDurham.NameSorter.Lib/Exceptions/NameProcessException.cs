using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class NameProcessException : Exception
	{
		public NameProcessException() { }
		public NameProcessException(string message) : base(message) { }
		public NameProcessException(string message, Exception inner) : base(message, inner) { }
		protected NameProcessException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
