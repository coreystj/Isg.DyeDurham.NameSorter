using System;

namespace Isg.DyeDurham.NameSorter.Lib.Exceptions
{

	[Serializable]
	public class NotSortedException : Exception
	{
		public NotSortedException() { }
		public NotSortedException(string message) : base(message) { }
		public NotSortedException(string message, Exception inner) : base(message, inner) { }
		protected NotSortedException(
		  System.Runtime.Serialization.SerializationInfo info,
		  System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
	}
}
